import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md px-6">
        <LoginForm />
      </div>
    </div>
  );
}
