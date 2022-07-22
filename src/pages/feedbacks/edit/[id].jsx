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
import {
  getFeedbackById,
  updateFeedback,
} from "../../../services/feedbackService";
import { toast } from "react-toastify";
import Router from "next/router";

export default function EditFeedback({ feedbackId }) {
  const [contents, setContents] = useState({});
  const [productId, setProductId] = useState({});
  const [userId, setUserId] = useState({});

  useEffect(() => {
    getFeedbackById(feedbackId).then((data) => {
      setContents(data.contents);
      setProductId(data.product.id);
      setUserId(data.user.id);
    });
  }, []);

  const handleUpdateFeedback = async () => {
    try {
      if (contents) {
        await updateFeedback(feedbackId, contents, userId, productId);

        toast.success("Comentário atualizado com sucesso", {
          autoClose: 2000,
        });
        Router.push("/feedbacks");
      } else {
        toast.error("Comentário obrigatório!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      if (!contents) {
        toast.error("Comentário obrigatório!", {
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
              Editar Comentário
            </Heading>
            <Link href="/feedbacks" passHref>
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
                value={productId}
                name="product"
                type="number"
                label="Produto ID"
                disabled
                onChange={(e) => setProductId(e.target.value)}
              />
              <Input
                value={userId}
                name="user"
                type="number"
                label="User ID"
                disabled
                onChange={(e) => setUserId(e.target.value)}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                value={contents}
                name="content"
                type="text"
                label="Comentário"
                onChange={(e) => setContents(e.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/feedbacks" passHref>
                <Button as="a" bg="grey" color="#ffffff">
                  Cancelar
                </Button>
              </Link>

              <Button
                bg="#6FBE5E"
                color="#ffffff"
                onClick={handleUpdateFeedback}
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

  return {
    props: {
      feedbackId: context.query.id,
    }, // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}
