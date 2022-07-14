import { useState, useEffect, useRef, useContext } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import FilePicker from "chakra-ui-file-picker";
import Router from "next/router";
import { getAllBrands, createBrand } from "../../services/brandService";
import {
  getAllCategories,
  createCategory,
} from "../../services/categoryService";
import { getAllIngredients } from "../../services/ingredientService";
import { createProduct } from "../../services/productService";

import { AuthContext } from "../../context/AuthContext";

const initialProduct = {
  name: "",
  description: "",
  brandId: null,
  userId: null,
  categories: [],
  ingredients: [],
};

const chakraStyles = {
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#6FBE5E",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#253C1F",
    backgroundColor: "#fff",
    _active: {
      backgroundColor: "red",
    },
    _hover: {
      backgroundColor: "#6FBE5E",
    },
  }),
};

export default function ProductForm() {
  const [product, setProduct] = useState(initialProduct);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);

  const [isNameError, setNameError] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);
  const [isBrandError, setBrandError] = useState(false);
  const [isCategoriesError, setCategoriesError] = useState(false);
  const [isIngredientsError, setIngredientsError] = useState(false);

  const imageRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const brandsResponse = await getAllBrands();
      const categoriesResponse = await getAllCategories();
      const ingredientsResponse = await getAllIngredients();

      setBrandsOptions(
        brandsResponse.map((brand) => {
          return {
            label: brand.name,
            value: brand.id,
          };
        })
      );

      setCategoriesOptions(
        categoriesResponse.map((category) => {
          return {
            label: category.name,
            value: category.id,
          };
        })
      );

      setIngredientsOptions(
        ingredientsResponse.map((ingredient) => {
          return {
            label: ingredient.name,
            value: ingredient.id,
          };
        })
      );

      setProduct((prevState) => {
        return { ...prevState, userId: user.id };
      });
    })();
  }, []);

  async function handleCreatebrand(brandName) {
    const brandResponse = await createBrand(brandName);
    const newBrandOption = {
      label: brandResponse.name,
      value: brandResponse.id,
    };

    setBrandsOptions((prevState) => {
      return [...prevState, newBrandOption];
    });
  }

  async function handleCreateCategory(categoryName) {
    const categoryResponse = await createCategory(categoryName);
    const newCategoryOption = {
      label: categoryResponse.name,
      value: categoryResponse.id,
    };

    setCategoriesOptions((prevState) => {
      return [...prevState, newCategoryOption];
    });
  }

  function handleNameChange(e) {
    setProduct((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  }

  function handleDescriptionChange(e) {
    setProduct((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  }

  function handleSelectBrand(brand) {
    setProduct((prevState) => {
      return { ...prevState, brandId: brand.value };
    });
  }

  async function handleSelectCategories(categories) {
    const categoriesId = await categories.map((category) => {
      return category.value;
    });

    setProduct((prevState) => {
      return { ...prevState, categories: categoriesId };
    });
  }

  async function handleSelectIngredients(ingredients) {
    const ingredientsId = await ingredients.map((ingredient) => {
      return ingredient.value;
    });

    setProduct((prevState) => {
      return { ...prevState, ingredients: ingredientsId };
    });
  }

  function isValidFields() {
    if (
      product.name != "" &&
      product.description != "" &&
      product.brandId != null &&
      product.categories.length != 0 &&
      product.ingredients.length != 0
    ) {
      return true;
    }
    return false;
  }

  async function handleSubmit() {
    product.name === "" ? setNameError(true) : setNameError(false);
    product.description === ""
      ? setDescriptionError(true)
      : setDescriptionError(false);
    product.brandId === null ? setBrandError(true) : setBrandError(false);
    product.categories.length === 0
      ? setCategoriesError(true)
      : setCategoriesError(false);
    product.ingredients.length === 0
      ? setIngredientsError(true)
      : setIngredientsError(false);

    if (isValidFields()) {
      console.log("cadastra");

      // Implementar o toast
      const response = await createProduct(product, imageRef);

      Router.push("/");
      console.log(response);
    }

    console.log(product);
  }

  return (
    <VStack>
      <FormControl isRequired isInvalid={isNameError}>
        <FormLabel htmlFor="name">Nome</FormLabel>
        <Input
          id="name"
          type="text"
          value={product.name}
          onChange={handleNameChange}
        />
        {isNameError && <FormErrorMessage>Campo obrigatório</FormErrorMessage>}
      </FormControl>

      <FormControl isRequired isInvalid={isDescriptionError}>
        <FormLabel htmlFor="description">Descrição</FormLabel>
        <Input
          id="description"
          type="text"
          value={product.description}
          onChange={handleDescriptionChange}
        />
        {isDescriptionError && (
          <FormErrorMessage>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={isBrandError}>
        <FormLabel htmlFor="brand">Marca</FormLabel>
        <Select
          id="brand"
          placeholder="Selecione uma marca"
          useBasicStyles
          size="sm"
          chakraStyles={chakraStyles}
          onChange={(e) => handleSelectBrand(e)}
          options={brandsOptions}
          noOptionsMessage={({ inputValue }) =>
            !inputValue ? (
              "Sem resultados"
            ) : (
              <VStack>
                <Text>Marca não cadastrada</Text>
                <Button
                  backgroundColor="#253C1F"
                  color="#fff"
                  _hover={{ backgroundColor: "#6FBE5E" }}
                  onClick={() => handleCreatebrand(inputValue)}
                >
                  Cadastrar marca
                </Button>
              </VStack>
            )
          }
        />
        {isBrandError && <FormErrorMessage>Campo obrigatório</FormErrorMessage>}
      </FormControl>

      <FormControl isRequired isInvalid={isCategoriesError}>
        <FormLabel htmlFor="categories">Categoria(s)</FormLabel>
        <Select
          isMulti
          id="categories"
          placeholder="Selecione uma Categoria"
          useBasicStyles
          size="sm"
          chakraStyles={chakraStyles}
          onChange={(e) => handleSelectCategories(e)}
          options={categoriesOptions}
          noOptionsMessage={({ inputValue }) =>
            !inputValue ? (
              "Sem resultados"
            ) : (
              <VStack>
                <Text>Categoria não cadastrada</Text>
                <Button
                  backgroundColor="#253C1F"
                  color="#fff"
                  _hover={{ backgroundColor: "#6FBE5E" }}
                  onClick={() => handleCreateCategory(inputValue)}
                >
                  Cadastrar categoria
                </Button>
              </VStack>
            )
          }
        />
        {isCategoriesError && (
          <FormErrorMessage>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={isIngredientsError}>
        <FormLabel htmlFor="ingredients">Ingrediente(s)</FormLabel>
        <Select
          isMulti
          id="ingredients"
          placeholder="Selecione um ingrediente"
          useBasicStyles
          size="sm"
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
                  // onClick={() => handleCreateCategory(inputValue)}
                >
                  Cadastrar ingrediente
                </Button>
              </VStack>
            )
          }
        />
        {isIngredientsError && (
          <FormErrorMessage>Campo obrigatório</FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="image">Imagem</FormLabel>
        <FilePicker
          placeholder="Selecione uma imagem"
          clearButtonLabel="Remover"
          inputProps={{ cursor: "pointer" }}
          inputGroupProps={{ cursor: "pointer" }}
          accept="image/*"
          onFileChange={(fileList) => {}}
          multipleFiles={false}
          hideClearButton={false}
          ref={imageRef}
        />
      </FormControl>

      <Button
        backgroundColor="#253C1F"
        color="#fff"
        _hover={{ backgroundColor: "#6FBE5E" }}
        onClick={handleSubmit}
      >
        Cadastrar
      </Button>
    </VStack>
  );
}
