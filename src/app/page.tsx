"use client";
import { AllBlogs } from "@/API/GraphQl/blog";
import { BlogCard } from "@/Components/Card";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import loaderGif from "../assests/loaderGif.gif";

export default function Page() {
  const [blogData, setBlogData] = React.useState<Blog[] | undefined>();
  const { loading, data, refetch } = useQuery(AllBlogs);

  React.useEffect(() => {
    refetch();
    if (data) {
      setBlogData(data?.blogs);
    }
  }, [blogData, data, refetch]);

  return (
    <div>
      {loading ? (
        // <LinearProgress />
        <div className="w-[15rem] h-[11rem] m-auto">
          <Image
            src={loaderGif}
            height={100}
            width={100}
            alt="loading"
            className="h-[100%] w-[100%] object-cover"
          />
        </div>
      ) : (
        <div className="px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Latest Blog Posts
          </h1>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {blogData?.map((blog: Blog) => (
              <div key={blog.id} className="break-inside-avoid">
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
