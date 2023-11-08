import "server-only";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ThemeToggle } from "../theme-toggle";
import SignInButtonWithSession from "./components/sign-in-button-with-session";

export default async function Home() {
  return (
    <form className="h-screen w-screen flex items-center justify-center">
      <Card className="min-w-[420px]">
        <div className="flex h-16 items-center justify-between p-6">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500">
              App
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-x-2">
            <ThemeToggle />
          </div>
        </div>

        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <SignInButtonWithSession />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
