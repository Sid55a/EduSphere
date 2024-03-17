import {
  Channel,
  ChannelType,
  Note,
  Profile,
  Server,
  TODO,
} from "@prisma/client";
import { type } from "os";
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
  | "aiChatSumm"
  | "imageGeneration"
  | "askAnything"
  | "aiInChatAsk"
  | "aiTextToVoice"
  | "payment"
  | "pdfChat"
  | "jokeModel"
  | "mapModel"
  | "noteModal"
  | "cricketModel"
  | "newsModal";

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
  aiImageUrl?: string;
  aiAskResponse?: string;
  aiRawQuery?: string;
  me?: Profile;
  other?: Profile;
  type?: string;
  aiGroupQAInput?: string;
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
  quote: string;
  currEMode: number;
  coord: { lat: any; lng: any };
  tasks: TODO[];
  cricData: {
    seriesName: string;
    matchHistory: string;
    matchStatus: string;
    team1Name: string;
    team1Runs: string;
    team2Name: string;
    team2Runs: string;
    matchCurrentInfo: string;
    player1: string;
    player2: string;
    player3: string;
    player4: string;
  };
  groupChatData: string;
  groupSummary: string;
  setGroupChatData: (data: string) => void;
  setCricData: (t: {
    seriesName: string;
    matchHistory: string;
    matchStatus: string;
    team1Name: string;
    team1Runs: string;
    team2Name: string;
    team2Runs: string;
    matchCurrentInfo: string;
    player1: string;
    player2: string;
    player3: string;
    player4: string;
  }) => void;
  setTasks: (t: TODO[]) => void;
  notes: Note[];
  setNotes: (t: Note[]) => void;
  setCoord: (la: any, ln: any) => void;
  setCurrEMode: (em: number) => void;
  setQuote: (q: string) => void;
  setAiAskResult: (aiAskResponse: string) => void;
  setAiChatSugg: (aiSugg: string) => void;
  setGroupSummary: (text: string) => void;
  setmAiQ: (q: string) => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  musicUri: (uri: string) => void;
  setAiMusicSugg: (aiMusicSugg: any) => void;
  setAiImageResult: (aiImageUrl: string) => void;
  setRawQuery: (aiRawQuery: string) => void;
  setFnqResult: (fnq: string) => void;
  setAiVoiceLink: (link: string) => void;
}

export const useModal = create<ModalStore>((set) => ({
  coord: { lat: "", lng: "" },
  type: null,
  data: {},
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
  quote: "",
  currEMode: 1,
  tasks: [],
  notes: [],
  cricData: {
    seriesName: "",
    matchHistory: "",
    matchStatus: "",
    team1Name: "",
    team1Runs: "",
    team2Name: "",
    team2Runs: "",
    matchCurrentInfo: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  },
  groupSummary: "",
  groupChatData: "",
  setGroupChatData: (data: string) => set({ groupChatData: data }),
  setCricData: (t: {
    seriesName: string;
    matchHistory: string;
    matchStatus: string;
    team1Name: string;
    team1Runs: string;
    team2Name: string;
    team2Runs: string;
    matchCurrentInfo: string;
    player1: string;
    player2: string;
    player3: string;
    player4: string;
  }) => set({ cricData: { ...t } }),
  setGroupSummary: (text: string) => set({ groupSummary: text }),
  setNotes: (t: Note[]) => set({ notes: t }),
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
