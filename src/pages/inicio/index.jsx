import {
  Flex,
  Heading,
  Box,
  Divider,
  Image,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import EquipeDesenvolvimento from "../../components/EquipeDesenvolvimento";
const Login = () => {
  return (
    <Flex
      flexDirection="column"
      width="full"
      height="full"
      minHeight="calc(100vh - 60px - 183px)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex mr="120px" ml="120px" my="8" display={{ md: "flex" }}>
        <Box w={{ base: "full", md: "full", lg: "full" }} ml="50px" mr="10px">
          <Center>
            <Text
              fontFamily="Nunito Sans"
              fontStyle="Bold"
              fontWeight="20"
              fontSize={{ base: "18px", md: "19px", lg: "20px" }}
              lineHeight="30px"
              justifyContent="center"
              color="#253C1F"
            >
              {" "}
              <>
                <Text as="span" color="#6FBE5E" fontSize="6xl" m="1">
                  S
                </Text>
              </>
              omos o time Quimera,
              aushuahshuhasuhauhsuahshaushauhsauhsauhhuauhsuahsuahsuahsuashas
              auhsuahushaushauhsuahusahsuahushauhsuahsuahsuahsuahsuhaushausha
              uashuahsuhaushuahhsuhasuhaushuahsuhauhsuahsuhaushuahsuhaushuahh
              uahsuhaushuahsuahushuahshuahshauhsuahushhauhsuhaushuahsuhaushua
              uashuahsuhaushuahsuahsuhaushuahsuahusahuahsuahsuhauhsuhasuahsua.{" "}
            </Text>
          </Center>
          <Center>
            <Text
              my="5"
              fontFamily="Nunito Sans"
              fontStyle="Bold"
              fontWeight="20"
              fontSize={{ base: "18px", md: "19px", lg: "20px" }}
              lineHeight="30px"
              justifyContent="center"
              color="#253C1F"
            >
              {" "}
              <>
                <Text as="span" color="#6FBE5E" fontSize="6xl" m="1">
                  E
                </Text>
              </>
              sse sistema é empenhado em suprir, as necessidade e carências de
              pessoas alérgicas, desenvolvendo informações sobre produtos
              alimentícios e suas composições, sempre focando na eficiência e
              qualidade dos serviços prestados, a fim de oferecer o melhor para
              este público com necessidades diferenciadas, sempre buscando a
              melhoria da qualidade de vida das pessoas.
            </Text>
          </Center>
        </Box>

        <Box w={{ base: "full", md: "full", lg: "full" }} ml="50px">
          <Image
            w="full"
            h="340px"
            src="e.jpg"
            alt="Logotipo da empresa"
            borderRadius="10"
            boxShadow="dark-lg"
          />
        </Box>
      </Flex>

      {/*<Divider
        display={{ md: "flex" }}
        w={{ base: "full", md: "full", lg: "full" }}
        my="7"
        borderColor="#6FBE5E"
      />*/}

      <Flex mr="200px" ml="200px" my="8" display={{ md: "flex" }}>
        <Box mr="px" w={{ base: "full", md: "full", lg: "full" }} mb="5">
          <Center>
            <Heading
              m=""
              fontFamily="Nunito Sans"
              fontStyle="Bold"
              fontSize={{ base: "30px", md: "32px", lg: "35px" }}
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
              ml="4"
              mr="4"
              fontFamily="Nunito Sans"
              fontStyle="normal"
              fontWeight="20"
              fontSize={{ base: "17px", md: "19px", lg: "20px" }}
              lineHeight="30px"
              color="#253C1F"
            >
              Proporcionar aos nossos clientes informações e uma vida livre de
              alergia.
            </Text>
          </Center>
        </Box>

        <Box mr="" w={{ base: "full", md: "full", lg: "full" }} mb="5">
          <Center>
            <Heading
              m=""
              fontFamily="Nunito Sans"
              fontStyle="Bold"
              fontSize={{ base: "30px", md: "32px", lg: "35px" }}
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
              fontSize={{ base: "17px", md: "19px", lg: "20px" }}
              lineHeight="30px"
              color="#253C1F"
            >
              Que o Sistema seja sinônimo de informações de confiança,
              preocupado com a saúde e futuro das pessoas.
            </Text>
          </Center>
        </Box>

        <Box w={{ base: "full", md: "full", lg: "full" }} h="" mb="10">
          <Center>
            <Heading
              m=""
              fontFamily="Nunito Sans"
              fontStyle="Bold"
              fontSize={{ base: "30px", md: "32px", lg: "35px" }}
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
              fontSize={{ base: "17px", md: "19px", lg: "20px" }}
              lineHeight="30px"
              color="#253C1F"
            >
              Embasamento Técnico e Científico, Ambiente acolhedor e de ajuda
              mútua, Inovação, Transparência, Valorização do ser humano,
              Preocupação com o futuro das pessoas.
            </Text>
          </Center>
        </Box>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Login;
