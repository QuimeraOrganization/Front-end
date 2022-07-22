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
  FormLabel,
  Divider,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { RiEyeLine, RiEyeOffFill } from "react-icons/ri";
import { createUser } from "../../services/userService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import Router from "next/router";
import Link from "next/link";
import {
  createIngredient,
  getAllIngredients,
} from "../../services/ingredientService";

const chakraStyles = {
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#6FBE5E",
    color: "#fff",
  }),

  control: (provided, state) => ({
    ...provided,
    height: "44.74",
    borderRadius: "10px",
    _hover: {
      border: "1.5px solid #6FBE5E",
    },
    _focusVisible: {
      border: "2px solid #6FBE5E",
    },
  }),

  crossIcon: (provided, state) => ({
    ...provided,
    color: "red"
  }),

  downChevron: (provided, state) => ({
    ...provided,
    color: "#6FBE5E"
  }),

  container: (provided, state) => ({
    ...provided,

    border: "0px solid #6FBE5E",
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

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [isIngredientsError, setIngredientsError] = useState(false);

  useEffect(() => {
    (async () => {
      const ingredientsResponse = await getAllIngredients();
      setIngredientsOptions(
        ingredientsResponse.map((ingredient) => {
          return {
            label: ingredient.name,
            value: ingredient.id,
          };
        })
      );
    })();
  }, []);

  async function handleCreateIngredient(ingredientName) {
    const ingredientResponse = await createIngredient(ingredientName);
    const nweIngredientOption = {
      label: ingredientResponse.name,
      value: ingredientResponse.id,
    };

    setIngredientsOptions((prevState) => {
      return [...prevState, nweIngredientOption];
    });
  }

  async function handleSelectIngredients(ingredients) {
    const ingredientsId = await ingredients.map((ingredient) => {
      return ingredient.value;
    });
    setIngredients(ingredientsId);
  }

  const handleSubmit = async () => {
    try {
      if (confirmPassowrd === password) {
        await createUser(email, password, ingredients);
        toast.success("Usuário cadastrado com sucesso!", {
          autoClose: 2000,
        });
        Router.push("/login");
      } else {
        toast.error("Verifique sua senha e tente novamente!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
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
      if (password.length > 16) {
        toast.error("Password deve ter no máximo 16 caracteres!", {
          autoClose: 2000,
        });
      }
    }

    setEmail("");
    setPassword("");
    setConfirmPassowrd("");
  };
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
      <Flex mr="100px" ml="180px" w="30vw" display={{ md: "flex" }}>
        <Box w={{ base: "full", md: "full", lg: "full" }} h="">
          <Center my="px">
            <Text
              textShadow="2px 2px #6FBE5E"
              m="6"
              mr="60px"
              ml="60px"
              fontFamily="Nunito Sans"
              fontStyle="normal"
              fontWeight="700"
              fontSize={{ base: "50px", md: "70px", lg: "85px" }}
              lineHeight={{ base: "50px", md: "80px", lg: "95px" }}
              color="#253C1F"
            >
              Venha fazer{<br />} parte desta{" "}
              <>
                {<br />}{" "}
                <Text as="span" color="#6FBE5E">
                  comunidade
                </Text>
                <br />
              </>{" "}
              você também!
            </Text>
          </Center>
        </Box>
      </Flex>

      <Flex mr="130px" ml="90px" display={{ md: "flex" }} bg="#F9F9F9">
        <Box w={{ base: "full", md: "full", lg: "full" }} h="">
          <Box>
            <Stack spacing={8}>
              <Image
                mt={3.5}
                mr="100px"
                ml="100px"
                src="Logo.svg"
                alt="Logotipo da empresa"
                onClick={() => Router.push("/login")}
                cursor="pointer"
              />

              <Box>
                <Center>
                  <Heading
                    mr="60px"
                    ml="60px"
                    fontFamily="Nunito Sans"
                    fontStyle="Bold"
                    fontSize={{ base: "25px", md: "40px", lg: "45px" }}
                    lineHeight="35px"
                    aling="Center"
                    color="#253C1F"
                  >
                    Cadastre-se
                  </Heading>
                </Center>
              </Box>

              <FormControl as="form">
                <InputGroup mb={5}>
                  <Input
                    w="343px"
                    h="44.74"
                    ml="60px"
                    mr="60px"
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
                    ml="60px"
                    mr="60px"
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
                    ml="60px"
                    mr="60px"
                    fontSize={{ base: "11px", md: "17px", lg: "17px" }}
                    value={confirmPassowrd}
                    borderRadius={10}
                    borderColor="#6FBE5E"
                    focusBorderColor="#6FBE5E"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassowrd(e.target.value)}
                    placeholder="Confirme a senha"
                  />
                  <InputRightElement mr="53px" width="4.5rem">
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
                <Flex mr="60px" ml="60px">
                  <FormControl
                    w="343px"
                    h="44.74"
                    mt="20px"
                    // isRequired
                    isInvalid={isIngredientsError}
                  >
                    <FormLabel>Ingrediente(s) Alérgicos</FormLabel>
                    <Select
                      isMulti
                      instanceId="ingredientsAllergic"
                      id="ingredientsAllergic"
                      placeholder="Selecione um ingrediente"
                      focusBorderColor="green"
                      useBasicStyles
                      size="sm"
                      chakraStyles={chakraStyles}
                      onChange={(e) => handleSelectIngredients(e)}
                      options={ingredientsOptions}
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue ? (
                          "Sem resultados"
                        ) : (
                          <VStack>
                            <Text>Ingrediente não cadastrado</Text>
                            <Button
                              backgroundColor="#253C1F"
                              color="#fff"
                              _hover={{ backgroundColor: "#6FBE5E" }}
                              onClick={() => handleCreateIngredient(inputValue)}
                            >
                              Cadastrar ingrediente
                            </Button>
                          </VStack>
                        )
                      }
                    />
                    {isIngredientsError && (
                      <FormErrorMessage>Campo obrigatório</FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>
              </FormControl>

              <FormControl>
                <Flex mr="60px" ml="60px" my="6">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
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
                </Flex>
                <Divider
                  ml="60px"
                  mr="80px"
                  display={{ md: "flex" }}
                  w=""
                  my="5"
                  borderColor="#6FBE5E"
                />
                <Link href="/providerRegister">
                  <Text
                    my="5"
                    ml="60px"
                    mr="60px"
                    color="#6FBE5E"
                    fontWeight="700"
                    lineHeight="10"
                    fontSize={{ base: "20", md: "25", lg: "25" }}
                    cursor="pointer"
                  >
                    Cadastre-se como Fornecedor
                  </Text>
                </Link>
              </FormControl>
            </Stack>
          </Box>
        </Box>
      </Flex>
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
        destination: "/produtos?page=1",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
