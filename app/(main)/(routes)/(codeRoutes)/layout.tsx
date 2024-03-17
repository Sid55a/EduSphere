import { CodeSidebar } from "@/components/codeComponent/codeSideBar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

const PageEditorLayout = async ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const codes = await db.code.findMany({
    where: {
      profileId: profile.id,
    },
  });
  return (
    <div>
      <CodeSidebar codes={codes} profile={profile} />
      <main className="h-full md:pl-[238px]">{children}</main>
    </div>
  );
};

export default PageEditorLayout;
