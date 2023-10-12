import React, { useState, useEffect } from "react";
import { Inbox } from "common/types/common.type";

type User = {
  name: string;
  image: string;
};

type ChatContextProp = {
  user?: User;  // Make user optional since we'll get it from the API now
  inbox: Inbox[];
  loading: boolean;
  activeChat?: Inbox;
  onChangeChat: (chat: Inbox) => void;
};

const initialValue: ChatContextProp = {
  inbox: [],
  loading: true,
  onChangeChat() {
    throw new Error();
  },
};
interface MyWindow extends Window {
  omniSDK: any;
}
declare var window: MyWindow;



export const ChatContext = React.createContext<ChatContextProp>(initialValue);

export default function ChatProvider(props: { children: any }) {
  const { children } = props;

  const [user, setUser] = useState<User | undefined>();
  const [inbox, setInbox] = useState<Inbox[]>(initialValue.inbox);
  const [loading, setLoading] = useState<boolean>(initialValue.loading);
  const [activeChat, setActiveChat] = useState<Inbox>();

  useEffect(() => {
    window.omniSDK.runExtensionScript("inbox",{})
      .then(data => {

        console.log('hooking inbox')
        if (globalThis.omniSDK.args?.chat)
        {

          const  chat = globalThis.omniSDK.args.chat
          if (!data.inbox.find(i=>i.id === chat.id))
          {
            data.inbox = data.inbox.concat([chat])
          }
        }

        setUser(data.user); // Set the user object
        setInbox(data.inbox); // Set the inbox array
        setLoading(false);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  }, []);

  const handleChangeChat = (chat: Inbox) => {
    setActiveChat(chat);
  };

  return (
    <ChatContext.Provider value={{ user, inbox, loading, activeChat, onChangeChat: handleChangeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);
