import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import parseJWT from "../../../utils/parseJWT";
import { useEffect, useState, useContext } from "react";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiPencilLine,
  RiFileList2Line,
} from "react-icons/ri";

import Link from "next/link";
import axios from "../../../config/axios";
import SideBar from "../../../components/SideBar/SideBarProvider";
import { AuthContext } from "../../../context/AuthContext";
import { getUserById, deleteUser } from "../../../services/userService";
import { getBrandById } from "../../../services/brandService";
import { deleteProduct } from "../../../services/productService";
import { toast } from "react-toastify";
export default function Provider({ userId }) {
  const [user, setUser] = useState(userId);
  const [brand, setBrand] = useState({ name: "", id: "" });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(brand.id);
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        await getUserById(userId).then(async ({ brand }) => {
          setBrand(brand);
          await getBrandById(brand.id).then(({ product }) => {
            setProducts(product);
          });
        });
      } catch (error) {
        setError("deu erro");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  //breakpoint de responsividade
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await getBrandById(brand.id).then(({ product }) => {
        setProducts(product);
      });
      toast.success("Produto deletado com sucesso!", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err.response.data.message);
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
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Produtos
            </Heading>
            <Link href="/provider/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                bg="#6FBE5E"
                colorScheme="#FFFFFF"
                cursor="pointer"
                _hover={{ bg: "green.400" }}
                leftIcon={<Icon as={RiAddLine} />}
              >
                Adicionar
              </Button>
            </Link>
          </Flex>
          <Divider my="6" borderColor="gray.700" />
          <Table>
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray" width="32px"></Th>
                <Th>Produto</Th>
                {isWideVersion && <Th>Descrição</Th>}
                <Th>ID</Th>
                <Th width="1px"></Th>
                <Th width="1px"></Th>
                <Th width="1px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td px={["4", "4", "6"]}></Td>
                  <Td>
                    <Box>
                      <Text fontSize="sm">{product.name}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>{product.description}</Td>}
                  <Td>{product.id}</Td>

                  <Td>
                    <Link href={`/provider/edit/${product.id}`}>
                      <Button
                        as="a"
                        left="10px"
                        size="sm"
                        fontSize="sm"
                        bg="#6FBE5E"
                        colorScheme="#FFFFFF"
                        cursor="pointer"
                        _hover={{ bg: "green.400" }}
                        leftIcon={<Icon as={RiPencilLine} />}
                      >
                        Editar
                      </Button>
                    </Link>
                  </Td>

                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      bg="#6FBE5E"
                      colorScheme="#FFFFFF"
                      cursor="pointer"
                      _hover={{ bg: "green.400" }}
                      onClick={() => handleDelete(product.id)}
                      leftIcon={<Icon as={RiDeleteBinLine} />}
                    >
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
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
  return {
    props: {
      userId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
