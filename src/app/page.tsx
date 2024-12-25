"use client";
import { AllBlogs } from "@/API/GraphQl/blog";
import { BlogCard } from "@/components/BlogCard";
import { useQuery } from "@apollo/client";
import React from "react";
import { Loader } from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } = useToast();
  const [blogData, setBlogData] = React.useState<Blog[] | undefined>();
  const { loading, data, refetch } = useQuery(AllBlogs);

  React.useEffect(() => {
    refetch();
    if (data) {
      setBlogData(data?.blogs);
    }
  }, [blogData, data, loading, refetch, toast]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Latest Blog Posts
          </h1>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-6">
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
