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
  getCategoryById,
  updateCategory,
} from "../../../services/categoryService";
import { toast } from "react-toastify";

export default function EditCategory({ categoryId }) {
  const [category, setCategory] = useState({
    name: "",
  });

  useEffect(() => {
    getCategoryById(categoryId).then(({ name }) => {
      setCategory({
        name,
      });
    });
  }, []);
  const handleUpdateCategory = async () => {
    try {
      await updateCategory(categoryId, category.name);

      toast.success("Categoria atualizada com sucesso", {
        autoClose: 2000,
      });
      Router.push("/categories");
    } catch (err) {
      // console.log(ingredient.name);
      if (!category.name) {
        toast.error("Nome do ingrediente obrigatório!", {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Box>
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
              Editar Categoria
            </Heading>
            <Link href="/categories" passHref>
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
                value={category.name}
                name="category"
                type="text"
                label="Nome"
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/categories" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>
              <Button
                bg="#6FBE5E"
                color="#ffffff"
                onClick={handleUpdateCategory}
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
      categoryId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
