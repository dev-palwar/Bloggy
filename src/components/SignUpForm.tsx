import React from "react";
import { signUpQuery } from "@/API/GraphQl/user";
import { useMutation } from "@apollo/client";
import { uploadImg } from "@/lib/uploadImg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function SignUpForm() {
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userImage, setUserImage] = React.useState<File | null>(null);
  const [dp, setDp] = React.useState<string | undefined>(undefined);
  const [signUpPayload, { error, data }] = useMutation(signUpQuery);
  const [toastDisplayed, setToastDisplayed] = React.useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUserImage(file);
      const imageUrl = URL.createObjectURL(file);
      setDp(imageUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const nationality = formData.get("nationality") as string;

    let userImageUrl: string | undefined;
    if (userImage) {
      try {
        userImageUrl = await uploadImg(userImage, "users");
      } catch (error) {
        toast({
          description: "Error while uploading image",
          variant: "destructive",
        });
        return;
      }
    } else {
      userImageUrl = `https://api.multiavatar.com/${name}.svg`;
    }

    if (!email || !password || !name || !bio || !nationality) {
      toast({
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await signUpPayload({
        variables: {
          input: {
            name,
            email,
            password,
            bio,
            nationality,
            avatar: userImageUrl,
          },
        },
      });
    } catch (error) {
      toast({
        description: "Error while creating account.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (data && !toastDisplayed) {
      setToastDisplayed(true);
      toast({
        description: "Account created successfully! You can log in now. 👍",
      });
      if (formRef.current) {
        formRef.current.reset();
      }
      setUserImage(null);
      setDp(undefined);
    }
    if (error) {
      toast({ description: error.message });
    }
  }, [data, error, toast, toastDisplayed]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <form
        ref={formRef}
        className=" p-8 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="avatar-input" className="cursor-pointer">
            <Avatar className="w-24 h-24">
              {dp ? (
                <AvatarImage src={dp} />
              ) : (
                <AvatarFallback>?</AvatarFallback>
              )}
            </Avatar>
          </label>
          <input
            type="file"
            id="avatar-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Name" required />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Write a short bio..."
              required
            />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              name="nationality"
              placeholder="Nationality"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
}
