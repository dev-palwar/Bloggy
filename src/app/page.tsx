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
      {loading && <LinearProgress />}
      {error && <BasicModal message={error.message} click={true} />}
      <div className="home-section flex justify-evenly">
        <div className="Blog-section flex flex-col">
          {blogData?.map((value: Blog) => (
            <Blog
              key={value.id}
              id={value.id}
              title={value.title}
              description={value.description}
              poster={value.poster}
              category={value.category}
              Author={value.Author}
              createdAt={value.createdAt}
            />
          ))}
        </div>
        {/* <div className="Alert-section flex flex-col h-[100vh] w-[45vh] border sticky top-0"></div> */}
      </div>
    </div>
  );
}
