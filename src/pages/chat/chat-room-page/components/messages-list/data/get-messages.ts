import { MessageStatus } from "common/types/common.type";

export type Message = {
  id: string;
  body: string;
  date: string;
  timestamp: string;
  messageStatus: MessageStatus;
  isOpponent: boolean;
};

