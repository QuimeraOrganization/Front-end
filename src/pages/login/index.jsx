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
  useBreakpointValue
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffFill } from "react-icons/ri";
import { parseCookies } from "nookies";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useRouter } from "next/router";
const SignIn = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
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
     mr={{base: "20px", md: "90px"}} 
     ml={{base: "20px", md: "120px"}} 
     display={{md: "flex"}} 
     justifyContent="center"
     alignItems="center"
     minHeight="calc(100vh - 251px)"
     my="10"
     >
    <Box w="full" bg="#F9F9F9">
      <Box>
        <Stack  display={"flex"} flexDir={isMobile ? "column" : "row"}  alignItems={ isMobile ? "center" : ""} justifyContent="space-between" >
          <Image 
          width={ isMobile ? '60%' : '30%'} 
          // mr={{base: "20px", md: "60px"}} 
          ml={{base: "20px", md: "60px"}} 
          src="Logo.svg" 
          alt="Logotipo" 
          />
        
          <Box width={isMobile ? "100%" :"50%"}>
              <Box w="full" display="flex" alignItems="start" justifyContent={"flex-start"}>
                <Center>
                  <Heading 
                  // mr={{base: "20px", md: "50px"}} 
                  ml={{base: "20px", md: "61px"}} 
                  mb={"1rem"} 
                  mt={"5rem"} 
                  fontFamily="Nunito Sans" 
                  fontStyle="Bold" 
                  fontSize={{base: "30px", md: "30px", lg: "30px"}} 
                  lineHeight="20px" color="#253C1F"
                  >
                    Seja bem-vindo
                  </Heading>
                </Center>
              </Box>
              <FormControl as="form" onSubmit={handleSubmit}>
                <InputGroup>
                  <Input 
                  id="email" 
                  w={{base: "full", md: "100%"}} 
                  h="44.74" 
                  mr={{base: "20px", md: "60px"}} 
                  ml={{base: "20px", md: "60px"}}
                  mt={"1.5rem"}
                  mb="25px" 
                  sborderRadius={6} 
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
                  w={{base: "full", md: "100%"}} 
                  h="44.74" 
                  mr={{base: "20px", md: "61px"}} 
                  ml={{base: "20px", md: "61px"}} 
                  borderRadius={6} 
                  borderColor="#6FBE5E" 
                  focusBorderColor="#6FBE5E" 
                  onChange={(e) => setPassword(e.target.value)} 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Senha" 
                  />
                  <InputRightElement mr={{base: "20px", md: "45px"}} width="4.5rem">
                    <Button 
                    h="1.75rem" 
                    size="sm" 
                    bg="none" 
                    _hover={{ bg: "none" }} 
                    onClick={handleShowClick} 
                    leftIcon={showPassword ? <Icon as={RiEyeLine} /> : <Icon as={RiEyeOffFill} />}>
                      {/* {showPassword ? "Esconder" : "Mostrar"} */}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormControl>
                  <Flex mr={{base: "20px", md: "60px"}} ml={{base: "20px", md: "60px"}}>
                    <Button type="submit" w={{base: "full", md: "100%"}} h="44.74" mt="2.5rem" borderRadius={10} variant="solid" colorScheme="teal" backgroundColor="#253C1F" _hover={{ bg: "#1C4532" }}>
                      Entrar
                    </Button>
                  </Flex>
                </FormControl>
              </FormControl>
              <Flex mr={{base: "20px", md: "60px"}} ml={{base: "20px", md: "60px"}}>
                <Box w={{base: "full", md: "343px"}} h="44.74" mt={4}>
                  Não tem uma conta ainda?{" "}
                    <Link color="#6FBE5E" href="/userRegister">
                      Cadastre-se
                    </Link>
                  </Box>
                </Flex>
          </Box>
          </Stack>
          </Box>
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
