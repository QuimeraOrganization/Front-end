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
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Input } from "../../../components/Form/Input";
import SideBar from "../../../components/SideBar";
import Router from "next/router";
import { getBrandById, updateBrand } from "../../../services/brandService";
import { toast } from "react-toastify";

export default function EditBrand({ brandId }) {
  const [brand, setBrand] = useState({
    name: "",
  });

  useEffect(() => {
    getBrandById(brandId).then(({ name }) => {
      setBrand({
        name,
      });
    });
  }, []);

  const handleUpdateBrand = async () => {
    try {
      if (brand.name) {
        await updateBrand(brandId, brand.name);

        toast.success("Marca atualizada com sucesso", {
          autoClose: 2000,
        });
        Router.push("/brands");
      } else {
        toast.error("Nome da marca obrigatória!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      if (!brand.name) {
        toast.error("Nome da marca obrigatória!", {
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
          <Heading size="lg" fontWeight="700">
            Editar Marca
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                value={brand.name}
                name="brand"
                type="text"
                label="Nome"
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/brands" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>
              <Button bg="#6FBE5E" color="#ffffff" onClick={handleUpdateBrand}>
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
      brandId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
