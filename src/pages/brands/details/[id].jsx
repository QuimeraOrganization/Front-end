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
import { RiArrowLeftLine, RiFileList2Line } from "react-icons/ri";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/index";
import { getBrandById } from "../../../services/brandService";
import Link from "next/link";
export default function UserList({ brandId }) {
  const [brands, setBrands] = useState({});

  useEffect(() => {
    getBrandById(brandId).then((data) => {
      setBrands(data);
    });
  }, []);

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
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Produtos relacionados a Marca
            </Heading>
            <Link href="/brands" passHref>
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
                <Th>Produtos</Th>
                {/* {isWideVersion && <Th>Produto</Th>} */}
                <Th>ID</Th>
                <Th width="1px"></Th>
                <Th width="1px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {!!Object.keys(brands).length ? (
                brands.product.map((product) => {
                  return (
                    <Tr key={product.id}>
                      <Td px={["4", "4", "6"]}></Td>
                      <Td>
                        <Box>
                          <Text fontSize="sm">{product.name}</Text>
                        </Box>
                      </Td>

                      <Td>{product.id}</Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td></Td>
                </Tr>
              )}
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
      brandId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
