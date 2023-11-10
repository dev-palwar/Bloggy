"use client";
import { getProfile } from "@/API/GraphQl/user";
import Blog from "@/Components/Card";
import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import React from "react";

export default function Page({ params }: any) {
  const { loading, error, data } = useQuery(getProfile, {
    variables: { userId: params.userId },
  });

  const userInfo = data?.profile || {};
  const blogData = data?.profile?.blogs || [];
  const followingData = data?.profile?.following || [];
  const followersData = data?.profile?.followers || [];

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <div className="home-section flex justify-evenly">
            <div className="Blog-section flex flex-col">
              <h1 className="text-[3rem]">{userInfo?.name}</h1>
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
            <div className="Alert-section pl-[10px] flex flex-col h-[100vh] w-[45vh] border-l-2 sticky top-0">
              <div className="user-details-section flex flex-col p-[1rem]">
                <img
                  src={userInfo?.avatar}
                  alt="user"
                  className="h-[85px] w-[85px] rounded-full mb-3"
                />
                <h1 className="font-bold">{userInfo?.name}</h1>
                <p className="opacity-80">{followersData.length} follower</p>
                <p className="mb-3">{userInfo?.bio}</p>
                <div className="flex gap-2">
                  <Button variant="contained" color="success">
                    Follow
                  </Button>
                  <Button variant="outlined" color="success">
                    Connect
                  </Button>
                </div>
              </div>
              <div className="following flex flex-col p-4 gap-2">
                <h1 className="font-bold pb-[10px] border-b-2">Following</h1>
                {followingData.map((user: any) => {
                  return (
                    <div className="flex opacity-80 text-[15px] items-center gap-3 ">
                      <Link href={`/profile/${user.id}`}>
                        <img
                          src={user?.avatar}
                          className="h-[35px] rounded-full"
                        />
                      </Link>
                      <p>{user?.name}</p>
                    </div>
                  );
                })}
              </div>
              <div className="followers flex flex-col p-4 gap-2">
                <h1 className="font-bold pb-[10px] border-b-2">Followers</h1>
                {followersData.map((user: any) => {
                  return (
                    <div className="flex opacity-80 text-[15px] items-center gap-3 ">
                      <Link href={`/profile/${user.id}`}>
                        <img
                          src={user?.avatar}
                          className="h-[35px] rounded-full"
                        />
                      </Link>
                      <p>{user?.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
