import React, { useState } from "react";
import { Inbox } from "common/types/common.type";

type User = {
  name: string;
  image: string;
};

type ChatContextProp = {
  user: User;
  inbox: Inbox[];
  activeChat?: Inbox;
  onChangeChat: (chat: Inbox) => void;
};

const initialValue: ChatContextProp = {
  user: { name: "Jazim Abbas", image: "/assets/images/girl.jpeg" },
  inbox: [
    {
      id: "1",
      name: "John Smith",
      image: "/assets/images/boy1.webp",
      lastMessage: "Testing",
      notificationsCount: 5,
      messageStatus: "SENT",
      timestamp: "08:21",
      isPinned: true,
    },
    {
      id: "2",
      name: "Jane Doe",
      image: "/assets/images/boy2.jpeg",
      lastMessage: "Hello there!",
      notificationsCount: 2,
      messageStatus: "SENT",
      timestamp: "12:15",
      isPinned: true,
      isOnline: true,
    },
    {
      id: "3",
      name: "Bob Johnson",
      image: "/assets/images/boy3.jpeg",
      lastMessage: "How are you?",
      notificationsCount: 0,
      messageStatus: "READ",
      timestamp: "6:47",
    },
    {
      id: "4",
      name: "Samantha Lee",
      image: "/assets/images/girl1.jpeg",
      lastMessage: "See you tomorrow!",
      messageStatus: "SENT",
      timestamp: "09:35",
    },
    {
      id: "5",
      name: "William Chen",
      image: "/assets/images/boy4.jpeg",
      lastMessage: "Thanks for your help!",
      messageStatus: "DELIVERED",
      timestamp: "5:22",
    },
    {
      id: "6",
      name: "Emily Kim",
      image: "/assets/images/girl2.jpeg",
      lastMessage: "Are you free tonight?",
      messageStatus: "READ",
      timestamp: "4:10",
      isOnline: true,
    },
    {
      id: "7",
      name: "David Wong",
      image: "/assets/images/boy5.webp",
      lastMessage: "Let's meet at the park!",
      messageStatus: "SENT",
      timestamp: "13:48",
    },
    {
      id: "8",
      name: "Karen Lee",
      image: "/assets/images/girl.jpeg",
      lastMessage: "I'll be there in 10 minutes.",
      messageStatus: "DELIVERED",
      timestamp: "08:56",
      isOnline: true,
    },
    {
      id: "9",
      name: "Daniel Lee",
      image: "/assets/images/boy6.webp",
      lastMessage: "Can you send me the file?",
      messageStatus: "READ",
      timestamp: "19:03",
    },
  ],
  onChangeChat() {
    throw new Error();
  },
};

export const ChatContext = React.createContext<ChatContextProp>(initialValue);

export default function ChatProvider(props: { children: any }) {
  const { children } = props;

  const [user] = useState<User>(initialValue.user);
  const [inbox] = useState<Inbox[]>(initialValue.inbox);
  const [activeChat, setActiveChat] = useState<Inbox>();

  const handleChangeChat = (chat: Inbox) => {
    setActiveChat(chat);
  };

  return (
    <ChatContext.Provider value={{ user, inbox, activeChat, onChangeChat: handleChangeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);
