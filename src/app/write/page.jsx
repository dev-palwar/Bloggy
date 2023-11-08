"use client";
import { Button } from "@mui/material";
import React from "react";

export default function Page() {
  const formRef = React.useRef(null);

  const log = (e) => {
    e.preventDefault();
    console.log(formRef.current[0]);
  };

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
        <Button type="submit" variant="contained" color="success">
          {" "}
          Post{" "}
        </Button>
      </form>
    </div>
  );
}
