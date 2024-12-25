import Link from "next/link";
import { Button } from "@/component/ui/button";
import { PenSquare, LogIn, BookOpen, User, LogOut } from "lucide-react";
import { getLoggedInUser } from "@/lib/user";
import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { generateCoolName } from "@/lib/uploadImg";

export function Header() {
  const [user, setUser] = React.useState<LoggedInUser | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
          setUser({
            userId: loggedInUser.userId,
            avatar: loggedInUser.avatar,
            email: loggedInUser.email,
          });
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    window.location.reload();
  };

  return (
    <header>
      <div className="z-30 container mx-auto px-4 py-4 flex justify-between items-center fixed right-0 left-0 bg-white top-0">
        <Link href="/" className="flex items-center gap-4">
          <BookOpen className="h-6 w-6" />
          <span className="text-lg font-semibold">Bloggy</span>
        </Link>
        <nav className="flex items-center space-x-4 gap-4 justify-end">
          <Link href={"/write"}>
            <Button variant="ghost" size="sm">
              <PenSquare className="h-4 w-4 mr-2" />
              Write
            </Button>
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Image
                    src={user.avatar}
                    alt="User avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex flex-col items-start">
                  <div className="font-medium">{user.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {generateCoolName()}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <Link
                  href={`/profile/${user.userId}`}
                  className="cursor-pointer"
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </Link>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
