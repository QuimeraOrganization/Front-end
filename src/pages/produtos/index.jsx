import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Spinner, HStack, VStack, Input, InputGroup, InputRightAddon, Select, Button, Tooltip, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons';

import Card from "../../components/Card";
import { getProductsPaged } from "../../services/productService";
import ProductForm from '../../components/forms/ProductForm';

export default function Home() {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page));
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Evita chamada a api quando o query.page ainda está undefined
    if (!router.query.page) {
      return;
    }

    setLoading(true);

    (async () => {
      const productsData = await getProductsPaged(parseInt(router.query.page));
      setCurrentPage(parseInt(router.query.page));
      setPageProducts(productsData);
      setLoading(false);
    })();
  }, [router.query.page]);

  function nextPage() {
    router.push(`?page=${currentPage + 1}`);
  }

  function prevPage() {
    router.push(`?page=${currentPage - 1}`);
  }

  function handleCardClick(productId) {
    router.push(`produtos/${productId}`)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="#6FBE5E" />
          <ModalHeader>Cadastro de produto</ModalHeader>
          <ModalBody>
            <ProductForm />
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack
        px={10}
        mt={4}
      >
        <HStack
          width="100%"
          justify="space-between"
          mb={4}
        >
          <HStack
            width="100%"
          >
            {/* Barra de busca */}
            <InputGroup
              size='sm'
              width="30%"
              border="0px solid #6FBE5E"
            >
              <Input
                placeholder='Busque por um produto...'
                fontSize={{ base: '11px', md: '12px', lg: '13px' }}
                borderRadius={200}
              />
              <InputRightAddon
                children={<SearchIcon color="#6FBE5E" />}
                backgroundColor="transparent"
                borderRadius={200}
                cursor="pointer"
              />
            </InputGroup>

            <Tooltip
              hasArrow
              label="Cadastrar produto"
              backgroundColor="#6FBE5E"
              fontSize={['11px', '12px', '13px']}
            >
              <Button
                minWidth="auto"
                width={["30px", "33px", "35px"]}
                height={["30px", "33px", "35px"]}
                borderRadius="100%"
                backgroundColor="#6FBE5E"
                onClick={onOpen}
              >
                <AddIcon color="#fff" />
              </Button>
            </Tooltip>
          </HStack>

          {/* Filtro */}
          <Select
            size='sm'
            fontSize={{ base: '11px', md: '12px', lg: '13px' }}
            width="20%"
            placeholder='Filtrar por'
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            borderRadius={6}
          >
            <option value='option1'>Verificado</option>
            <option value='option2'>Nome crescente</option>
            <option value='option3'>Nome decresente</option>
          </Select>
        </HStack>

        {loading && (
          <Spinner color="#6FBE5E" />
        )}

        <HStack>
          <Flex
            direction="row"
            justify="center"
            wrap="wrap"
          >
            {
              pageProducts != null && pageProducts.data != null && !loading &&
              (pageProducts.data.map(product => {
                return (
                  <Card
                    key={product.id}
                    image={product.image}
                    title={product.name}
                    brand={product.brand.name}
                    categories={product.CategoriesOnProducts}
                    onClick={(e) => handleCardClick(product.id)}
                  />
                );
              }))
            }
          </Flex>
        </HStack>

        <HStack>
          <Button
            disabled={currentPage - 1 < 1 ? true : false}
            size='sm'
            my={2}
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            onClick={() => prevPage()}
          >
            <ChevronLeftIcon
              color="#6FBE5E"
              width="100%"
              height="100%"
            />
          </Button>

          <Button
            disabled={false}
            cursor="default"
            size='sm'
            my={2}
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            _hover={false}
          >
            {currentPage}
          </Button>

          <Button
            disabled={currentPage + 1 > pageProducts.totalPages ? true : false}
            size='sm'
            my={2}
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            onClick={() => nextPage()}
          >
            <ChevronRightIcon
              color="#6FBE5E"
              width="100%"
              height="100%"
            />
          </Button>
        </HStack>
      </VStack >
    </>
  );
}
