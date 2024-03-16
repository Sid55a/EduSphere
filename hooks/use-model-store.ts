import {
  Channel,
  ChannelType,
  Profile,
  Server
} from "@prisma/client";
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

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  uri?: string;

  me?: Profile;
  other?: Profile;
  type?: string;

}

export const useModal = create<ModalStore>((set) => ({
  coord: { lat: "", lng: "" },
  type: null,
  data: {},
  mLink: "",
  isOpen: false,

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
