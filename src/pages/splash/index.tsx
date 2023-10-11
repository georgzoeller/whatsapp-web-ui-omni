import {
  Container,
  EncryptionIcon,
  Link,
  Logo,
  LogoWrapper,
  Progress,
  SubTitle,
  Title,
} from "./styles";

type SplashPageProps = {
  progress: number;
};

export default function SplashPage(props: SplashPageProps) {
  const { progress } = props;

  return (
    <Container>
      <LogoWrapper>
        <Logo id="whatsapp" />
      </LogoWrapper>
      <Progress progess={progress} />
      <Title>Not WhatsApp</Title>
      <SubTitle>
        <EncryptionIcon id="lock" /> Not End-to-end encrypted. Based on work by{" "}
        <Link href="https://github.com/jazimabbas" target="_blank">
          Jazim Abbas
        </Link>{" "}
        ❤️.
      </SubTitle>
    </Container>
  );
}
