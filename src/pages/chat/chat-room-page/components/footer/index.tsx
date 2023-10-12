import { useState } from "react";
import Icon from "common/components/icons";
import {
  AttachButton,
  Button,
  ButtonsContainer,
  IconsWrapper,
  Input,
  SendMessageButton,
  Wrapper,
} from "./styles";
import { OmniSDKClientEvents} from 'omni-sdk';
const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" },
];




export default function Footer({ activeInbox }) {
  const [showIcons, setShowIcons] = useState(false);
  const [inputText, setInputText] = useState(""); // State to hold the value of the input

  // Handle text input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle send button click
  const handleSend = async () => {

    if (inputText.trim() !== "" && activeInbox) { // Ensure there's text to send and activeInbox is valid
      try {
        // TODO: Add to server side chatlog
        //@ts-ignore
        await window.omniSDK.startRecipe(activeInbox.id, {text: inputText}); // Assuming activeInbox.id is the required identifier

        // TODO: This is hacktastic. We probably want a CHAT_MESSAGE_SENT event instead
        globalThis.omniSDK.events.emit(OmniSDKClientEvents.CHAT_MESSAGE_RECEIVED, [
          {
            text: inputText,
            isOpponent: false
          }]
        )

        // TODO: Marshal response
        setInputText(""); // Clear input after sending
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // This ensures Enter without Shift triggers the send
      e.preventDefault(); // Prevent newline from being entered into the text area
      handleSend();
    }
  };

  return (
    <Wrapper>
      <IconsWrapper>
        <AttachButton onClick={() => setShowIcons(!showIcons)}>
          <Icon id="attach" className="icon" />
        </AttachButton>
        <ButtonsContainer>
          {attachButtons.map((btn) => (
            <Button showIcon={showIcons} key={btn.label}>
              <Icon id={btn.icon} />
            </Button>
          ))}
        </ButtonsContainer>
      </IconsWrapper>
      <Input
        placeholder="Type a message here .."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SendMessageButton onClick={handleSend} disabled={inputText.trim() === ""}>
        <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
