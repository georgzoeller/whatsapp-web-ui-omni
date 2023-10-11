import ChatLayout from "../layouts";
import Icon from "common/components/icons";
import { useAppTheme } from "common/theme";
import { Container, ImageWrapper, Title, IconWrapper, Link, Image, Text } from "./styles";

export default function UnSelectedChatPage() {
  const theme = useAppTheme();

  const getImageURL = () => {
    if (theme.mode === "light") return "./assets/images/entry-image-light.webp";
    return "./assets/images/entry-image-dark.png";
  };

  return (
    <ChatLayout>
      <Container>
        <ImageWrapper>
          <Image src={getImageURL()} />
        </ImageWrapper>
        <Title> OmniWA Web </Title>
        <Text>
          Welcome to OmniWA, your chat interface into Omnitool<br />
          Use OmniWA to interact with your chat enabled OmniTool recipes in a familiar environment.
        </Text>
        <Text>
          <span>Built on technology by</span>{" "}
          <Link target="_blank" href="https://github.com/jazimabbas">
            Jazim Abbas
          </Link>
          <IconWrapper>
            <Icon id="heart" />
          </IconWrapper>
        </Text>
      </Container>
    </ChatLayout>
  );
}
