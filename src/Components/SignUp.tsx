import React from "react";
import { signUpQuery } from "@/API/GraphQl/user";
import { useMutation } from "@apollo/client";
import { Avatar, TextField, Typography, Box, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImg } from "@/lib/uploadImg";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = React.useState<Boolean>();
  const [userImage, setUserImage] = React.useState<File | null>();
  const [dp, setDp] = React.useState<string | undefined>();
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
    setLoading(true);
    event.preventDefault();
    const dataa = new FormData(event.currentTarget);

    if (userImage) {
      const userImageUrl = await uploadImg(userImage, "users");

      signUpPayload({
        variables: {
          input: {
            name: dataa.get("name"),
            email: dataa.get("email"),
            password: dataa.get("password"),
            bio: dataa.get("bio"),
            nationality: dataa.get("nationality"),
            avatar: userImageUrl,
          },
        },
      });
    }
  };

  React.useEffect(() => {
    if (data && !toastDisplayed) {
      setLoading(false);
      toast.success("You can log in now");
      setToastDisplayed(true);
      if (formRef.current) {
        formRef.current.reset();
      }

      setUserImage(null); // Reset the userImage state
      setDp(undefined); // Reset the dp state
    }
    if (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }, [data, error, toastDisplayed]);

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="avatar-input">
          <Avatar
            id="avatar"
            sx={{ m: 1, bgcolor: "secondary.main" }}
            src={dp}
          ></Avatar>
          <input
            type="file"
            id="avatar-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
        <Typography component="h1" variant="body1">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="name"
            type="name"
            id="name"
            autoComplete="current-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="bio"
            label="bio"
            type="bio"
            id="bio"
            autoComplete="current-bio"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="nationality"
            label="nationality"
            type="nationality"
            id="nationality"
            autoComplete="current-nationality"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </Box>
      </Box>
    </>
  );
}
