"use client";
import { AllBlogs } from "@/API/GraphQl/blog";
import Blog from "@/Components/Card";
import { useQuery } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function Page() {
  const [blogData, setBlogData] = React.useState<Blog[] | undefined>();
  const { loading, data, refetch } = useQuery(AllBlogs);

  React.useEffect(() => {
    refetch();
    if (data) setBlogData(data?.blogs);
  }, [data]);

  return (
    <div className="container">
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="Blog-section flex flex-col items-center mb-5">
          {blogData?.map((value: Blog) => (
            <Blog
              key={value.id}
              id={value.id}
              title={value.title}
              description={value.description}
              poster={value.poster}
              category={value.category}
              author={value.author}
              upvotes={value.upvotes}
              createdAt={value.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
