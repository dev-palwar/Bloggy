"use client";
import { AllBlogs } from "@/API/GraphQl/blog";
import Blog from "@/Components/Card";
import BasicModal from "@/Components/Modale";
import { useQuery } from "@apollo/client";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function Page() {
  const [blogData, setBlogData] = React.useState<Blog[] | undefined>();
  const { loading, data, error } = useQuery(AllBlogs);

  React.useEffect(() => {
    if (data) setBlogData(data?.blogs);
  }, [data]);

  return (
    <div className="container">
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="Blog-section flex flex-col items-center">
          {blogData?.map((value: Blog) => (
            <Blog
              key={value.id}
              id={value.id}
              title={value.title}
              description={value.description}
              poster={value.poster}
              category={value.category}
              author={value.author}
              createdAt={value.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
