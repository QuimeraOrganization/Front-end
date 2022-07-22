import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Icon,
  FormControl,
  FormLabel,
  Text,
  FormErrorMessage
} from "@chakra-ui/react";
import Link from "next/link";
import { Select } from "chakra-react-select";
import { RiArrowLeftLine } from "react-icons/ri";
import { parseCookies } from "nookies";
import { useEffect, useState, useRef } from "react";
import { Input } from "../../../components/Form/Input";
import SideBar from "../../../components/SideBar";
import { getUserById, updateUser } from "../../../services/userService";
import {
  createIngredient,
  getAllIngredients,
} from "../../../services/ingredientService";
import { toast } from "react-toastify";
import Router from "next/router";

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

export default function EditUser({ userId }) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("");
  const [password, setPassword] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [allergicIngredients, setAllergicIngredients] = useState();
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [isIngredientsError, setIngredientsError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const ingredientsRef = useRef();

  useEffect(() => {
    (async () => {
      await getUserById(userId).then(async (data) => {
        setEmail(data.email);
        setPermission(data.permission);

        const allergic = await data.IngredientsOnUsersAllergic.map(
          (ingredient) => {
            return {
              label: ingredient.ingredient.name,
              value: ingredient.ingredient.id,
            };
          }
        );
        setAllergicIngredients(allergic);
      });

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

  const handleUpdateUser = async () => {
    try {
      const ingredientsId = await ingredientsRef.current.state.selectValue.map(
        (ingredient) => {
          return ingredient.value;
        }
      );
      console.log(password);
      if (confirmPassword === password) {
        await updateUser(userId, email, password, ingredientsId, permission);
        toast.success("Usuário atualizado com sucesso", {
          autoClose: 2000,
        });
      }
      Router.push("/users");
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
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Editar Usuário
            </Heading>
            <Link href="/users" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                bg="#6FBE5E"
                colorScheme="#FFFFFF"
                cursor="pointer"
                _hover={{ bg: "green.400" }}
                leftIcon={<Icon as={RiArrowLeftLine} />}
              >
                Voltar
              </Button>
            </Link>
          </Flex>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                value={email}
                name="email"
                type="email"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                value={permission}
                name="permission"
                type="text"
                label="Permissão"
                onChange={(e) => setPermission(e.target.value)}
              />
              <FormControl isInvalid={isIngredientsError}>
                <FormLabel htmlFor="ingredientsAllergic">
                  Ingrediente(s)
                </FormLabel>
                {allergicIngredients && (
                  <Select
                    ref={ingredientsRef}
                    isMulti
                    defaultValue={allergicIngredients}
                    instanceId="ingredientsAllergic"
                    id="ingredientsAllergic"
                    placeholder="Selecione um ingrediente"
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
                )}
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
                //  borderColor={error ? "red" : "#6FBE5E"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>
              <Button bg="#6FBE5E" color="#ffffff" onClick={handleUpdateUser}>
                Salvar
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
  //se não existir o token, ele redireciona para a pag index.
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      userId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
