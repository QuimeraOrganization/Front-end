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
} from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Input } from "../../../components/Form/Input";
import SideBar from "../../../components/SideBar";
import Router from "next/router";
import {
  getIngredientById,
  updateIngredient,
} from "../../../services/ingredientService";
import { toast } from "react-toastify";

export default function EditIngredient({ ingredientId }) {
  const [ingredient, setIngredient] = useState({
    name: "",
  });

  useEffect(() => {
    getIngredientById(ingredientId).then(({ name }) => {
      setIngredient({
        name,
      });
    });
  }, []);

  const handleUpdateIngredient = async () => {
    try {
      await updateIngredient(ingredientId, ingredient.name);

      toast.success("Ingrediente atualizado com sucesso", {
        autoClose: 2000,
      });
      Router.push("/ingredients");
    } catch (err) {
      // console.log(ingredient.name);
      if (!ingredient.name) {
        toast.error("Nome do ingrediente obrigatório!", {
          autoClose: 2000,
        });
      }
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
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
              Editar Ingrediente
            </Heading>
            <Link href="/ingredients" passHref>
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
                value={ingredient.name}
                name="ingredient"
                type="text"
                label="Nome"
                onChange={(e) =>
                  setIngredient({ ...ingredient, name: e.target.value })
                }
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/ingredients" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>
              <Button
                bg="#6FBE5E"
                color="#ffffff"
                onClick={handleUpdateIngredient}
              >
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
  console.log(context.query.id);
  return {
    props: {
      ingredientId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
