"use client";
import React from "react";
import { deleteBlogQuery, getBlog, upvotingBlog } from "@/API/GraphQl/blog";
import { formateDate } from "@/lib/App";
import { useMutation, useQuery } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { context, variables } from "@/API/GraphQl/context";
import Link from "next/link";
import Error from "@/Components/Error";
import BasicModal from "@/Components/Modale";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLoggedInUser } from "@/lib/user";
import { useRouter } from "next/navigation";
import { CommentComponent } from "@/Components/Comments";
import Image from "next/image";

export default function Page({ params }: IDS) {
  const router = useRouter();
  const blogId = params.blogId;

  const loggedInUser = getLoggedInUser();

  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean>();
  const [ifLiked, setIfLiked] = React.useState<boolean>(false);
  const [blogData, setBlogData] = React.useState<Blog | undefined>();

  const { loading, data, error, refetch } = useQuery(
    getBlog,
    variables(blogId)
  );

  const [payloadForUpvote, upvoteState] = useMutation(upvotingBlog, {
    ...context(),
    onCompleted: () => {
      // Refetches the blog data after a successful upvote action
      refetch();
    },
  });

  const [deletePayload, deleteState] = useMutation(deleteBlogQuery, context());

  const handleDeleteAction = () => {
    deletePayload(variables(blogId));
    if (deleteState.data?.deleted)
      router.push(`/profile/${loggedInUser?.userId}`);
  };

  const handleUpvote = () => {
    if (loggedInUser) {
      payloadForUpvote(variables(blogId));
    } else {
      router.push("/login");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await refetch();
      if (data) {
        setBlogData(data?.Blog);
        setIfLiked(
          data?.Blog?.upvotes.some(
            (users: User) => users.id === loggedInUser?.userId
          )
        );
        if (loggedInUser) {
          if (blogData?.author.id === loggedInUser.userId)
            setUserLoggedIn(true);
        }
      }

      if (deleteState.data?.deleted)
        router.push(`/profile/${loggedInUser?.userId}`);
    };

    fetchData();
  }, [data, loggedInUser, refetch, blogData, deleteState, router]);

  return (
    <>
      {loading || deleteState.loading ? (
        <div className="container">
          <LinearProgress />
        </div>
      ) : (
        <div className="container">
          {error ? (
            <BasicModal click={true}>
              <Error message={"This blog was deleted"} />
            </BasicModal>
          ) : (
            <>
              <h1 className="text-[3rem] font-bold mb-5">{blogData?.title}</h1>
              <div className="flex justify-between items-start">
                <div className="flex gap-[15px] items-center mb-[1rem]">
                  <div className="h-[35px] w-[35px]">
                    <Link href={`/profile/${blogData?.author.id}`}>
                      <Image
                        src={blogData?.author?.avatar || ""}
                        alt="user"
                        height={200}
                        width={200}
                        className="object-cover h-full w-full rounded-full"
                      />
                    </Link>
                  </div>
                  <p className="font-bold text-[23px]">
                    {blogData?.author?.name}
                  </p>
                  <p className="">{formateDate(blogData?.createdAt ?? "")}</p>
                  {blogData?.category.map((cat: Category, index: number) => (
                    <p key={index} className="text-yellow-500 ml-[1rem]">
                      {cat}
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {upvoteState.loading ? (
                    ""
                  ) : (
                    <div onClick={handleUpvote}>
                      <FavoriteIcon
                        className={`cursor-pointer ${
                          ifLiked ? "text-red-500" : ""
                        }`}
                      />
                    </div>
                  )}
                  <p className="ml-1">{blogData?.upvotes?.length ?? 0}</p>
                  {userLoggedIn && (
                    <div
                      onClick={handleDeleteAction}
                      className="ml-[1rem] cursor-pointer"
                    >
                      <DeleteIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="h-[55vh] overflow-hidden mb-8">
                <Image
                  src={blogData?.poster || ""}
                  alt="poster"
                  width={200}
                  height={500}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              {blogData?.description && (
                <p
                  className="text-[1.4rem] border-b-2 border-solid border-purple-500 pb-8
                  "
                  dangerouslySetInnerHTML={{ __html: blogData?.description }}
                />
              )}

              <CommentComponent commentsArr={blogData?.comments} />
            </>
          )}
        </div>
      )}
    </>
  );
}
