import React from "react";
import { signUpQuery } from "@/API/GraphQl/user";
import { useMutation } from "@apollo/client";
import { Avatar, TextField, Typography, Box, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImg } from "@/lib/uploadImg";

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
    event.preventDefault();

    // Access form data
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const nationality = formData.get("nationality") as string;

    // Check if userImage is available
    let userImageUrl: string | undefined;
    if (userImage) {
      try {
        userImageUrl = await uploadImg(userImage, "users");
      } catch (error) {
        toast.error("Error while uploading image");
        return;
      }
    } else {
      // Sets a random avatar if userImage is not available
      userImageUrl = `https://api.multiavatar.com/${name}.svg`;
    }

    // Checks if required fields are filled
    if (!email || !password || !name || !bio || !nationality) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Proceeds with API call
    setLoading(true);

    try {
      signUpPayload({
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
      toast.error("Error while creating account");
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

      setUserImage(null); // Resets the userImage state
      setDp(undefined); // Resets the dp state
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
            required
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
