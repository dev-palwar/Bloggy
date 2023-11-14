"use client";
import { context, variables } from "@/API/GraphQl/context";
import { followUnfollowQuery, getProfile } from "@/API/GraphQl/user";
import Blog from "@/Components/Card";
import { jwtDecode } from "@/lib/jwt";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import React from "react";

export default function Page({ params }: IDS) {
  const [ifFollows, setIfFollows] = React.useState<Boolean>(false);
  const [userData, setUserData] = React.useState<Author | undefined>();

  // Take care of it
  const token = localStorage.getItem("auth_token") as string;
  const { decodedToken } = jwtDecode(token);

  const { loading, error, data, refetch } = useQuery(
    getProfile,
    variables(params.userId)
  );

  const [followPayload, followStatus] = useMutation(followUnfollowQuery, {
    ...context(),
    onCompleted: () => {
      // Refetches the user profile data after a successful follow action
      refetch();
    },
  });

  const handleFollow = (userId: string) => followPayload(variables(userId));

  React.useEffect(() => {
    refetch();
    if (data) {
      setUserData(data?.Profile);
      // Checks if the currently logged-in user is following the user
      setIfFollows(
        data?.Profile?.followers.some(
          (follower: User) => follower.id === decodedToken.userId
        )
      );
    }
  }, [data, followStatus]);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="container">
          <div className="home-section flex justify-evenly">
            <div className="Blog-section flex flex-col">
              <h1 className="text-[3rem]">{userData?.name}</h1>
              <div>
                {userData?.blogs.map((value: Blog) => (
                  <Blog
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    description={value.description}
                    poster={value.poster}
                    author={value.author}
                    createdAt={value.createdAt}
                    category={value.category}
                  />
                ))}
              </div>
            </div>
            <div className="Alert-section pl-[10px] flex flex-col h-[100vh] w-[45vh] sticky top-0">
              <div className="user-details-section flex flex-col p-[1rem]">
                <div className="h-[12vh] w-[12vh] mb-3">
                  <img
                    src={userData?.avatar}
                    alt="user"
                    className="object-cover rounded-full h-full w-full"
                  />
                </div>
                <h1 className="font-bold">{userData?.name}</h1>
                <p className="opacity-80">
                  {userData?.followers.length} follower
                </p>
                <p className="mb-3">{userData?.bio}</p>
                <div className="flex gap-2">
                  {decodedToken.userId != params.userId && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleFollow(userData?.id ?? "")}
                      >
                        {ifFollows ? "following" : "Follow"}
                      </Button>
                      <Button variant="outlined" color="success">
                        Connect
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="following flex flex-col p-4 gap-2">
                <h1 className="font-bold pb-[10px] border-b-2">Following</h1>
                {userData?.following.map((user: User) => {
                  return (
                    <div className="flex opacity-80 text-[15px] items-center gap-3 ">
                      <Link href={`/profile/${user.id}`}>
                        <div>
                          <img
                            alt={user.name}
                            src={user?.avatar}
                            className="h-[35px] rounded-full"
                          />
                        </div>
                      </Link>
                      <p>{user?.name}</p>
                    </div>
                  );
                })}
              </div>
              <div className="followers flex flex-col p-4 gap-2">
                <h1 className="font-bold pb-[10px] border-b-2">Followers</h1>
                {userData?.followers.map((user: User) => {
                  return (
                    <div className="flex opacity-80 text-[15px] items-center gap-3 ">
                      <Link href={`/profile/${user.id}`}>
                        <img
                          alt={user.name}
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
