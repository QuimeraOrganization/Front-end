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
  useDisclosure,
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
import ProductForm from "../../components/forms/ProductForm";
import { AuthContext } from "../../context/AuthContext";

import {
  getProductsPaged,
  getProductsWithFilter,
} from "../../services/productService";
import {
  getAllIngredients,
  createIngredient,
} from "../../services/ingredientService";
import { getAllCategories } from "../../services/categoryService";

const chakraStyles = {
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#6FBE5E",
    color: "#fff",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    borderRadius: "10px",
    _hover: {
      border: "1.5px solid #6FBE5E",
    },
    _focusVisible: {
      border: "2px solid #6FBE5E",
    },
  }),
  container: (provided, state) => ({
    ...provided,
    minWidth: "270px",
    maxWidth: "300px",
    border: "0px solid #6FBE5E",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "red",
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
    color: "#253C1F",
  }),
  downChevron: (provided, state) => ({
    ...provided,
    color: "#6FBE5E",
  }),
};

const filterOptions = [
  {
    label: "Contém ingredientes",
    value: "Contém ingredientes",
  },
  {
    label: "Não contém ingredientes",
    value: "Não contém ingredientes",
  },
  {
    label: "Categorias",
    value: "Categorias",
  },
];

const initialFilter = {
  label: "Selecione um filtro",
  value: null,
};

export default function Home() {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page));
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [searchBar, setSearchBar] = useState("");

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
    if (
      filter.label === "Contém ingredientes" ||
      filter.label === "Não contém ingredientes"
    ) {
      const ingredientsResponse = await getAllIngredients();

      setIngredientsOptions(
        ingredientsResponse.map((ingredient) => {
          return {
            label: ingredient.name,
            value: ingredient.id,
          };
        })
      );
    }

    if (filter.label === "Categorias") {
      const categoriesResponse = await getAllCategories();

      setCategoriesOptions(
        categoriesResponse.map((category) => {
          return {
            label: category.name,
            value: category.id,
          };
        })
      );
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

    if (router.asPath.startsWith(`/produtos?page=${router.query.page}&`)) {
      router.back();
    } else {
      router.push("/produtos?page=1");
    }
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

  async function handleSelectCategories(categories) {
    const categoriesId = await categories.map((category) => {
      return category.value;
    });

    setCategoriesSelected(categoriesId);
  }

  async function handleSearchWithFilter() {
    setLoading(true);

    let urlFront = `/produtos/?page=1`;

    if (filter.label === "Contém ingredientes") {
      ingredientsSelected.forEach((ingredientId) => {
        urlFront += `&contains_ingredients[]=${ingredientId}`;
      });
    }

    if (filter.label === "Não contém ingredientes") {
      ingredientsSelected.forEach((ingredientId) => {
        urlFront += `&no_contains_ingredients[]=${ingredientId}`;
      });
    }

    if (filter.label === "Categorias") {
      categoriesSelected.forEach((categoryId) => {
        urlFront += `&categories[]=${categoryId}`;
      });
    }

    router.push(urlFront);

    let urlBack = urlFront.replace("produtos", "products");
    const searchResponse = await getProductsWithFilter(urlBack);

    setPageProducts(searchResponse);
    setLoading(false);
  }

  async function handleSearchWithName() {
    setLoading(true);

    let urlFront = `/produtos/?page=1&name=${searchBar}`;

    router.push(urlFront);

    let urlBack = urlFront.replace("produtos", "products");
    const searchResponse = await getProductsWithFilter(urlBack);
    setSearchBar("");
    setPageProducts(searchResponse);
    setLoading(false);
  }

  async function handleSearchKeyPress(event) {
    if (event.key === "Enter") {
      await handleSearchWithName();
    }
  }

  return (
    <VStack minHeight="calc(100vh - 60px - 183px)" alignItems="space-between">
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
          justify={["flex-start", "space-between"]}
          alignItems="flex-start"
          mb={4}
          wrap="wrap"
        >
          <HStack mb={2}>
            {/* Barra de busca */}
            <InputGroup
              size="md"
              border="0px solid #6FBE5E"
            >
              <Input
                placeholder="Busque por um produto..."
                _placeholder={{ color: "#253C1F" }}
                _hover={{ borderColor: "#6FBE5E" }}
                focusBorderColor="#6FBE5E"
                fontSize={{ base: "13px", md: "14px", lg: "15px" }}
                minWidth="150px"
                maxWidth="300px"
                borderRadius={200}
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
                onKeyPress={(e) => handleSearchKeyPress(e)}
              />
              <InputRightAddon
                backgroundColor="transparent"
                borderRadius={200}
                cursor="pointer"
                onClick={handleSearchWithName}
              >
                <SearchIcon color="#6FBE5E" />
              </InputRightAddon>
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
          <HStack style={{
            marginInlineStart: "0px",
          }}>
            <VStack>
              <Select
                useBasicStyles
                isSearchable={false}
                id="SelectFilter"
                instanceId="SelectFilter"
                size="md"
                placeholder="Selecione um filtro"
                chakraStyles={chakraStyles}
                options={filterOptions}
                value={filter}
                onChange={(e) => handleSelectFilter(e)}
              />

              {(filter.label === "Contém ingredientes" ||
                filter.label === "Não contém ingredientes") && (
                  <Select
                    isMulti
                    useBasicStyles
                    id="SelectIngredients"
                    instanceId="SelectIngredients"
                    size="md"
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
                        </VStack>
                      )
                    }
                  />
                )}

              {filter.label === "Categorias" && (
                <Select
                  isMulti
                  useBasicStyles
                  id="SelectCategories"
                  instanceId="SelectCategories"
                  placeholder="Selecione uma Categoria"
                  size="md"
                  chakraStyles={chakraStyles}
                  onChange={(e) => handleSelectCategories(e)}
                  options={categoriesOptions}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? (
                      "Sem resultados"
                    ) : (
                      <VStack>
                        <Text>Categoria não cadastrada</Text>
                      </VStack>
                    )
                  }
                />
              )}
            </VStack>
            {filter.label != "Selecione um filtro" && (
              <VStack>
                <Button
                  width="100%"
                  size="md"
                  backgroundColor="#253C1F"
                  color="#fff"
                  _hover={{ filter: "brightness(0.5)" }}
                  onClick={handleClearFilters}
                >
                  Limpar filtros
                </Button>
                <Button
                  width="100%"
                  size="md"
                  backgroundColor="#6FBE5E"
                  color="#fff"
                  _hover={{ filter: "brightness(0.8)" }}
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
              pageProducts.data.map((product) => (
                <Card
                  key={product.id}
                  image={product.image}
                  title={product.name}
                  brand={product.brand.name}
                  categories={product.CategoriesOnProducts}
                  onClick={(e) => handleCardClick(product.id)}
                />
              ))}

            {pageProducts != null &&
              pageProducts.data != null &&
              pageProducts.data.length == 0 &&
              !loading && (
                <Text>Sem resultados para busca {router.query.name}</Text>
              )}
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
            {loading ? <Spinner color="#6FBE5E" /> : currentPage}
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
    </VStack>
  );
}
