"use client";

import { Twitch } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import LoadingDots from "../../../components/ui/loading-dots";
import { cn } from "../../../lib/utils";

export default function SignInButton({
  session,
  shrinking,
}: {
  session: Session | null;
  shrinking?: boolean;
}) {
  const [signInClicked, setSignInClicked] = useState(false);

  if (session) {
    return (
      <Link href="/app">
        <Button>
          <span className={cn(shrinking && "hidden md:block")}>
            Open Your Dashboard
          </span>
          <span className={cn("hidden", shrinking && "block md:hidden")}>
            App
          </span>
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className="!hover:text-[#9146FF] group  relative h-9  max-w-fit rounded-full border border-[#9146FF] !bg-[#9146FF] px-5 py-1.5 text-sm !text-white transition-colors hover:bg-white"
      onClick={(e) => {
        e.preventDefault();
        setSignInClicked(true);
        signIn("twitch", {
          callbackUrl: `${window.location.origin}/app`,
        });
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center space-x-2 transition-opacity duration-75",
          signInClicked && "opacity-0"
        )}
      >
        <Twitch className="h-5 w-5" strokeWidth={1.5} />
        <p className="hidden md:block">Sign in with Twitch</p>
      </div>

      {signInClicked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingDots />
        </div>
      )}
    </Button>
  );
}
