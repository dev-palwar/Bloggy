"use client";
import { addBlog } from "@/API/GraphQl/blog";
import { context } from "@/API/GraphQl/context";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import React, { useState } from "react";

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
  const [tags, setTags] = useState("");

  const [blogPayload, { loading, data, error }] = useMutation(addBlog, context());

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const log = (e) => {
    e.preventDefault();
    blogPayload({
      variables: {
        input: {
          title: formRef.current[0].value,
          description: formRef.current[1].value,
          category: selectedCategory,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
      },
    });
  };

  if (loading) return "Loading...";
  if (data) console.log(data);
  if (error) console.log(error);
  return (
    <div className="container">
      <form className="flex flex-col" ref={formRef} onSubmit={log}>
        <input
          className="heading text-[3rem] font-bold outline-none border-l-8 pl-4 mb-8 p-2"
          placeholder="Write your heading here..."
          contentEditable="true"
        />
        <textarea
          placeholder="Blog content here..."
          className="h-[60vh] border-l-4 outline-none pl-4 p-6 text-[25px] mb-6"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mb-4 p-2"
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={tags}
          onChange={handleTagsChange}
          placeholder="Add tags separated by commas"
          className="mb-4 p-2"
        />
        <Button type="submit" variant="contained" color="success">
          {" "}
          Post{" "}
        </Button>
      </form>
    </div>
  );
}
