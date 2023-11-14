"use client";
import { addBlog } from "@/API/GraphQl/blog";
import { context } from "@/API/GraphQl/context";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { Button, LinearProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "@/Components/Editor";
import "react-quill/dist/quill.snow.css";

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

interface BlogPayload {
  input: {
    title: string;
    description: string;
    category: string;
    poster: File | null;
  };
}

export default function Page() {
  const [files, setFiles] = useState<FileList | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");

  const [blogPayload, { loading, data, error }] = useMutation(
    addBlog,
    context()
  );

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedCategory(e.target.value);

  const handleContentChange = (content: string) => setEditorContent(content);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    blogPayload({
      variables: {
        input: {
          title: formData.get("title") as string,
          description: editorContent,
          category: selectedCategory,
        },
      },
    });
    console.log({
      title: formData.get("title") as string,
      description: editorContent,
      category: selectedCategory,
      poster: files ? files[0] : null,
    });
  };

  if (data) {
    toast.success("Blog added");
  }

  return (
    <div className="container">
      <ToastContainer />
      {loading && <LinearProgress />}
      <form
        className="flex mb-[1rem] flex-col"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <input
          required
          name="title"
          className="heading text-[3rem] font-bold outline-none pl-4 mb-8 p-2"
          placeholder="Write your heading here..."
          contentEditable={true}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
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
        <Editor value={editorContent} onChange={handleContentChange} />
        <Button
          type="submit"
          variant="contained"
          color="success"
          className="p-[1rem] rounded-xl"
        >
          Post
        </Button>
      </form>
    </div>
  );
}
