import Image from "next/image";
import React from "react";
import user from "../Assets/sanji.jpg";
import blogimg from "../Assets/blog-img.jpg";

const Blog = () => {
  return (
    <div className="card flex h-[13rem] w-[40rem] mt-5 p-[10px] flex-col gap-[10px]">
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
        <h1>Dev Palwar.</h1>
        <p>Nov 4</p>
      </div>
      <div className="content flex gap-[25px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-[25px] font-bold">
            4 Habits of Emotionally Strong People
          </h1>
          <p className="opacity-70">
            #1: Control your attention, not your emotions — Most people hear the
            term emotionally strong and assume that it means the ability to
            ignore your emotions or not feel them. But that’s dead wrong…
          </p>
        </div>
        <Image src={blogimg} height={100} width={400} alt="user" />
      </div>
    </div>
  );
};

export default Blog;
