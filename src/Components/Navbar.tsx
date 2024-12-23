import Link from "next/link";
import { Button } from "@/component/ui/button";
import { PenSquare, LogIn, BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="f">
      <div
        className="container mx-auto px-4 py-4 flex justify-between items-center"
        style={{
          position: "fixed",
          top: "-16px",
          padding: "1rem",
          right: "0",
          left: "0",
          zIndex: "10000",
          background: "white",
        }}
      >
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-lg font-semibold">BlogHub</span>
        </Link>
        <nav className="flex items-center space-x-4" style={{ gap: "1rem" }}>
          <Button
            variant="ghost"
            size="sm"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <PenSquare className="h-4 w-4 mr-2" />
            Write
          </Button>
          <Button
            variant="outline"
            size="sm"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
}
