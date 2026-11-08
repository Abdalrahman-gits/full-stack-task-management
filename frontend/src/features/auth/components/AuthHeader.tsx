import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import ThemeToggler from "@/ui/ThemeToggler";
import Logo from "@/ui/Logo";

export default function AuthHeader() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <header className="bg-card flex h-20 shrink-0 items-center justify-between px-6 sm:h-26 sm:px-10 lg:px-16">
      <Logo />

      <div className="flex items-center gap-4 text-sm">
        <ThemeToggler />
        <div className="flex gap-2">
          <span className="text-muted hidden sm:inline">
            {isLogin ? "Create new account?" : "Already have an account?"}
          </span>
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-action focus-visible:ring-action/40 group flex items-center gap-2 font-bold hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {isLogin ? "Sign up" : "Sign in"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}
