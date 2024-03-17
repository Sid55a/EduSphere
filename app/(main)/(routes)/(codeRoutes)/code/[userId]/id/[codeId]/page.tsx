import React from "react";
import CodeEditor from "../../_components/CodeEditor";
import { db } from "@/lib/db";

const CodeIdPage = async ({
  params,
}: {
  params: { userId: string; codeId: string };
}) => {
  const code = await db.code.findFirst({
    where: {
      id: params.codeId,
    },
  });

  if (!code) {
    return <></>;
  }

  return (
    <div>
      <CodeEditor profile={params.userId} codeData={code} />
    </div>
  );
};

export default CodeIdPage;
