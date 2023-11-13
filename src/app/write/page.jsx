"use client";
import { addBlog } from "@/API/GraphQl/blog";
import { context } from "@/API/GraphQl/context";
import { useMutation } from "@apollo/client";
import { Button, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  "PROGRAMMING",
  "ANIME",
  "MEDIA",
  "SELF_IMPROVEMENT",
  "RELATIONSHIP",
  "DARK",
  "POLITICS",
  "GAMING",
];

export default function Page() {
  const formRef = React.useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [blogPayload, { loading, data, error }] = useMutation(
    addBlog,
    context()
  );

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const log = (e) => {
    e.preventDefault();
    blogPayload({
      variables: {
        input: {
          title: formRef.current[0].value,
          description: formRef.current[1].value,
          category: selectedCategory,
        },
      },
    });
  };

  if (error) window.location.href = "/login";
  if (data) {
    toast.success("Blog added");
  }

  return (
    <div className="container">
      <ToastContainer />
      {loading && <LinearProgress />}
      <form className="flex flex-col" ref={formRef} onSubmit={log}>
        <input
          required
          className="heading text-[3rem] font-bold outline-none pl-4 mb-8 p-2"
          placeholder="Write your heading here..."
          contentEditable="true"
        />
        <textarea
          required
          placeholder="Blog content here..."
          className="h-[60vh] outline-none pl-4 p-6 text-[25px] mb-6"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mb-4 p-2 bg-transparent"
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Button type="submit" variant="contained" color="success">
          {" "}
          Post{" "}
        </Button>
      </form>
    </div>
  );
}
