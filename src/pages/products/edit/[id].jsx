import { useEffect, useState } from "react";
import {
  VStack,
} from "@chakra-ui/react";

import { getProductById } from "../../../services/productService";

import ProductEdit from "../../../components/Form/ProductEdit";
import { parseCookies } from "nookies";
export default function EditProduct({ productId }) {
  const [product, setProduct] = useState();

  useEffect(() => {
    // Evita chamada a api quando o query.page ainda está undefined
    if (!productId) {
      return;
    }

    (async () => {
      const productResponse = await getProductById(productId);
      console.log(productResponse);
      setProduct(productResponse);
    })();
  }, []);

  return (
    <VStack minHeight="calc(100vh - 70px - 183px)">
      {product && <ProductEdit productProp={product} />}
    </VStack>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];

  if (!token) {
    return {
      redirect: {
        destination: "/produtos?page=1",
        permanent: false,
      },
    };
  }
  return {
    props: {
      productId: context.query.id,
    },
  };
}
