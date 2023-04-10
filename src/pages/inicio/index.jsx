import {
  Flex,
  Heading,
  Box,
  Divider,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  SimpleGrid
} from "@chakra-ui/react";
import EquipeDesenvolvimento from "../../components/EquipeDesenvolvimento";
const Login = () => {
  return (
    <Flex
    flexDirection="column"
    width="full"
    minHeight="100vh"
    justifyContent="center"
    alignItems="center"
  >
    <Flex
      mx={{ base: "4", md: "8", lg: "16" }}
      my={{ base: "8", md: "0" }}
      mb={{ base: "8", md: "0" }}
      flexDirection={{ base: "column-reverse", md: "row" }}
    >
      <Box
        w={{ base: "full", md: "full", lg: "full" }}
        ml={{ md: "3rem" }}
        mr={{ md: "10px" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Center>
          <Text
            fontFamily="Nunito Sans"
            fontWeight="bold"
            fontSize={{ base: "16px", md: "19px", lg: "20px" }}
            lineHeight={{ base: "20px", md: "30px" }}
            color="#253C1F"
          >
            {" "}
            <>
              <Text as="span" color="#6FBE5E" fontSize="6xl" m="1">
                S
              </Text>
            </>
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
          </Text>
        </Center>
        <Center>
          <Text
            my="5"
            fontFamily="Nunito Sans"
            fontWeight="bold"
            fontSize={{ base: "16px", md: "19px", lg: "20px" }}
            lineHeight={{ base: "20px", md: "30px" }}
            color="#253C1F"
          >
            {" "}
            <>
              <Text as="span" color="#6FBE5E" fontSize="6xl" m="1">
                E
              </Text>
            </>
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
            aushduahsudhaudhuashsduhasduhahsduahsduha
          </Text>
        </Center>
      </Box>

      <Stack
        spacing="8"
        px={{ base: "4", md: "8", lg: "16" }}
        mt={{ base: "8", md: "0" }}
        mb={{ base: "8", md: "0" }}
      >
        <Box>
          <Image
            w="full"
            h={{ base: "240px", md: "340px" }}
            src="e.jpg"
            alt="Logotipo da empresa"
            borderRadius="10"
            boxShadow="dark-lg"
          />
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="8">
          <Box>
            <Center>
              <Heading
                fontFamily="Nunito Sans"
                fontWeight="bold"
                fontSize={{ base: "24px", md: "32px", lg: "35px" }}
                lineHeight="50px"
                align="Center"
                justifyContent="center"
                color="#6FBE5E"
              >
                Missão
              </Heading>
            </Center>
            <Center>
              <Text
                ml={{ base: "0", md: "4" }}
                mr={{ base: "0", md: "4" }}
                fontFamily="Nunito Sans"
                fontSize={{ base: "16px", md: "19px", lg: "20px" }}
          lineHeight="30px"
          color="#253C1F"
        >
          Proporcionar aos nossos clientes informações e uma vida livre de alergia.
        </Text>
      </Center>
    </Box>
    <Box>
      <Center>
        <Heading
          m=""
          fontFamily="Nunito Sans"
          fontStyle="Bold"
          fontSize={{ base: "24px", md: "32px", lg: "35px" }}
          lineHeight="50px"
          align="Center"
          justifyContent="center"
          color="#6FBE5E"
        >
          Visão
        </Heading>
      </Center>
      <Center>
        <Text
          ml="4"
          mr="4"
          fontFamily="Nunito Sans"
          fontStyle="normal"
          fontWeight="20"
          fontSize={{ base: "16px", md: "19px", lg: "20px" }}
          lineHeight="30px"
          color="#253C1F"
        >
          Que o Sistema seja sinônimo de informações de confiança, preocupado com a saúde e futuro das pessoas.
        </Text>
      </Center>
    </Box>
    <Box>
      <Center>
        <Heading
          m=""
          fontFamily="Nunito Sans"
          fontStyle="Bold"
          fontSize={{ base: "24px", md: "32px", lg: "35px" }}
          lineHeight="50px"
          align="Center"
          justifyContent="center"
          color="#6FBE5E"
        >
          Valores
        </Heading>
      </Center>
      <Center>
        <Text
          ml="4"
          mr="4"
          fontFamily="Nunito Sans"
          fontStyle="normal"
          fontWeight="20"
          fontSize={{ base: "16px", md: "19px", lg: "20px" }}
          lineHeight="30px"
          color="#253C1F"
        >
          Embasamento Técnico e Científico, Ambiente acolhedor e de ajuda mútua, Inovação, Transparência, Valorização do ser humano, Preocupação com o futuro das pessoas.
        </Text>
      </Center>
    </Box>
  </SimpleGrid>
</Stack>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Login;
