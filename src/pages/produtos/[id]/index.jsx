import { useEffect, useState, useContext, useRef } from "react";
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
  Avatar,
  Box
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

import { getProductById } from "../../../services/productService";
import { createFeedback } from "../../../services/feedbackService";
import { AuthContext } from "../../../context/AuthContext";
import { getUserById } from "../../../services/userService";

import ProductForm from "../../../components/forms/ProductForm";

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [contentsFeedback, setContentsFeedback] = useState("");
  const [listIngredientsAllergic, setListIngredientsAllergic] = useState([]);
  const [listIngredientsNonAllergic, setListIngredientsNonAllergic] = useState([]);

  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const containerRef = useRef();

  useEffect(() => {
    // Evita chamada a api quando o query.page ainda está undefined
    if (!router.query.id) {
      return;
    }

    (async () => {
      const productResponse = await getProductById(router.query.id);
      setProduct(productResponse);
      setFeedbacks(productResponse.feedbacks);

      let ingredientsAllergic = [];
      let ingredientsNonAllergic = [];

      if (user) {
        const userResponse = await getUserById(user.id);

        productResponse.IngredientsOnProducts.forEach((ingredient) => {
          if (isAllergic(userResponse.IngredientsOnUsersAllergic, ingredient)) {
            ingredientsAllergic.push(ingredient);
          } else {
            ingredientsNonAllergic.push(ingredient);
          }
        });

      } else {
        productResponse.IngredientsOnProducts.forEach((ingredient) => {
          ingredientsNonAllergic.push(ingredient);
        });
      }

      setListIngredientsAllergic(ingredientsAllergic);
      setListIngredientsNonAllergic(ingredientsNonAllergic);

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

  function formatDate(dateString) {
    let date = new Date(dateString);
    let dateFormatted =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    return dateFormatted;
  }

  function isAllergic(listIngredients, seekerIngredient) {
    let allergic = false;

    listIngredients.forEach(ingredient => {
      if (ingredient.ingredient.id === seekerIngredient.ingredient.id) {
        allergic = true;
      }
    });

    if (allergic) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <VStack minHeight="calc(100vh - 60px - 183px)">
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

      <HStack
        width="100%"
        justify="space-between"
        my={2}
        px={10}
      >
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
        <HStack
          alignItems="flex-start"
          justify="center"
          spacing={["20px", "40px", "60px", "80px", "120px"]}
          pb="20px"
          wrap="wrap"
        >
          {product.image ? (
            <Box minHeight={["0", containerRef?.current?.scrollHeight, containerRef?.current?.scrollHeight, containerRef?.current?.scrollHeight]}>
              <Image
                src={product.image}
                position="sticky"
                top="100px"
                objectFit="scale-down"
                width={["200px", "320px", "380px", "440px"]}
                height={["200px", "320px", "380px", "440px"]}
                border="1px solid rgba(128,128,128, .1)"
                boxShadow="5px 5px 5px rgba(128,128,128, .3)"
                style={{ marginBottom: "20px" }}
              />
            </Box>
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

          <VStack
            mx={5}
            minHeight={["100%", "30vh", "35vh", "40vh"]}
            maxWidth={["100%", "30vw", "35vw", "40vw"]}
            ref={containerRef}
          >
            <VStack
              align="flex-start"
              spacing={10}
            >
              <VStack align="flex-start" spacing={4}>
                <Heading>{product.name}</Heading>
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

                <HStack wrap="wrap">
                  <Text marginBottom="10px" as="b">Ingredientes(s): </Text>

                  {listIngredientsNonAllergic.map((ingredient) => (
                    <Text
                      key={ingredient.id}
                      backgroundColor="#fff"
                      border="1px solid #6FBE5E"
                      borderRadius={200}
                      style={{ marginBottom: "10px" }}
                      px="5px"
                    >
                      {ingredient.ingredient.name}
                    </Text>
                  ))}
                </HStack>

                {listIngredientsAllergic.length > 0 && (
                  <HStack wrap="wrap">
                    <Text marginBottom="10px" as="b">Ingredientes(s) alergico(s): </Text>

                    {listIngredientsAllergic.map((ingredient) => (
                      <Text
                        key={ingredient.id}
                        backgroundColor="#fff"
                        border="1px solid red"
                        borderRadius={200}
                        px="5px"
                        style={{ marginBottom: "10px" }}
                      >
                        {ingredient.ingredient.name}
                      </Text>
                    ))}
                  </HStack>
                )}

                <HStack>
                  <Text as="b">Publicado por: </Text>
                  <Text>{product.user.email}</Text>
                </HStack>
              </VStack>

              <VStack align="flex-start" spacing={8} maxWidth="40vw">
                {isAuthenticated && (
                  <InputGroup border="0px solid #6FBE5E">
                    <Input
                      placeholder="Deixe um comentário"
                      minWidth="200px"
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
                    >
                      <Button
                        backgroundColor="#253C1F"
                        color="#fff"
                        _hover={{}}
                        height="100%"
                      >
                        Publicar
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                )}

                {feedbacks.length > 0 &&
                  feedbacks.map((feedback, index) => (
                    <VStack
                      key={index}
                      align="flex-start"
                    >
                      <HStack align="flex-start">
                        <HStack>
                          <Avatar size="sm" name={feedback.user.email} />
                        </HStack>

                        <VStack align="flex-start">
                          <HStack
                            pt={1}
                            wrap="wrap"
                          >
                            <Text as="b">{feedback.user.email}</Text>
                            <Text>{formatDate(feedback.created_at)}</Text>
                          </HStack>
                          <Text wordBreak="break-word">{feedback.contents}</Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  ))}
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      )}
    </VStack>
  );
}
