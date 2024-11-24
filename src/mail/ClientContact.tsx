import {
  Html,
  Head,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Img,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

const ClientContact = ({ name = "" }: { name: string }) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>We received your message | Tropifresh</title>
      </Head>
      <Tailwind>
        <Container>
          <Preview>We received your message | Tropifresh</Preview>
          <Section>
            <Row className="py-10 box-border">
              <Column>
                <Img
                  src="https://tropifresh.co/colorful-logo.svg"
                  alt="Tropifresh"
                  className="w-full h-auto max-w-[200px]"
                />
              </Column>
            </Row>
            <br />
            <Row>
              <Column>
                <Heading as="h2" className="font-sans font-bold">
                  Hello, {name}
                </Heading>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="font-sans">
                  Thank you for contacting Tropifresh! We have received your
                  message and are reviewing it carefully.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="font-sans text-pretty">
                  At Tropifresh, we are proud to offer a selection of the finest
                  premium Colombian fruits to our customers around the world. We
                  strive to provide exceptional service and are excited to
                  assist with your request.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="font-sans text-pretty">
                  Our team will be in touch with you within the next days to
                  discuss the next steps and address your needs.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="font-sans text-pretty">
                  If you have any additional questions, please don't hesitate to
                  reach out.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="font-sans">
                  Thank you for choosing Tropifresh!
                  <span className="block font-medium">Natasha</span>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
};

export default ClientContact;
