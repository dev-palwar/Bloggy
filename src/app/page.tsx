"use client";
import { AllBlogs } from "@/API/GraphQl/blog";
import { BlogCard } from "@/Components/Card";
import { useQuery } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function Page() {
  const [blogData, setBlogData] = React.useState<Blog[] | undefined>();
  const { loading, data, refetch } = useQuery(AllBlogs);

  React.useEffect(() => {
    refetch();
    if (data) {
      setBlogData(data?.blogs);
      console.log(data?.blogs);
    }
  }, [blogData, data, refetch]);

  return (
    <div className="container">
      {loading ? (
        <LinearProgress />
      ) : (
        <div
          className="container mx-auto px-4 py-8"
          style={{ marginTop: "5rem" }}
        >
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
