import { formateDate, truncateText } from "@/lib/App";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog = (params: Blog) => {
  return (
    <div className="card flex h-[13rem] w-[40rem] mt-5 p-[10px] flex-col gap-[10px] overflow-hidden">
      <div className="flex items-center gap-[10px]">
        <div className="avatar h-[35px] w-[35px]">
          <Link href={`/profile/${params.author.id}`}>
            <Image
              src={params.author.avatar ?? ""}
              height={100}
              width={100}
              alt="user"
              className="h-full w-full object-cover rounded-full"
            />
          </Link>
        </div>
        <h1>{params.author.name}</h1>
        <p className="opacity-70">{formateDate(params.createdAt)}</p>
        <div className="ml-[10px] flex gap-2">
          {params.category.map((cat: Category) => {
            return <p className="text-yellow-300">{cat}</p>;
          })}
        </div>
      </div>
      <div className="content flex justify-between gap-[25px]">
        <div className="flex flex-col gap-2">
          <Link href={`/Blogs/${params.id}`}>
            <h1 className="text-[25px] font-bold">{params.title}</h1>
          </Link>
          <p
            className="opacity-70"
            dangerouslySetInnerHTML={{
              __html: truncateText(params.description, 25),
            }}
          />
        </div>
        <Image
          src={params.poster}
          height={100}
          width={200}
          alt="poster"
          className="h-fit"
        />
      </div>
    </div>
  );
};

export default Blog;
