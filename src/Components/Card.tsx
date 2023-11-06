import Image from "next/image";
import React from "react";
import user from "../Assets/sanji.jpg";

interface blogContent {
  title: string;
  description: string;
  poster: string;
}

const Blog = (params: blogContent) => {
  return (
    <div className="card flex h-[13rem] w-[40rem] mt-5 p-[10px] flex-col gap-[10px] overflow-hidden">
      <div className="flex items-center gap-[10px]">
        <div className="avatar w-8">
          <Image
            src={user}
            height={100}
            width={100}
            alt="user"
            className="rounded-full"
          />
        </div>
        <h1>Dev Palwar</h1>
        <p>Nov 4</p>
      </div>
      <div className="content flex gap-[25px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-[25px] font-bold">
            {params.title}
          </h1>
          <p className="opacity-70">
            {params.description}
          </p>
        </div>
        <Image src={params.poster} height={100} width={200} alt="user" />
      </div>
    </div>
  );
};

export default Blog;
