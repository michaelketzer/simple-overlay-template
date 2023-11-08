import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import SignInButton from "./sign-in-button";

interface Props {
  shrinking?: boolean;
}

export default async function SignInButtonWithSession({
  shrinking = false,
}: Props) {
  const session = await getServerSession(authOptions);
  return <SignInButton session={session} shrinking={shrinking} />;
}
