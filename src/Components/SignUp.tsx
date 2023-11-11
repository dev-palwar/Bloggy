import React from "react";
import { signUpQuery } from "@/API/GraphQl/user";
import { useMutation } from "@apollo/client";
import { Avatar, TextField, Typography, Box, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [signUpPayload, { loading, error, data }] = useMutation(signUpQuery);
  const [toastDisplayed, setToastDisplayed] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataa = new FormData(event.currentTarget);
    signUpPayload({
      variables: {
        input: {
          name: dataa.get("name"),
          email: dataa.get("email"),
          password: dataa.get("password"),
          bio: dataa.get("bio"),
          nationality: dataa.get("nationality"),
        },
      },
    });
  };

  React.useEffect(() => {
    if (data && !toastDisplayed) {
      toast.success("You can log in now");
      setToastDisplayed(true);
    }
    if (error) {
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="body1">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
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
