"use client";

import { useEffect, useState } from "react";
import { AiAskAnythingModel } from "../models/aiAskAnythingModal";
import { AiChatSummModel } from "../models/aiChatSummModal";
import { AiGroupChatSummModel } from "../models/aiGroupChatSummModal";
import { AiGroupNextReplyModel } from "../models/aiGroupNextReplyModal";
import { AiInChatAnalyChatModel } from "../models/aiInChatAnalyChatModal";
import { AiInGroupChatQAModel } from "../models/aiInGroupChatQA";
import { AiMusicSearchModel } from "../models/aiMusicSearchModal";
import { AiVoiceModel } from "../models/aiVoiceModal";
import { ComputerGameModel } from "../models/computer-model";
import { CreateChannelModal } from "../models/create-channel-modal";
import { CreateServerModal } from "../models/create-server-modal";
import { CricModel } from "../models/cricModal";
import { DeleteChannelModal } from "../models/deleteChannelModal";
import { DeleteMessageModal } from "../models/deleteMessageModal";
import { DeleteServerModal } from "../models/deleteServerModal";
import { DoubleGameModel } from "../models/doublegame-Model";
import { EditChannelModal } from "../models/edit-channel-modal";
import { EditServerModal } from "../models/edit-server";
import { GameModel } from "../models/game-model";
import { InviteModal } from "../models/invite-modal";
import { JokeModel } from "../models/jokeModal";
import { LeaveServerModal } from "../models/leaveServermodal";
import { MapModel } from "../models/mapModal";
import { MemberModal } from "../models/member-modal";
import { MessageFileModel } from "../models/messageFileModal";
import { MusicSearchModel } from "../models/musicSearchModal";
import { NewsModel } from "../models/newsModal";
import { NoteModel } from "../models/noteModal";
import { PaymentModel } from "../models/paymentModal";
import { SelfGameModel } from "../models/selfgame-model";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModel />
      <DeleteMessageModal />
      <MusicSearchModel />
      <AiMusicSearchModel />
      <AiChatSummModel />
      <AiAskAnythingModel />
      <AiInChatAnalyChatModel />
      <AiVoiceModel />
      <PaymentModel />
      <JokeModel />
      <MapModel />
      <NoteModel />
      <CricModel />
      <NewsModel />
      <SelfGameModel />
      <ComputerGameModel />
      <GameModel />
      <DoubleGameModel />
      <AiGroupChatSummModel />
      <AiInGroupChatQAModel />
      <AiGroupNextReplyModel />
    </>
  );
};
