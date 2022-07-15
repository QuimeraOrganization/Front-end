import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { VStack, HStack, Button, Text, Image, Heading } from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

import { getProductById } from "../../../services/productService";
import Link from "next/link";

export default function ProductDetails() {
  const [product, setProduct] = useState();

  const router = useRouter();

  useEffect(() => {
    // Evita chamada a api quando o query.page ainda está undefined
    if (!router.query.id) {
      return;
    }

    (async () => {
      const productResponse = await getProductById(router.query.id);
      setProduct(productResponse);
    })();
  }, [router.query.id]);

  return (
    <VStack>
      <HStack width="100%" justify="space-between" my={2} px={10}>
        <Button backgroundColor="#fff" border="1px solid #6FBE5E">
          <ArrowBackIcon mr={1} />
          <Link href="/">
            <Text>Voltar</Text>
          </Link>
        </Button>

        <Button backgroundColor="#fff" border="1px solid #6FBE5E">
          <EditIcon mr={1} />
          <Text>Editar</Text>
        </Button>
      </HStack>

      <HStack>
        {product != null && (
          <>
            <Image
              src={product.image}
              objectFit="scale-down"
              width={["200px", "220px", "240px"]}
              height={["200px", "220px", "240px"]}
              border="1px solid rgba(128,128,128, .1)"
              boxShadow="5px 5px 5px rgba(128,128,128, .3)"
            />

            <VStack>
              <Heading>{product.name}</Heading>
              <Text>{product.description}</Text>

              <VStack>
                <HStack>
                  <Text as="b">Marca: </Text>
                  <Text>{product.brand.name}</Text>
                </HStack>

                <HStack>
                  <Text as="b">Categoria(s): </Text>
                  {product.CategoriesOnProducts.map(category => (
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
                  {product.IngredientsOnProducts.map(ingredient => (
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
              </VStack>
            </VStack>
          </>
        )}
      </HStack>
    </VStack>
  );
}
