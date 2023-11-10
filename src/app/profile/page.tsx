"use client";
import { getProfile } from "@/API/GraphQl/user";
import Blog from "@/Components/Card";
import { getLoggedInUser } from "@/lib/user";
import { useQuery } from "@apollo/client";
import LinearProgress from "@mui/material/LinearProgress";

export default function Page() {
  const { userId } = getLoggedInUser();

  const { loading, error, data } = useQuery(getProfile, {
    variables: { userId },
  });

  const blogData = data?.profile?.blogs || [];

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <div className="home-section flex justify-evenly">
            <div className="Blog-section flex flex-col">
              <h1 className="text-[3rem]">{data?.profile?.name}</h1>
              <div>
                {blogData.map((value: any, index: any) => (
                  <Blog
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    description={value.description}
                    poster={value.poster}
                    author={value.Author}
                    createdAt={value.createdAt}
                    category={value.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}