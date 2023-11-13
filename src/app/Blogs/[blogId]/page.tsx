"use client";
import React from "react";
import { getBlog, upvotingBlog } from "@/API/GraphQl/blog";
import { formateDate } from "@/lib/formateDate";
import { useMutation, useQuery } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { context, variables } from "@/API/GraphQl/context";
import { jwtDecode } from "@/lib/jwt";
import Link from "next/link";

export default function Page({ params }: IDS) {
  const blogId = params.blogId;

  const [ifLiked, setIfLiked] = React.useState<boolean>(false);
  const [blogData, setBlogData] = React.useState<Blog | undefined>();

  // take care of it
  const token = localStorage.getItem("auth_token") as string;
  const { decodedToken } = jwtDecode(token);

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

  React.useEffect(() => {
    if (data) {
      setBlogData(data?.Blog);
      setIfLiked(
        data?.Blog?.upvotes.some(
          (users: any) => users.id === decodedToken.userId
        )
      );
    }
  }, [data, upvoteState]);

  const handleUpvote = () => payloadForUpvote(variables(blogId));

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <h1 className="text-[3rem] font-bold mb-5">{blogData?.title}</h1>
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center mb-[1rem]">
              <Link href={`/profile/${blogData?.author.id}`}>
                <img
                  src={blogData?.author?.avatar}
                  height={100}
                  width={40}
                  alt="user"
                />
              </Link>
              <p className="font-bold text-[23px] ml-1">
                {blogData?.author?.name}
              </p>
              <p className="mt-[3px]">
                {formateDate(blogData?.createdAt ?? "")}
              </p>
              <p className="text-blue-500 mt-[3px]">{blogData?.category}</p>
            </div>
            <div className="flex items-center gap-1" onClick={handleUpvote}>
              {upvoteState.loading ? (
                ""
              ) : (
                <FavoriteIcon
                  className={`cursor-pointer ${ifLiked ? "text-red-500" : ""}`}
                />
              )}
              <p className="ml-1">{blogData?.upvotes?.length ?? 0}</p>
            </div>
          </div>
          <div className="h-[55vh] overflow-hidden mb-8">
            <img
              src={blogData?.poster}
              alt="poster"
              width={200}
              height={500}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <p className="text-[1.4rem]">{blogData?.description}</p>
        </div>
      )}
    </>
  );
}
