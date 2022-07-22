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
  Spacer,
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffFill } from "react-icons/ri";
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
      width="full"
      height="full"
      minHeight="calc(100vh - 173px)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex mr="90px" ml="120px" display={{ md: "flex" }} my="10">
        <Box
          w={{ base: "full", md: "full", lg: "full" }}
          mt="20px"
          bg="#F9F9F9"
        >
          <Box>
            <Stack spacing={67}>
              <Image
                alignItems="center"
                mr="60px"
                ml="60px"
                src="Logo.svg"
                alt="Logotipo da empresa"
              />

              <Box
                w={{ base: "full", md: "full", lg: "full" }}
                alignItems="center"
              >
                <Center>
                  <Heading
                    mr="50px"
                    ml="50px"
                    fontFamily="Nunito Sans"
                    fontStyle="Bold"
                    fontSize={{ base: "30px", md: "60px", lg: "62px" }}
                    lineHeight="20px"
                    aling="Center"
                    color="#253C1F"
                  >
                    Login
                  </Heading>
                </Center>
              </Box>

              <FormControl as="form" onSubmit={handleSubmit}>
                <InputGroup>
                  <Input
                    id="email"
                    w="343px"
                    h="44.74"
                    mr="60px"
                    ml="60px"
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
                    id="password"
                    w="343px"
                    h="44.74"
                    mr="60px"
                    ml="60px"
                    borderRadius={10}
                    borderColor="#6FBE5E"
                    focusBorderColor="#6FBE5E"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                  />

                  <InputRightElement mr="45px" width="4.5rem">
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
                          <Icon as={RiEyeOffFill} />
                        )
                      }
                    >
                      {/* {showPassword ? "Esconder" : "Mostrar"} */}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormControl>
                  <Flex mr="60px" ml="60px">
                    <Button
                      type="submit"
                      w="343px"
                      h="44.74"
                      mt="40px"
                      borderRadius={10}
                      variant="solid"
                      colorScheme="teal"
                      backgroundColor="#253C1F"
                      _hover={{ bg: "#1C4532" }}
                    >
                      Entrar
                    </Button>
                  </Flex>
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
            <Flex mr="60px" ml="60px">
              <Box w="343px" h="44.74" mt={4}>
                Não tem uma conta ainda?{" "}
                <Link color="#6FBE5E" href="/userRegister">
                  Cadastre-se
                </Link>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <Flex mr="120px" ml="120px" display={{ md: "flex" }}>
        <Box w={{ base: "full", md: "full", lg: "full" }}>
          <Center my="px">
            <Container>
              <Text
                textShadow="2px 2px #6FBE5E"
                m="6"
                mt="5px"
                mr="60px"
                ml="60px"
                fontFamily="Nunito Sans"
                fontStyle="Bold"
                fontWeight="700"
                fontSize={{ base: "35px", md: "55px", lg: "75px" }}
                lineHeight={{ base: "35px", md: "65px", lg: "80px" }}
                color="#253C1F"
              >
                Saiba quais{" "}
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
