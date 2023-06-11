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
  useBreakpointValue,
  Spinner,
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

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [isIngredientsError, setIngredientsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const ingredientsResponse = await getAllIngredients();
      console.log(ingredientsResponse)
      setIngredientsOptions(
        ingredientsResponse?.map((ingredient) => {
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
      setIsLoading(true);
      if (confirmPassowrd === password) {
        await createUser(email, password, ingredients);
        toast.success("Usuário cadastrado com sucesso!", {
          autoClose: 2000,
        });
        Router.push("/login");
        setIsLoading(false);
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex  flexDirection={{ base: "column", md: "row" }} justifyContent="center" alignItems="center" >
      {isMobile ? "" :  <Flex  mr={{ base: "0", md: "100px" }} ml={{ base: "0", md: "180px" }} w={{ base: "full", md: "30vw" }}>
        <Box w="full" h="">
          <Center my="px">
            <Text textShadow="2px 2px #6FBE5E" m="6" mr={{ base: "0", md: "60px" }} ml={{ base: "0", md: "60px" }} fontFamily="Nunito Sans" fontStyle="normal" fontWeight="700" fontSize={{ base: "50px", md: "70px", lg: "85px" }} lineHeight={{ base: "50px", md: "80px", lg: "95px" }} color="#253C1F">
              Venha fazer<br /> parte desta{" "}
              <Text as="span" color="#6FBE5E">
                comunidade
              </Text>
              <br /> você também!
            </Text>
          </Center>
        </Box>
      </Flex>}
     

      <Flex mr={{ base: "0", md: "90px" }} ml={{ base: "0", md: "90px" }} mb={"6.3rem"} bg="#F9F9F9" >
        <Box w="full" h="">
          <Box>
            <Stack spacing={8}>
              <Image  onClick={() => Router.push("/login")} mt={3.5} mr={{ base: "0", md: "100px" }} ml={{ base: "0", md: "100px" }} src="Logo.svg" alt="Logotipo da empresa" cursor="pointer" />

              <Box>
                <Center>
                  <Heading mr={{ base: "0", md: "60px" }} ml={{ base: "0", md: "60px" }} fontFamily="Nunito Sans" fontStyle="Bold" fontSize={{ base: "25px", md: "40px", lg: "45px" }} lineHeight="35px" aling="Center" color="#253C1F">
                    Cadastre-se
                  </Heading>
                </Center>
              </Box>

              <FormControl as="form">
                <InputGroup mb={5}>
                  <Input  onChange={(e) => setEmail(e.target.value)} w="343px" h="44.74" ml={{ base: "0", md: "60px" }} mr={{ base: "0", md: "60px" }} borderRadius={10} borderColor="#6FBE5E" type="email" focusBorderColor="#6FBE5E" placeholder="E-mail" />
                </InputGroup>

                <InputGroup>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} w="343px" h="44.74" ml={{ base: "0", md: "60px" }} mr={{ base: "0", md: "60px" }} borderRadius={10} borderColor="#6FBE5E" focusBorderColor="#6FBE5E" placeholder="Senha" />
                </InputGroup>

                <InputGroup mt={5}>
                  <Input  type={showPassword ? "text" : "password"} onChange={(e) => setConfirmPassowrd(e.target.value)} w="343px" h="44.74" ml={{ base: "0", md: "60px" }} mr={{ base: "0", md: "60px" }}  borderRadius={10} borderColor="#6FBE5E" focusBorderColor="#6FBE5E"  placeholder="Confirme a senha" />
                 {isMobile ? "" :  <InputRightElement mr="53px" width="4.5rem" >
                    <Button h="1.75rem" size="sm" bg="none" _hover={{ bg: "none" }} onClick={handleShowClick}  leftIcon={
                        showPassword ? (
                          <Icon as={RiEyeLine} />
                        ) : (
                          <Icon as={RiEyeOffFill} />
                        )
                      }

></Button>
                  </InputRightElement>}
                </InputGroup>

                <Box mr={{ base: "0", md: "60px" }} ml={{ base: "0", md: "60px" }}>
                  <FormControl w="343px" h="44.74" mt="20px" isInvalid={isIngredientsError}>
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
                </Box>
              </FormControl>

              <FormControl >
                <Box mr={{ base: "0", md: "60px" }}  ml={{ base: "0", md: "60px" }} my="6">
                 
                  <Button 
                    w="343px" 
                    h="44.74" 
                    borderRadius={10} 
                    variant="solid" 
                    _hover={{ bg: "green.400" }} 
                    colorScheme="teal" 
                    backgroundColor="#253C1F"
                    onClick={handleSubmit}
                    >
                    {isLoading ? <Spinner color="white" /> : "Cadastrar"}
                  </Button>
                </Box>
                {isMobile ? <Box display={"flex"} color="#6FBE5E" alignItems={"center"} justifyContent={'center'} gap={"0.2rem"} >
                  Já possui uma conta? {" "}
                    <Link color="#6FBE5E" href="/login" >
                   Entrar
                    </Link>
                  </Box> : "" }
               
                <Divider ml={{ base: "0", md: "60px" }} mr={{ base: "0", md: "80px" }} my="5" borderColor="#6FBE5E" />
              
              </FormControl>
            
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

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
