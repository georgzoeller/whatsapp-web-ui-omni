import { forwardRef, useEffect, useState } from "react"; // import useState and useEffect
import { useParams } from "react-router-dom";
import { OmniSDKClientEvents} from 'omni-sdk';
import Icon from "common/components/icons";
import useScrollToBottom from "./hooks/useScrollToBottom";
import { Message } from "./data/get-messages";  // We no longer need getMessages
import {
  ChatMessage,
  ChatMessageFiller,
  ChatMessageFooter,
  Container,
  DateComponent,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";

type MessagesListProps = {
  onShowBottomIcon: Function;
  shouldScrollToBottom?: boolean;
};

export default function MessagesList(props: MessagesListProps) {
  const { onShowBottomIcon, shouldScrollToBottom } = props;

  const params = useParams();
  const [messages, setMessages] = useState([]); // Initialize state

  useEffect(() => {

    // Subscribe to the global chat event handler
    const handleMessage = (message:any) => {

      // Ensure the incoming message belongs to the current chat
      //if (message.sender === params.id) {
        // Append the new message to the current list

        const convertedMessage = message.map((m:any) => {
        {
          return {
            id: Date.now(),
            date: (new Date()).toLocaleDateString(),
            time:  (new Date()).toLocaleTimeString(),
            messageStatus: "READ",
            isOpponent: m.isOpponent ?? true,
            body: m.text
          }
        }
        })

        setMessages((prevMessages) => {
          return prevMessages.concat(convertedMessage);
        });
      //}
    };

    // Fetch messages using the new function
    const fetchMessages = async () => {
      try {
        //@ts-ignore
        const result = await globalThis.omniSDK.runExtensionScript("chat", {chatId: params.id});
        console.log("subscribing...")
        globalThis.omniSDK.events.on(OmniSDKClientEvents.CHAT_MESSAGE_RECEIVED, handleMessage);
        setMessages(result.messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    //@ts-ignore


    fetchMessages();

    return () => {
      //@ts-ignore
      globalThis.omniSDK.events.off(OmniSDKClientEvents.CHAT_MESSAGE_RECEIVED, handleMessage);
    };


    // eslint-disable-next-line
  }, [params.id]);

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.id
  );

  return (
    <Container ref={containerRef}>
      <EncryptionMessage>
        <Icon id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read
        or listen to them. Click to learn more.
      </EncryptionMessage>
      <DateWrapper>
        <DateComponent> TODAY </DateComponent>
      </DateWrapper>
      <MessageGroup>
        {messages.map((message:Message, i) => {
          if (i === messages.length - 1) {
            return <SingleMessage key={message.id} message={message} ref={lastMessageRef} />;
          } else {
            return <SingleMessage key={message.id} message={message} />;
          }
        })}
      </MessageGroup>
    </Container>
  );
}

const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;

  return (
    <ChatMessage
      key={message.id}
      className={message.isOpponent ? "chat__msg--received" : "chat__msg--sent"}
      ref={ref}
    >
     <span dangerouslySetInnerHTML={{ __html: message.body }}></span>


      <ChatMessageFiller />
      <ChatMessageFooter>
        <span>{message.timestamp}</span>
        {!message.isOpponent && (
          <Icon
            id={`${message.messageStatus === "SENT" ? "singleTick" : "doubleTick"}`}
            className={`chat__msg-status-icon ${
              message.messageStatus === "READ" ? "chat__msg-status-icon--blue" : ""
            }`}
          />
        )}
      </ChatMessageFooter>
    </ChatMessage>
  );
});
