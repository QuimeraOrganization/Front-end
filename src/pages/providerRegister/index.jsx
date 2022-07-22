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
        destination: "/inicio",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
