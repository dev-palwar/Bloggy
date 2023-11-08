"use client";
import React from "react";
import { getBlog, upvotingBlog } from "@/API/GraphQl/blog";
import BasicModal from "@/Components/Modale";
import { formateDate } from "@/lib/formateDate";
import { useMutation } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { context } from "@/API/GraphQl/context";

export default function Page({ params }: any) {
  const blogId = params.blogId;

  const [payloadForBlog, blogState] = useMutation(getBlog);
  const [payloadForUpvote, upvoteState] = useMutation(upvotingBlog, context());

  const upvote = () => {
    payloadForUpvote({
      variables: {
        blogId: blogId,
      },
    });
  };

  React.useEffect(() => {
    payloadForBlog({
      variables: {
        findBlogId: blogId,
      },
    });
  }, []);

  const blogData = blogState.data?.blog || {};
  const likesOnBlog = blogData.upvotes?.length;

  return (
    <>
      {blogState.error && (
        <BasicModal message={blogState.error.message} click={true} />
      )}
      {blogState.loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <h1 className="text-[3rem] font-bold mb-5">{blogData.title}</h1>
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center mb-[1rem]">
              <Image
                src={blogData?.Author?.avatar}
                height={100}
                width={40}
                alt="user"
              />
              <p className="font-bold text-[23px] ml-1">
                {blogData?.Author?.name}
              </p>
              <p className="mt-[3px]">{formateDate(blogData.createdAt)}</p>
            </div>
            <div className="flex items-center gap-1" onClick={upvote}>
              {upvoteState.loading ? (
                ""
              ) : (
                <FavoriteIcon
                  className={`cursor-pointer ${
                    upvoteState.data?.upvoted ? "text-red-500" : ""
                  }`}
                />
              )}
              <p className="ml-1">
                {upvoteState.data?.upvoted ? likesOnBlog + 1 : likesOnBlog}
              </p>
            </div>
          </div>
          <Image
            src={blogData.poster}
            alt="poster"
            width={200}
            height={500}
            className="w-full mb-8 rounded"
          ></Image>
          <p>{blogData.description}</p>
        </div>
      )}
    </>
  );
}
