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
import {
  getFeedbackById,
  updateFeedback,
} from "../../../services/feedbackService";
import { toast } from "react-toastify";

export default function EditUser({ feedbackId }) {
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
    console.log("userId", userId);
    try {
      await updateFeedback(feedbackId, contents, userId, productId);

      toast.success("Comentário atualizado com sucesso", {
        autoClose: 2000,
      });
    } catch (err) {
      if (!contents) {
        toast.error("Comentário obrigatório!", {
          autoClose: 2000,
        });
      }
      if (!productId) {
        toast.error("ID do PRODUTO obrigatório!", {
          autoClose: 2000,
        });
      }
      if (!userId) {
        toast.error("ID do USER obrigatória!", {
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
          <Heading size="lg" fontWeight="700">
            Editar Feedback
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="248px" spacing={["6", "8"]} w="100%">
              <Input
                value={productId}
                name="product"
                type="number"
                label="Produto ID"
                onChange={(e) => setProductId(e.target.value)}
              />
              <Input
                value={userId}
                name="user"
                type="number"
                label="User ID"
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
              <Link href="/feedbacks">
                <Button
                  bg="#6FBE5E"
                  color="#ffffff"
                  onClick={handleUpdateFeedback}
                >
                  Salvar
                </Button>
              </Link>
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
