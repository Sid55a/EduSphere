import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CodePage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  return redirect(`/code/${profile.id}`);

 
};

export default CodePage;
