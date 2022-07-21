import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Divider,
  Button,
  Icon,
} from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/index";
import { getProductById } from "../../../services/productService";
import Link from "next/link";
import axios from "../../../config/axios";

export default function ProductDetails({ productId }) {
  const [productDetails, setProductDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      getProductById(productId).then((data) => {
        setProductDetails(data);
      });
    } catch (error) {
      setError("deu erro");
    } finally {
      setLoading(false);
    }
  }, []);

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
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuário e Marca relacionadas ao Produto
            </Heading>
            <Link href="/products" passHref>
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
          <Table>
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray" width="32px"></Th>
                <Th>User</Th>
                <Th>ID</Th>
                <Th>Marcas</Th>
                <Th>ID</Th>
                <Th width="1px"></Th>
                <Th width="1px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}></Td>
                <Td>
                  <Box>
                    <Text fontSize="sm">{productDetails?.user.email}</Text>
                  </Box>
                </Td>

                <Td>{productDetails?.user.id}</Td>
                <Td>
                  <Box>
                    <Text fontSize="sm">{productDetails?.brand.name}</Text>
                  </Box>
                </Td>
                <Td>{productDetails?.brand.id}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
//método executado no lado do servidor, quando o user acessar a página;
//nesse caso o next faz um get na minha api antes de rendezirar a pagina, ou seja
//antes de aparecer qualquer tipo de interface
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
  // const response = await axios.get(`/brands/${context.query.id}`);
  // const response = }getBrandById();
  // console.log("response", response);

  return {
    props: {
      productId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
