"use client";
import { getBlog } from "@/API/GraphQl/blog";
import BasicModal from "@/Components/Modale";
import { formateDate } from "@/lib/formateDate";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React from "react";

export default function Page({ params }: any) {
  const blogId = params.blogId;

  const [payload, { loading, error, data }] = useMutation(getBlog);

  React.useEffect(() => {
    payload({
      variables: {
        findBlogId: blogId,
      },
    });
  }, []);

  if (data) console.log(data);

  const blogData = data?.blog || {};

  return (
    <>
      {error && <BasicModal message={error.message} click={true} />}
      <div className="container">
        {loading && "Loading..."}
        <h1 className="text-[3rem] font-bold mb-5">{blogData.title}</h1>
        <div className="flex gap-3 items-center mb-[1rem]">
          <Image
            src={blogData?.Author?.avatar}
            height={100}
            width={40}
            alt="user"
            className="rounded-full"
          />
          <p className="font-bold text-[20px]">{blogData?.Author?.name}</p>
          <p>{formateDate(blogData.createdAt)}</p>
        </div>
        <p>{blogData.description}</p>
      </div>
    </>
  );
}
