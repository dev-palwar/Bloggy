import { formateDate } from "@/lib/formateDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface blogContent {
  id: string;
  title: string;
  description: string;
  poster: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  category: [string];
}

const Blog = (params: blogContent) => {
  return (
    <div className="card flex h-[13rem] w-[40rem] mt-5 p-[10px] flex-col gap-[10px] overflow-hidden">
      <div className="flex items-center gap-[10px]">
        <div className="avatar w-8">
          <Link href={`/profile/${params.author.id}`}>
            <Image
              src={params.author.avatar}
              height={100}
              width={100}
              alt="user"
              className="rounded-full"
            />
          </Link>
        </div>
        <h1>{params.author.name}</h1>
        <p>{formateDate(params.createdAt)}</p>
        <div className="ml-4 flex gap-2">
          {params.category.map((cat) => {
            return <p className=" text-yellow-300">{cat}</p>;
          })}
        </div>
      </div>
      <div className="content flex gap-[25px]">
        <div className="flex flex-col gap-2">
          <Link href={`/Blogs/${params.id}`}>
            <h1 className="text-[25px] font-bold">{params.title}</h1>
          </Link>
          <p className="opacity-70">{params.description}</p>
        </div>
        <Image
          src={params.poster}
          height={100}
          width={200}
          alt="user"
          className="h-fit"
        />
      </div>
    </div>
  );
};

export default Blog;
