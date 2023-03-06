import Icon from "common/components/icons";
import {
  AboutItem,
  ActionSection,
  ActionText,
  Avatar,
  AvatarWrapper,
  Heading,
  HeadingWrapper,
  MediaButton,
  MediaImage,
  MediaImagesWrapper,
  PersonalInfo,
  ProfileName,
  Section,
  Wrapper,
} from "./styles";

export default function ProfileSection() {
  return (
    <Wrapper>
      <PersonalInfo>
        <AvatarWrapper>
          <Avatar src="/assets/images/girl.jpeg" alt="User Profile" />
        </AvatarWrapper>
        <ProfileName>Jazim Abbas</ProfileName>
      </PersonalInfo>

      <Section>
        <HeadingWrapper>
          <Heading>Media, Links and Documents</Heading>
          <MediaButton>
            <Icon id="rightArrow" className="icon" />
          </MediaButton>
        </HeadingWrapper>
        <MediaImagesWrapper>
          <MediaImage src="/assets/images/placeholder.jpeg" alt="Media" />
          <MediaImage src="/assets/images/placeholder.jpeg" alt="Media" />
          <MediaImage src="/assets/images/placeholder.jpeg" alt="Media" />
        </MediaImagesWrapper>
      </Section>

      <Section>
        <HeadingWrapper>
          <Heading>About and phone number</Heading>
        </HeadingWrapper>
        <ul>
          <AboutItem>Out here saving the world, one block of code at a time.</AboutItem>
          <AboutItem>+123456789</AboutItem>
        </ul>
      </Section>

      <ActionSection>
        <Icon id="block" className="icon" />
        <ActionText>Block</ActionText>
      </ActionSection>
      <ActionSection>
        <Icon id="thumbsDown" className="icon" />
        <ActionText>Report contact</ActionText>
      </ActionSection>
      <ActionSection>
        <Icon id="delete" className="icon" />
        <ActionText>Delete chat</ActionText>
      </ActionSection>
    </Wrapper>
  );
}
