"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { Login } from "@/API/GraphQl/user";
import BasicModal from "@/Components/Modale";
import { useRouter } from "next/navigation";
import { setLoggedInUser } from "@/lib/user";
import SignUp from "@/Components/SignUp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function SignInSide() {
  const router = useRouter();

  const [signUp, setSignUp] = React.useState<Boolean>(false);

  const [loginPayload, { loading, error, data }] = useMutation(Login);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Accesses form data
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Checks if required fields are filled
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Proceeds with API call
    loginPayload({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (data) {
      setLoggedInUser(data.login.token);
      router.push("/");
    }
  };

  React.useEffect(() => {
    if (error) toast.error(error.message);
  }, [handleSubmit]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="body1">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Box>
            <p>
              New here?{" "}
              <span
                className="text-purple-500 cursor-pointer"
                onClick={() => setSignUp(!signUp)}
              >
                Make an account
              </span>
            </p>
          </Box>
          {signUp && <BasicModal click={true} children={<SignUp />} />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
