import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export const cChats = async (id2?: string) => {
  const profile = await currentProfile();
  const id1 = profile?.id;
  const messages = db.conversation.findMany({
    where: {
      OR: [
        { memberOneId: id1, memberTwoId: id2 },
        { memberOneId: id2, memberTwoId: id1 },
      ],
    },
  });
  console.log(messages);
  return messages;
};
