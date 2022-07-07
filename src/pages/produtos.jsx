import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Stack, Spinner, HStack, VStack, Input, InputGroup, InputRightAddon, Select, Wrap, Text, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import Card from '../components/Card';
import { getProductsPaged } from "../services/productService";

export default function Home() {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page));
  const [loading, setLoading] = useState(true);

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

  return (
    <VStack
      px={10}
      mt={4}
    >
      <HStack
        width="100%"
        justify="space-between"
        mb={4}
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
          Prev
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
          Next
        </Button>
      </HStack>
    </VStack >
  )
}
