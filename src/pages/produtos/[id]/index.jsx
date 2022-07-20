import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  VStack,
  HStack,
  Button,
  Text,
  Image,
  Heading,
  Input,
  InputRightAddon,
  InputGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

import { getProductById } from "../../../services/productService";
import { createFeedback } from "../../../services/feedbackService";
import { AuthContext } from "../../../context/AuthContext";

import ProductForm from "../../../components/forms/ProductForm";

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [contentsFeedback, setContentsFeedback] = useState("");

  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Evita chamada a api quando o query.page ainda está undefined
    if (!router.query.id) {
      return;
    }

    (async () => {
      const productResponse = await getProductById(router.query.id);
      setProduct(productResponse);
      setFeedbacks(productResponse.feedbacks);
    })();
  }, [router.query.id]);

  async function handleCreateFeedback() {
    const feedbackResponse = await createFeedback(
      contentsFeedback,
      product.id,
      user.id
    );
    setContentsFeedback("");
    setFeedbacks((prevState) => {
      return [...prevState, feedbackResponse.feedback];
    });
  }

  return (
    <VStack minH="73vh">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="#6FBE5E" />
          <ModalHeader>Cadastro de produto</ModalHeader>
          <ModalBody>
            <ProductForm productProp={product} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <HStack width="100%" justify="space-between" my={2} px={10}>
        <Button backgroundColor="#fff" border="1px solid #6FBE5E">
          <ArrowBackIcon mr={1} />
          <Link href="/produtos?page=1">
            <Text>Voltar</Text>
          </Link>
        </Button>

        {isAuthenticated && (
          <Button
            backgroundColor="#fff"
            border="1px solid #6FBE5E"
            onClick={onOpen}
          >
            <EditIcon mr={1} />
            <Text>Editar</Text>
          </Button>
        )}
      </HStack>

      {product != null && (
        <HStack spacing={["20px", "60px", "80px"]}>
          {product.image ? (
            <Image
              src={product.image}
              objectFit="scale-down"
              width={["200px", "220px", "240px"]}
              height={["200px", "220px", "240px"]}
              border="1px solid rgba(128,128,128, .1)"
              boxShadow="5px 5px 5px rgba(128,128,128, .3)"
            />
          ) : (
            <Image
              src="/Sem-imagem.jpeg"
              objectFit="scale-down"
              width={["200px", "220px", "240px"]}
              height={["200px", "220px", "240px"]}
              border="1px solid rgba(128,128,128, .1)"
              boxShadow="5px 5px 5px rgba(128,128,128, .3)"
            />
          )}

          <VStack mx={5}>
            <Heading>{product.name}</Heading>

            <VStack align="flex-start">
              <Text>{product.description}</Text>

              <HStack>
                <Text as="b">Marca: </Text>
                <Text>{product.brand.name}</Text>
              </HStack>

              <HStack>
                <Text as="b">Categoria(s): </Text>
                {product.CategoriesOnProducts.map((category) => (
                  <Text
                    key={category.id}
                    backgroundColor="#253C1F"
                    color="#FFFFFF"
                    borderRadius={200}
                    px="5px"
                  >
                    {category.category.name}
                  </Text>
                ))}
              </HStack>

              <HStack>
                <Text as="b">Ingredientes(s): </Text>
                {product.IngredientsOnProducts.map((ingredient) => (
                  <Text
                    key={ingredient.id}
                    backgroundColor="#fff"
                    border="1px solid #6FBE5E"
                    borderRadius={200}
                    px="5px"
                  >
                    {ingredient.ingredient.name}
                  </Text>
                ))}
              </HStack>

              <InputGroup border="0px solid #6FBE5E">
                <Input
                  placeholder="Deixe um comentário"
                  _focusVisible={{
                    borderColor: "#6FBE5E",
                    boxShadow: "0 0 0 1px #6FBE5E",
                  }}
                  value={contentsFeedback}
                  onChange={(e) => setContentsFeedback(e.target.value)}
                />
                <InputRightAddon
                  cursor="pointer"
                  backgroundColor="#253C1F"
                  onClick={handleCreateFeedback}
                  children={
                    <Button
                      backgroundColor="#253C1F"
                      color="#fff"
                      _hover={{}}
                      height="100%"
                    >
                      Publicar
                    </Button>
                  }
                />
              </InputGroup>

              {feedbacks.length > 0 &&
                feedbacks.map((feedback, index) => (
                  <VStack key={index}>
                    <Text as="b">{feedback.user.email}</Text>
                    <Text>{feedback.contents}</Text>
                  </VStack>
                ))}
            </VStack>
          </VStack>
        </HStack>
      )}
    </VStack>
  );
}
