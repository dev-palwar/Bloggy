"use client";
import { addBlog } from "@/API/GraphQl/blog";
import { context } from "@/API/GraphQl/context";
import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Editor from "@/components/Editor";
import "react-quill/dist/quill.snow.css";
import { uploadImg } from "@/lib/uploadImg";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Loader } from "@/components/Loader";
import { toast } from "@/hooks/use-toast";
import { getLoggedInUser } from "@/lib/user";

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

  const handleCategoryChange = (cat: string) => setSelectedCategory(cat);

  const handleContentChange = (content: string) => setEditorContent(content);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !files) return;

    const formData = new FormData(formRef.current);

    try {
      setLoading(true);

      if (getLoggedInUser()) {
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
      } else {
        toast({
          description: "You need to log in sir",
        });
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      toast({
        description: "Error submitting the form",
        variant: "destructive",
      });
    }
  };

  // Using useEffect to handle the data and error after the mutation is completed
  useEffect(() => {
    if (data) {
      setLoading(false);
      toast({ description: "Blog added. 👍" });
      setTimeout(() => {
        // Ensures that router is defined before using it
        // show the user their newly uploaded blog after a second
        router?.push(`Blogs/${data.ID}`);
      }, 1000);
    }
    if (error) {
      setLoading(false);

      toast({
        description:
          "Failed to upload blog. Make sure all the details are filled in",
        variant: "destructive",
      });
    }
  }, [data, error, router]);

  return (
    <div className="container">
      <form
        className="flex flex-col gap-2"
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
        <div className="flex gap-9 items-center">
          <input
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
            className="block text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-gray-200 file:text-gray-700"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="mb-4 bg-transparent mt-[1rem]">
              {selectedCategory || "Select a category"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              {categories.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-4">
          <Editor value={editorContent} onChange={handleContentChange} />
          <Button type="submit" variant="default">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
