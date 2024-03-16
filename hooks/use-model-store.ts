import { Channel, ChannelType, Profile, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage"
  | "musicSelector"
  | "aiMusicSugg"
  | "aiChatSumm";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  uri?: string;
  musicAiQ?: string;
  aiMusicSugg?: string;
  aiChatSugg?: string;

  me?: Profile;
  other?: Profile;
  type?: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  mLink: string;
  mAiQ: string;
  aiMusicCom: string;
  aiChatResult: string;
  aiImageResult: string;
  aiAskResult: string;
  rawQuery: string;
  fnqResult: string;
  aiVoiceLink: string;

  setCoord: (la: any, ln: any) => void;
  setCurrEMode: (em: number) => void;
  setQuote: (q: string) => void;
  setAiAskResult: (aiAskResponse: string) => void;
  setAiChatSugg: (aiSugg: string) => void;
}

export const useModal = create<ModalStore>((set) => ({
  coord: { lat: "", lng: "" },
  type: null,
  data: {},
  mLink: "",
  isOpen: false,
  mLink: "",
  isOpen: false,
  mAiQ: "",
  aiChatResult: "",
  aiMusicCom: "",
  aiImageResult: "",
  aiAskResult: "",
  rawQuery: "",
  fnqResult: "",
  aiVoiceLink: "",
  setTasks: (t: TODO[]) => set({ tasks: t }),
  setCoord: (la, ln) => set({ coord: { lat: la, lng: ln } }),
  setCurrEMode: (em) => set({ currEMode: em }),
  setQuote: (q) => set({ quote: q }),
  setAiVoiceLink: (link) => set({ aiVoiceLink: link }),
  setFnqResult: (fnq) => set({ fnqResult: fnq }),
  setRawQuery: (aiRawQuery) => set({ rawQuery: aiRawQuery }),
  setAiAskResult: (aiAskResponse) => set({ aiAskResult: aiAskResponse }),
  setAiImageResult: (aiImageUrl) => set({ aiImageResult: aiImageUrl }),
  setAiMusicSugg: (aiMusicSugg) => set({ aiMusicCom: aiMusicSugg }),
  setAiChatSugg: (aiChatSugg) => set({ aiChatResult: aiChatSugg }),
  setmAiQ: (uri) => set({ mAiQ: uri }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
      groupSummary: undefined,
      aiAskResult: undefined,
      fnqResult: undefined,
    }),
  musicUri: (uri) => set({ mLink: uri }),
}));
