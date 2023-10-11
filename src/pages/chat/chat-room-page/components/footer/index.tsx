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
        // TODO: Marshal response
        setInputText(""); // Clear input after sending
      } catch (error) {
        console.error("Failed to send message:", error);
      }
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
      />
      <SendMessageButton onClick={handleSend} disabled={inputText.trim() === ""}>
        <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
