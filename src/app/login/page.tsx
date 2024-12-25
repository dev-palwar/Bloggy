import Image from "next/image";
import { getRandomImage } from "@/lib/unsplash";
import LoginForm from "@/Components/LoginForm";

export default async function LoginPage() {
  const imageUrl = await getRandomImage();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Random aesthetic image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-50"
        />
      )}
      <div className="z-10 w-full max-w-md px-6">
        <LoginForm />
      </div>
    </div>
  );
}
