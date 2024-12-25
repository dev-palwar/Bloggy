"use client";

import { Login } from "@/API/GraphQl/user";
import { setLoggedInUser } from "@/lib/user";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BasicModal from "./Modale";
import SignUp from "./SignUp";
import { Button } from "@/component/ui/button";

export default function LoginForm() {
  const [signUp, setSignUp] = React.useState<Boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [loginPayload, { loading, error, data }] = useMutation(Login);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      try {
        // Await the API call and destructure response
        const { data } = await loginPayload({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        if (data) {
          console.log(data);
          setLoggedInUser(data.login.token);
          router.push("/");
        }
      } catch (err) {
        // Handle unexpected errors
        console.error(err);
        toast.error("Something went wrong. Please try again.");
      }
    },
    [email, password, loginPayload, router]
  );

  React.useEffect(() => {
    if (error) toast.error(error.message);
  }, [handleSubmit, error]);

  return (
    <div className=" rounded-lg p-8 space-y-6">
      <BasicModal click={true}>
        <TestUser />
      </BasicModal>
      <h2 className="text-3xl font-light text-center text-gray-800">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-700 bg-transparent text-gray-700 focus:outline-none transition duration-300"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-700 bg-transparent text-gray-700 focus:outline-none transition duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600">
        New here?{" "}
        <Button
          onClick={() => setSignUp(!signUp)}
          variant={"link"}
          className="text-blue-700 font-medium hover:underline pb-2 hover:text-gray-700 transition duration-300"
        >
          Make an account
        </Button>
      </p>
      <div>
        {signUp && (
          <BasicModal click={true}>
            <SignUp />
          </BasicModal>
        )}
      </div>
    </div>
  );
}

const TestUser = () => {
  return (
    <div className="">
      Email and password for the test user
      <br />
      <div className="mt-3">
        Email: test@mail
        <br />
        password: test123
      </div>
    </div>
  );
};
