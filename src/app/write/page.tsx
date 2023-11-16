"use client";
import { addBlog } from "@/API/GraphQl/blog";
import { context } from "@/API/GraphQl/context";
import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { useMutation } from "@apollo/client";
import { Button, LinearProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "@/Components/Editor";
import "react-quill/dist/quill.snow.css";
import { uploadImg } from "@/lib/uploadImg";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>();
  const [files, setFiles] = useState<FileList | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");

  const [blogPayload, { data, error }] = useMutation(addBlog, context());

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedCategory(e.target.value);

  const handleContentChange = (content: string) => setEditorContent(content);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !files) return;

    const formData = new FormData(formRef.current);

    try {
      setLoading(true);

      const imgUrl = await uploadImg(files[0], "files");

      blogPayload({
        variables: {
          input: {
            title: formData.get("title") as string,
            description: editorContent,
            category: selectedCategory,
            poster: imgUrl,
          },
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error("Error submitting the form");
    }
  };

  // Using useEffect to handle the data and error after the mutation is completed
  useEffect(() => {
    if (data) {
      setLoading(false);
      toast.success("Blog added");
      setTimeout(() => {
        router.push(`Blogs/${data.ID}`);
      }, 400);
    }
    if (error) {
      setLoading(false);
      toast.error(
        "Failed to upload blog. Make sure all the details are filled in"
      );
    }
  }, [data, error]);

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
          required
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mb-4 bg-transparent mt-[1rem]"
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
