import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Image,
  FormControl,
  InputRightElement,
  Text,
  Center,
  Container,
  Icon,
  Divider,
  FormLabel,
  VStack,
  FormErrorMessage
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import FilePicker from "chakra-ui-file-picker";
import { RiEyeLine, RiEyeOffFill } from "react-icons/ri";
import { createProvider, createUser } from "../../services/userService";
import { createBrand, getAllBrands } from "../../services/brandService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import Router from "next/router";
const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [brand, setBrand] = useState({ brandId: "" });
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [isBrandError, setBrandError] = useState(false);
  const [confirmPassowrd, setConfirmPassowrd] = useState("");

  useEffect(() => {
    (async () => {
      const brandsResponse = await getAllBrands();
      setBrandsOptions(
        brandsResponse.map((brand) => {
          return {
            label: brand.name,
            value: brand.id,
          };
        })
      );
    })();
  }, []);

  const chakraStyles = {
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "#6FBE5E",
      color: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#253C1F",
      backgroundColor: "#fff",
      _active: {
        backgroundColor: "red",
      },
      _hover: {
        backgroundColor: "#6FBE5E",
      },
    }),
  };

  function handleSelectBrand(brand) {
    setBrand((prevState) => {
      return { ...prevState, brandId: brand.value };
    });
  }
  async function handleCreatebrand(brandName) {
    const brandResponse = await createBrand(brandName);
    const newBrandOption = {
      label: brandResponse.name,
      value: brandResponse.id,
    };

    setBrandsOptions((prevState) => {
      return [...prevState, newBrandOption];
    });
  }

  const handleSubmit = async () => {
    try {
      if (confirmPassowrd === password) {
        await createProvider(email, password, brand.brandId);
        toast.success("Usuário cadastrado com sucesso!", {
          autoClose: 2000,
        });
        setEmail("");
        setPassword("");
        setConfirmPassowrd("");
        Router.push("/login");
      } else {
        toast.error("Verifique sua senha e tente novamente!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      if (err) {
        toast.error(err.response.data.message, {
          autoClose: 2000,
        });
      }
      if (!email) {
        toast.error("Email obrigatório!", {
          autoClose: 2000,
        });
      }
      if (!password) {
        toast.error("Senha obrigatória!", {
          autoClose: 2000,
        });
      }
      if (password?.length > 16) {
        toast.error("Password deve ter no máximo 16 caracteres!", {
          autoClose: 2000,
        });
      }
    }
    console.log(brand.brandId);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column, row"
      display={{ md: "flex" }}
      width="100wh"
      height="full"
      minHeight="calc(100vh - 173px)"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="720px" h="1024px" bg="#FFFFFF">
        <Center mt={302} mr="160px" ml="155px">
          <Container>
            <Text
              fontFamily="Nunito Sans"
              fontStyle="normal"
              fontWeight="700"
              fontSize={{ base: "63px", md: "64px", lg: "66px" }}
              lineHeight="70px"
              color="#253C1F"
            >
              Venha fazer parte desta{" "}
              <>
                <Text as="span" color="#6FBE5E">
                  comunidade
                </Text>
                <br />
              </>{" "}
              você também!
            </Text>
          </Container>
        </Center>
      </Box>

      <Box w="720px" h="1024px" bg="#F9F9F9">
        <Box>
          <Stack spacing={45}>
            <Image
              mt={130}
              mr="239px"
              ml="239px"
              src="Logo.svg"
              alt="Logotipo da empresa"
              onClick={() => Router.push("/login")}
              cursor="pointer"
            />

            <Box>
              <Heading
                mr="224px"
                ml="225px"
                fontFamily="Nunito Sans"
                fontStyle="Bold"
                fontSize={{ base: "46px", md: "49px", lg: "50px" }}
                lineHeight="35px"
                aling="Center"
                color="#253C1F"
              >
                Cadastre-se
              </Heading>
            </Box>

            <FormControl as="form">
              <InputGroup mb={5}>
                <Input
                  w="343px"
                  h="44.74"
                  ml="188px"
                  mr="188px"
                  value={email}
                  borderRadius={10}
                  borderColor="#6FBE5E"
                  type="email"
                  focusBorderColor="#6FBE5E"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <Input
                  w="343px"
                  h="44.74"
                  ml="188px"
                  mr="188px"
                  value={password}
                  borderRadius={10}
                  borderColor="#6FBE5E"
                  focusBorderColor="#6FBE5E"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />
              </InputGroup>

              <InputGroup mt={5}>
                <Input
                  w="343px"
                  h="44.74"
                  ml="188px"
                  mr="188px"
                  value={confirmPassowrd}
                  borderRadius={10}
                  borderColor="#6FBE5E"
                  focusBorderColor="#6FBE5E"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassowrd(e.target.value)}
                  placeholder="Confirme a senha"
                />

                <InputRightElement mr="170px" width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    bg="none"
                    _hover={{ bg: "none" }}
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
              <FormControl
                w="343px"
                h="44.74"
                ml="188px"
                mr="188px"
                mt="20px"
                isRequired
                isInvalid={isBrandError}
              >
                <FormLabel htmlFor="brand">Marca</FormLabel>
                <Select
                  id="brand"
                  placeholder="Selecione uma marca"
                  useBasicStyles
                  size="sm"
                  chakraStyles={chakraStyles}
                  onChange={(e) => handleSelectBrand(e)}
                  options={brandsOptions}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? (
                      "Sem resultados"
                    ) : (
                      <VStack>
                        <Text>Marca não cadastrada</Text>
                        <Button
                          backgroundColor="#253C1F"
                          color="#fff"
                          _hover={{ backgroundColor: "#6FBE5E" }}
                          onClick={() => handleCreatebrand(inputValue)}
                        >
                          Cadastrar marca
                        </Button>
                      </VStack>
                    )
                  }
                />
                {isBrandError && (
                  <FormErrorMessage>Campo obrigatório</FormErrorMessage>
                )}
              </FormControl>
            </FormControl>

            <FormControl>
              <Button
                type="submit"
                onClick={handleSubmit}
                ml="188px"
                mr="188px"
                w="343px"
                h="44.74"
                borderRadius={10}
                variant="solid"
                _hover={{ bg: "green.400" }}
                colorScheme="teal"
                backgroundColor="#253C1F"
              >
                Cadastrar
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Cadastro;

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];

  if (token) {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
