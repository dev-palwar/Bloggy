"use client";
import { context } from "@/API/GraphQl/context";
import { usersBlogs } from "@/API/GraphQl/user";
import Blog from "@/Components/Card";
import { useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { loading, error, data } = useQuery(usersBlogs, context());

  if (error) router.push("/login");

  const blogData = data?.blogs || [];
  return (
    <>
      {" "}
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <div className="home-section flex justify-evenly">
            <div className="Blog-section flex flex-col">
              <h1 className="text-[3rem]">{blogData[0]?.Author.name}</h1>
              <div>
                {blogData.map((value: any, index: any) => (
                  <Link href={`/Blogs/${value.id}`} className="">
                    <Blog
                      key={index}
                      title={value.title}
                      description={value.description}
                      poster={value.poster}
                      author={value.Author.name}
                      avatar={value.Author.avatar}
                      createdAt={value.createdAt}
                      category={value.category}
                    />
                  </Link>
                ))}
              </div>
            </div>
            {/* <div className="Alert-section flex flex-col h-[100vh] w-[45vh] border sticky top-0"></div> */}
          </div>
        </div>
      )}
    </>
  );
}
