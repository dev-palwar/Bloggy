"use client";
import { AllBlogs } from "@/API/GraphQl/blog";
import Blog from "@/Components/Card";
import BasicModal from "@/Components/Modale";
import { useQuery } from "@apollo/client";
import React from "react";

export default function Page() {
  const { loading, data, error } = useQuery(AllBlogs);
  if (loading) return <p>Loading...</p>;
  const blogData = data?.blog || [];

  return (
    <div className="container">
      {error && <BasicModal message={error.message} click={true} />}
      <div className="home-section flex justify-evenly">
        <div className="Blog-section flex flex-col">
          {blogData.map((value: any, index: any) => (
            <Blog
              key={index}
              title={value.title}
              description={value.description}
              poster={value.poster}
            />
          ))}
        </div>
        <div className="Alert-section flex flex-col h-[100vh] w-[45vh] border sticky top-0"></div>
      </div>
    </div>
  );
}
