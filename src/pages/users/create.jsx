import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { createUser } from "../../services/userService";
import Router from "next/router";
import Link from "next/link";
import SideBar from "../../components/SideBar/index";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import {
  FormControl,
  Text,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { useState, useEffect } from "react";

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
    color: "red",
  }),

  downChevron: (provided, state) => ({
    ...provided,
    color: "#6FBE5E",
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

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [error, setError] = useState(false);
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
        await createUser(email, password, ingredients, permission);
        toast.success("Usuário cadastrado com sucesso!", {
          autoClose: 2000,
        });
        Router.push("/users");
      } else {
        toast.error("Verifique sua senha e tente novamente!", {
          autoClose: 2000,
        });
        setError(true);
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
    setError(false);
    setEmail("");
    setPassword("");
  };
  return (
    <Box minHeight="calc(100vh - 90px - 183px)">
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          width="1010px"
          //  height="700px"
          marginLeft="50px"
          flex="1"
          borderRadius={8}
          bg="#F2F1F1"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="700">
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="email"
                type="email"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="permission"
                type="permission"
                label="Permission"
                onChange={(e) => setPermission(e.target.value)}
              />

              <FormControl
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
            </SimpleGrid>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                name="passoword_confirmation"
                type="password"
                label="Confirmação da senha"
                // focusBorderColor={error ? "red" : "#6FBE5E"}
                borderColor={error ? "red" : "#6FBE5E"}
                onChange={(e) => setConfirmPassowrd(e.target.value)}
              />
            </SimpleGrid>

            {error ? <p>Verifique a senha!</p> : ""}
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                onClick={handleSubmit}
                bg="#6FBE5E"
                _hover={{ bg: "green.400" }}
                color="#ffffff"
              >
                Cadastrar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];

  if (!token) {
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
