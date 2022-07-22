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
import ProductEdit from "../../../components/Form/ProductEdit";
import { parseCookies } from "nookies";
export default function EditProduct({ productId }) {
  const [product, setProduct] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [contentsFeedback, setContentsFeedback] = useState("");

  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Evita chamada a api quando o query.page ainda está undefined
    if (!productId) {
      return;
    }

    (async () => {
      const productResponse = await getProductById(productId);
      console.log(productResponse);
      setProduct(productResponse);
      // setFeedbacks(productResponse.feedbacks);
    })();
  }, []);

  return (
    <VStack minHeight="calc(100vh - 90px - 183px)">
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
