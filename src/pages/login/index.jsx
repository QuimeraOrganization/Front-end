import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Image,
  FormControl,
  InputRightElement,
  Text,
  Center,
  Container,
  Icon,
} from "@chakra-ui/react";
import { RiEyeCloseLine, RiEyeLine, RiEyeCloseFill } from "react-icons/ri";
import { parseCookies } from "nookies";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useRouter } from "next/router";
const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { singIn } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await singIn(data);
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column, row"
      display={{ md: "flex" }}
      width="100wh"
      height="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="720px" h="1024px" bg="#F9F9F9">
        <Box>
          <Stack spacing={67}>
            <Image
              mt={130}
              mr="239px"
              ml="239px"
              src="Logo.svg"
              alt="Logotipo da empresa"
            />

            <Box>
              <Heading
                mr="285px"
                ml="284px"
                fontFamily="Nunito Sans"
                fontStyle="Bold"
                fontSize={{ base: "46px", md: "48px", lg: "50px" }}
                lineHeight="20px"
                aling="Center"
                color="#253C1F"
              >
                Login
              </Heading>
            </Box>

            <FormControl as="form" onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  w="343px"
                  h="44.74"
                  ml="188px"
                  mb="25px"
                  borderRadius={10}
                  borderColor="#6FBE5E"
                  type="email"
                  focusBorderColor="#6FBE5E"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                />
              </InputGroup>
              <InputGroup>
                <Input
                  w="343px"
                  h="44.74"
                  ml="188px"
                  borderRadius={10}
                  borderColor="#6FBE5E"
                  focusBorderColor="#6FBE5E"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />

                <InputRightElement mr="170px" width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    bg="none"
                    _hover={{ bg: "none" }}
                    onClick={handleShowClick}
                    leftIcon={
                      showPassword ? (
                        <Icon as={RiEyeLine} />
                      ) : (
                        <Icon as={RiEyeCloseLine} />
                      )
                    }
                  >
                    {/* {showPassword ? "Esconder" : "Mostrar"} */}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormControl>
                <Button
                  type="submit"
                  ml="188px"
                  w="343px"
                  h="44.74"
                  mt="40px"
                  borderRadius={10}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  backgroundColor="#253C1F"
                  _hover={{ bg: "#1C4532" }}
                >
                  Entrar
                </Button>
              </FormControl>
            </FormControl>

            {/*<FormHelperText 
                mt={2}
                ml="180px" 
                textAlign="center">
                <Link>Esqueci minha senha</Link>
              </FormHelperText>
              */}
          </Stack>

          <Box w="343px" h="44.74" ml="210px" mt={4}>
            Não tem uma conta ainda?{" "}
            <Link color="#6FBE5E" href="/userRegister">
              Cadastre-se
            </Link>
          </Box>
        </Box>
      </Box>

      <Box w="720px" h="1024px" bg="#FFFFFF">
        <Center mt={302} mr="160px" ml="155px">
          <Container>
            <Text
              fontFamily="Nunito Sans"
              fontStyle="normal"
              fontWeight="700"
              fontSize={{ base: "62px", md: "63px", lg: "65px" }}
              lineHeight="70px"
              color="#253C1F"
            >
              Saiba quias{" "}
              <>
                <Text as="span" color="#6FBE5E">
                  ingredientes
                </Text>
                <br />
              </>
              tem em cada alimento e consuma com{" "}
              <>
                <Text as="span" color="#6FBE5E">
                  segurança
                </Text>
              </>
              .
            </Text>
          </Container>
        </Center>
      </Box>
    </Flex>
  );
};

export default SignIn;

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];

  if (token) {
    return {
      redirect: {
        destination: "/produtos?page=1",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
