import { formateDate, truncateText } from "@/lib/App";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const BlogHorizontalCard = (params: Blog) => {
  return (
    <div className="max-w-xl p-2 gap-3 flex flex-col overflow-hidden mt-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9">
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
          <div className="ml-3 flex gap-2">
            {params.category.map((cat, index) => {
              return (
                <p key={index} style={{ color: "blue" }}>
                  {cat}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="content flex justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Link href={`/Blogs/${params.id}`}>
            <h1 className="blog-title font-bold text-xl">{params.title}</h1>
          </Link>
          <p
            style={{ opacity: 0.8 }}
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
          style={{ height: "fit-content" }}
        />
      </div>
    </div>
  );
};
