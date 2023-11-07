import { formateDate } from "@/lib/formateDate";
import Image from "next/image";
import React from "react";

interface blogContent {
  title: string;
  description: string;
  poster: string;
  avatar: string;
  author: string;
  createdAt: string;
  category: string;
}

const Blog = (params: blogContent) => {
  return (
    <div className="card flex h-[13rem] w-[40rem] mt-5 p-[10px] flex-col gap-[10px] overflow-hidden">
      <div className="flex items-center gap-[10px]">
        <div className="avatar w-8">
          <Image
            src={params.avatar}
            height={100}
            width={100}
            alt="user"
            className="rounded-full"
          />
        </div>
        <h1>{params.author}</h1>
        <p>{formateDate(params.createdAt)}</p>
        <p className="ml-4 text-yellow-300">{params.category}</p>
      </div>
      <div className="content flex gap-[25px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-[25px] font-bold">{params.title}</h1>
          <p className="opacity-70">{params.description}</p>
        </div>
        <Image src={params.poster} height={100} width={200} alt="user" />
      </div>
    </div>
  );
};

export default Blog;
