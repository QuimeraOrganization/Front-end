import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Spinner,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
} from "@chakra-ui/icons";

import { Select } from "chakra-react-select";

import Card from "../../components/Card";

import { getProductsPaged, getProductsContainingIngredients } from "../../services/productService";
import ProductForm from "../../components/forms/ProductForm";
import { getAllIngredients, createIngredient } from "../../services/ingredientService";
import { AuthContext } from "../../context/AuthContext";

const chakraStyles = {
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#6FBE5E",
    color: "#fff",
  }),
  control: (provided, state) => ({
    ...provided,
    _hover: {
      border: "1.5px solid #6FBE5E"
    },
    _focusVisible: {
      border: "1.5px solid #6FBE5E"
    }
  }),
  container: (provided, state) => ({
    ...provided,
    minWidth: "250px",
    maxWidth: "250px",
    border: "0px solid #6FBE5E",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#253C1F",
    backgroundColor: "#fff",
    _hover: {
      backgroundColor: "#6FBE5E",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#253C1F"
  }),
  downChevron: (provided, state) => ({
    ...provided,
    color: "#6FBE5E"
  })
};

const filterOptions = [
  {
    label: "Contém ingredientes",
    value: "Contém ingredientes"
  }
]

const initialFilter = {
  label: "Selecione um filtro",
  value: null
}

export default function Home() {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page));
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [ingredientsSelected, setIngredientsSelected] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useContext(AuthContext);

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
    router.push(`produtos/${productId}`);
  }

  async function handleSelectFilter(filter) {
    if (filter.label === "Contém ingredientes") {
      const ingredientsResponse = await getAllIngredients();

      setIngredientsOptions(ingredientsResponse.map((ingredient) => {
        return {
          label: ingredient.name,
          value: ingredient.id,
        }
      }));
    }
    setFilter(filter);
  }

  async function handleClearFilters() {
    setLoading(true);
    setFilter(initialFilter);

    const productsData = await getProductsPaged(parseInt(router.query.page));
    setCurrentPage(parseInt(router.query.page));
    setPageProducts(productsData);
    setLoading(false);

    router.back();
  }

  async function handleCreateIngredient(ingredientName) {
    const ingredientResponse = await createIngredient(ingredientName);
    const nweIngredientOption = {
      label: ingredientResponse.name,
      value: ingredientResponse.id,
    };

    setIngredientsOptions((prevState) => {
      return [...prevState, nweIngredientOption];
    });
  }

  async function handleSelectIngredients(ingredients) {
    const ingredientsId = await ingredients.map((ingredient) => {
      return ingredient.value;
    });

    setIngredientsSelected(ingredientsId);
  }

  async function handleSearchWithFilter() {
    setLoading(true);

    let urlFront = `/produtos/?page=1`;

    ingredientsSelected.forEach((ingredientId) => {
      urlFront += `&contains_ingredients[]=${ingredientId}`;
    });

    router.push(urlFront);

    let urlBack = urlFront.replace("produtos", "products");
    const searchResponse = await getProductsContainingIngredients(urlBack);

    setPageProducts(searchResponse);
    setLoading(false);
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

      <VStack px={10} mt={4}>
        <HStack
          width="100%"
          justify="space-between"
          alignItems="flex-start"
          mb={4}>
          <HStack>
            {/* Barra de busca */}
            <InputGroup size="sm" border="0px solid #6FBE5E">
              <Input
                focusBorderColor="#6FBE5E"
                placeholder="Busque por um produto..."
                fontSize={{ base: "11px", md: "12px", lg: "13px" }}
                minWidth="150px"
                maxWidth="200px"
                borderRadius={200}
              />
              <InputRightAddon
                children={<SearchIcon color="#6FBE5E" />}
                backgroundColor="transparent"
                borderRadius={200}
                cursor="pointer"
              />
            </InputGroup>

            {isAuthenticated && (
              <Tooltip
                hasArrow
                label="Cadastrar produto"
                backgroundColor="#6FBE5E"
                fontSize={["11px", "12px", "13px"]}
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
            )}
          </HStack>

          {/* Filtros */}
          <HStack>
            <VStack>
              <Select
                useBasicStyles
                size="sm"
                placeholder="Selecione um filtro"
                chakraStyles={chakraStyles}
                options={filterOptions}
                value={filter}
                onChange={(e) => handleSelectFilter(e)}
              />

              {filter.label === "Contém ingredientes" && (
                <>
                  <Select
                    isMulti
                    useBasicStyles
                    size="sm"
                    id="ingredients"
                    placeholder="Selecione os ingredientes"
                    chakraStyles={chakraStyles}
                    onChange={(e) => handleSelectIngredients(e)}
                    options={ingredientsOptions}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? (
                        "Sem resultados"
                      ) : (
                        <VStack>
                          <Text>Ingrediente não cadastrado</Text>
                          <Button
                            backgroundColor="#253C1F"
                            color="#fff"
                            _hover={{ backgroundColor: "#6FBE5E" }}
                            onClick={() => handleCreateIngredient(inputValue)}
                          >
                            Cadastrar ingrediente
                          </Button>
                        </VStack>
                      )
                    }
                  />
                </>
              )}
            </VStack>
            {filter.label === "Contém ingredientes" && (
              <VStack>
                <Button
                  width="100%"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Limpar filtros
                </Button>
                <Button
                  width="100%"
                  size="sm"
                  onClick={handleSearchWithFilter}
                >
                  Buscar
                </Button>
              </VStack>
            )}
          </HStack>
        </HStack>

        {loading && <Spinner color="#6FBE5E" />}

        <HStack>
          <Flex direction="row" justify="center" wrap="wrap">
            {pageProducts != null &&
              pageProducts.data != null &&
              !loading &&
              pageProducts.data.map((product) => {
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
              })}
          </Flex>
        </HStack>

        <HStack>
          <Button
            disabled={currentPage - 1 < 1 ? true : false}
            size="sm"
            my={2}
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            onClick={() => prevPage()}
          >
            <ChevronLeftIcon color="#6FBE5E" width="100%" height="100%" />
          </Button>

          <Button
            disabled={false}
            cursor="default"
            size="sm"
            my={2}
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            _hover={false}
          >
            {currentPage}
          </Button>

          <Button
            disabled={currentPage + 1 > pageProducts?.totalPages ? true : false}
            size="sm"
            my={2}
            backgroundColor="#fff"
            border="1px solid"
            borderColor="#6FBE5E"
            onClick={() => nextPage()}
          >
            <ChevronRightIcon color="#6FBE5E" width="100%" height="100%" />
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
