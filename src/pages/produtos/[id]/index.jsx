import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { VStack, HStack, Button, Text, Image, Heading } from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

import { getProductById } from "../../../services/productService";
import Link from "next/link";

export default function ProductDetails() {
  const [product, setProduct] = useState({});

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const productResponse = await getProductById(router.query.id);
      setProduct(productResponse);
    })();
  }, []);

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
              boxShadow="5px 5px 5px rgba(128,128,128, .3)"
            />

            <VStack>
              <Heading></Heading>
            </VStack>
          </>
        )}
      </HStack>
    </VStack>
  );
}
