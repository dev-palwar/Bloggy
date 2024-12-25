import Image from "next/image";
import Link from "next/link";
import { formateDate, truncateText } from "@/lib/App";

export const BlogCard: React.FC<Blog> = (params) => {
  return (
    <div className="flex mt-5 flex-col overflow-hidden gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <Link href={`/profile/${params.author.id}`}>
              <Image
                src={params.author.avatar ?? ""}
                height={100}
                width={100}
                alt="user"
                className="h-10 w-10 object-cover rounded-full"
              />
            </Link>
          </div>
          <h1>{params.author.name}</h1>
          <p className="opacity-70">{formateDate(params.createdAt)}</p>
          <div className="ml-3 flex gap-2">
            {params.category.map((cat, index) => {
              return (
                <p key={index} className="text-blue-700">
                  {cat}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="content flex flex-col justify-between gap-6 mt-4">
        <div className="h-auto">
          <Image
            src={params.poster}
            height={100}
            width={100}
            alt="poster"
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Link href={`/Blogs/${params.id}`}>
            <h1 className="blog-title font-bold">{params.title}</h1>
          </Link>
          <p
            style={{ opacity: 0.8 }}
            dangerouslySetInnerHTML={{
              __html: truncateText(params.description, 25),
            }}
          />
        </div>
      </div>
    </div>
  );
};
