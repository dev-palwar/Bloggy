"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { logout } from "@/lib/logout";
import EditIcon from "@mui/icons-material/Edit";
import { getLoggedInUser } from "@/lib/user";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

export default function ResponsiveAppBar() {
  const [user, setUser] = React.useState<LoggedInUser>({
    avatar: "",
    userId: "",
    email: ""
  });

  
  React.useEffect(() => {
    // Checking if localStorage is available (only runs on the client side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("auth_token") as string;

      if (token) {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
          console.log(loggedInUser);

          setUser({
            userId: loggedInUser.userId,
            avatar: loggedInUser.avatar,
            email: loggedInUser.email,
          });
        }
      }
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Container className="navbar max-w-[81vw] z-10">
      <Toolbar disableGutters>
        <Link href={"/"}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Bloggy
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
        </Box>

        <EditIcon />
        <Link href={getLoggedInUser() ? "/write" : "/login"}>
          <Typography marginLeft={0.1} marginRight={3} ml={1}>
            Add a blog
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 0 }}>
          {!user.userId ? (
            <Link href={"/login"}>
              <h1 className="cursor-pointer">Login</h1>
            </Link>
          ) : (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user.avatar} />
              </IconButton>
            </Tooltip>
          )}

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                {setting == "Logout" ? (
                  <button onClick={() => logout()}>
                    <Typography textAlign="center">{setting}</Typography>
                  </button>
                ) : (
                  <Link href={`/${setting.toLowerCase()}/${user.userId}`}>
                    <Typography textAlign="center">{setting}</Typography>
                  </Link>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
}
