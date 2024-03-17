import { currentProfile } from "@/lib/current-profile";
import CodeEditor from "./_components/CodeEditor";
import { redirectToSignIn } from "@clerk/nextjs";

const CodeEditorPage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  return (
    <>
      <div className="h-screen bg-[#0f0a19]  ">
        <CodeEditor profile={profile.id} />
      </div>
    </>
  );
};

export default CodeEditorPage;
