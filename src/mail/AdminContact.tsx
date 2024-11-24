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

type Props = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
}

const AdminContact = (props:Props) => {
  const { name, lastname, email, phone, company, country, message } = props;
  
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Nuevo mensaje de contacto | Tropifresh</title>
      </Head>
      <Tailwind>
        <Container>
          <Preview>Nuevo mensaje de contacto | Tropifresh</Preview>
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
                  Hola, se ha recibido un nuevo mensaje de contacto.
                </Heading>
              </Column>
            </Row>
            <Row className="bg-neutral-100 p-4 box-border rounded">
              <Column>
                <ul>
                <li>
                    <Text className="font-sans font-bold">Nombre:</Text>
                    <Text className="font-sans font-bold">{name}</Text>
                  </li>
                  
                  <li>
                    <Text className="font-sans font-bold">Apellido:</Text>
                    <Text className="font-sans font-bold">{lastname}</Text>
                  </li>
                  
                  <li>
                    <Text className="font-sans font-bold">Correo Electrónico:</Text>
                    <Text className="font-sans font-bold">{email}</Text>
                  </li>

                  <li>
                    <Text className="font-sans font-bold">Numero de teléfono:</Text>
                    <Text className="font-sans font-bold">{phone}</Text>
                  </li>

                  <li>
                    <Text className="font-sans font-bold">Empresa:</Text>
                    <Text className="font-sans font-bold">{company}</Text>
                  </li>
                  <li>
                    <Text className="font-sans font-bold">Mensaje:</Text> {message}
                    <Text className="font-sans font-bold">{message}</Text>
                  </li>
                </ul>
              </Column>
            </Row>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
};

export default AdminContact;
