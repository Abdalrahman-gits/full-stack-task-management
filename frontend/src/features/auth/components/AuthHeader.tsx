import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import octomMark from "@/assets/octom-mark.svg";
import ThemeToggler from "../../../ui/ThemeToggler";

export default function AuthHeader() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  console.log(isLogin, pathname);

  return (
    <header className="bg-card flex h-20 shrink-0 items-center justify-between px-6 sm:h-26 sm:px-10 lg:px-16">
      <Link
        to="/"
        className="flex items-center gap-3 focus-visible:outline-none"
      >
        <img src={octomMark} alt="" className="h-9 w-8" />
        <span className="text-ink text-xl font-bold">OCTOM.</span>
      </Link>

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
