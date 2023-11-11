"use client";
import React from "react";
import { getBlog, upvotingBlog } from "@/API/GraphQl/blog";
import BasicModal from "@/Components/Modale";
import { formateDate } from "@/lib/formateDate";
import { useMutation, useQuery } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { context } from "@/API/GraphQl/context";
import { jwtDecode } from "@/lib/jwt";

export default function Page({ params }: Params) {
  const blogId = params.blogId;
  const [ifLiked, setIfLiked] = React.useState<boolean>(false);
  const [blogData, setBlogData] = React.useState<Blog | undefined>();

  // take care of it 
  const token = localStorage.getItem("auth_token") as string;
  const { decodedToken } = jwtDecode(token);

  const { loading, data, error, refetch } = useQuery(getBlog, {
    variables: {
      findBlogId: blogId,
    },
  });

  const [payloadForUpvote, upvoteState] = useMutation(upvotingBlog, {
    ...context(),
    onCompleted: () => {
      // Refetches the blog data after a successful upvote action
      refetch();
    },
  });

  React.useEffect(() => {
    if (data) {
      setBlogData(data?.blog);
      setIfLiked(
        data?.blog?.upvotes.some(
          (user: any) => user.user.id == decodedToken.userId
        )
      );
    }
  }, [data, upvoteState]);

  const upvote = () => {
    payloadForUpvote({
      variables: {
        blogId: blogId,
      },
    });
  };

  return (
    <>
      {error && <BasicModal message={error.message} click={true} />}
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <h1 className="text-[3rem] font-bold mb-5">{blogData?.title}</h1>
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center mb-[1rem]">
              <img
                src={blogData?.Author?.avatar}
                height={100}
                width={40}
                alt="user"
              />
              <p className="font-bold text-[23px] ml-1">
                {blogData?.Author?.name}
              </p>
              <p className="mt-[3px]">
                {formateDate(blogData?.createdAt ?? "")}
              </p>
            </div>
            <div className="flex items-center gap-1" onClick={upvote}>
              {upvoteState.loading ? (
                ""
              ) : (
                <FavoriteIcon
                  className={`cursor-pointer ${ifLiked ? "text-red-500" : ""}`}
                />
              )}
              <p className="ml-1">
                {blogData?.upvotes?.length ?? 0}
              </p>
            </div>
          </div>
          <img
            src={blogData?.poster}
            alt="poster"
            width={200}
            height={500}
            className="w-full mb-8 rounded"
          ></img>
          <p>{blogData?.description}</p>
        </div>
      )}
    </>
  );
}
