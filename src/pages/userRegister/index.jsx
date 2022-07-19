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
      width="100wh"
      height="full"
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
              <Divider
                w="343px"
                h="44.74"
                ml="188px"
                mr="188px"
                my="6"
                borderColor="gray.500"
              />
              <Link href="/providerRegister">
                <Text
                  width="100%"
                  my="10"
                  ml="180px"
                  color="#6FBE5E"
                  fontWeight="700"
                  lineHeight="10"
                  fontSize="25px"
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
