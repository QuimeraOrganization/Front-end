import { useState, useEffect, useRef, useContext } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  Button,
  Tag,
  TagCloseButton,
  Avatar
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import FilePicker from "chakra-ui-file-picker";
import { useRouter } from "next/router";
import { getAllBrands, createBrand } from "../../services/brandService";
import {
  getAllCategories,
  createCategory,
} from "../../services/categoryService";
import {
  getAllIngredients,
  createIngredient,
} from "../../services/ingredientService";
import { createProduct, updateProduct, deleteProductImage } from "../../services/productService";

import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

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
    _hover: {
      backgroundColor: "#6FBE5E",
    },
  }),
};

export default function ProductForm({ productProp = null }) {
  let initialProduct = null;
  let defaultBrand = null;
  let defaultCategories = null;
  let defaultIngredients = null;

  if (productProp === null) {
    initialProduct = {
      name: "",
      description: "",
      brandId: null,
      userId: null,
      categories: [],
      ingredients: [],
    };
  } else {
    initialProduct = {
      ...productProp,
      categories: [],
      ingredients: [],
    };

    defaultBrand = {
      label: productProp.brand.name,
      value: productProp.brand.id,
    };

    defaultCategories = productProp.CategoriesOnProducts.map((category) => {
      return {
        label: category.category.name,
        value: category.category.id,
      };
    });

    defaultIngredients = productProp.IngredientsOnProducts.map((ingredient) => {
      return {
        label: ingredient.ingredient.name,
        value: ingredient.ingredient.id,
      };
    });
  }

  const [product, setProduct] = useState(initialProduct);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);

  const [isNameError, setNameError] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);
  const [isBrandError, setBrandError] = useState(false);
  const [isDeleteImage, setDeleteImage] = useState(false);

  const imageRef = useRef();
  const selectRef = useRef();
  const { user } = useContext(AuthContext);
  const router = useRouter();

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

      if (defaultCategories) {
        const categoriesId = await defaultCategories.map((category) => {
          return category.value;
        });

        setProduct((prevState) => {
          return { ...prevState, categories: categoriesId };
        });
      }

      if (defaultIngredients) {
        const ingredientsId = await defaultIngredients.map((ingredient) => {
          return ingredient.value;
        });

        setProduct((prevState) => {
          return { ...prevState, ingredients: ingredientsId };
        });
      }

      if (!user) {
        router.push("/userRegister");
      } else {
        setProduct((prevState) => {
          return { ...prevState, userId: user.id };
        });
      }
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
      product.brandId != null
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

    if (isValidFields()) {
      if (productProp === null) {
        // Cadastra

        const response = await createProduct(product, imageRef);

        if (response.status === 201) {
          toast.success("Produto cadastrado com sucesso!", {
            autoClose: 2000,
          });

          router.push(`/produtos/${response.data.id}`);
        }

      } else {
        // Edita

        if (isDeleteImage) {
          console.log("Entrou")
          // Requisição para deletar imagem
          await deleteProductImage(product.id);
        }

        const response = await updateProduct(product, imageRef);

        if (response.status === 200) {
          toast.success("Produto atualizado com sucesso!", {
            autoClose: 2000,
          });

          router.reload();
        }
      }
    }
  }

  return (
    <VStack spacing={4}>
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
          defaultValue={defaultBrand}
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

      <FormControl>
        <FormLabel htmlFor="categories">Categoria(s)</FormLabel>
        <Select
          isMulti
          id="categories"
          placeholder="Selecione uma Categoria"
          useBasicStyles
          size="sm"
          chakraStyles={chakraStyles}
          onChange={(e) => handleSelectCategories(e)}
          defaultValue={defaultCategories}
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
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="ingredients">Ingrediente(s)</FormLabel>
        <Select
          isMulti
          id="ingredients"
          placeholder="Selecione um ingrediente"
          useBasicStyles
          size="sm"
          chakraStyles={chakraStyles}
          onChange={(e) => handleSelectIngredients(e)}
          defaultValue={defaultIngredients}
          options={ingredientsOptions}
          ref={selectRef}
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
      </FormControl>

      {product.image ? (
        <FormControl>
          <FormLabel htmlFor="image">Imagem</FormLabel>
          <Tag
            size='lg'
            borderRadius='full'
            backgroundColor="transparent"
          >
            <Avatar
              src={product.image}
              size='lg'
              name='Segun Adebayo'
              backgroundColor="transparent"
            />
            <TagCloseButton
              color="red"
              onClick={() => setProduct(prevState => {
                setDeleteImage(true);
                return { ...prevState, image: "" };
              })}
            />
          </Tag>
        </FormControl>
      )
        :
        (
          <FormControl>
            <FormLabel htmlFor="image">Imagem</FormLabel>
            <FilePicker
              placeholder="Selecione uma imagem"
              clearButtonLabel="Remover"
              inputProps={{ cursor: "pointer" }}
              inputGroupProps={{ cursor: "pointer" }}
              accept="image/*"
              onFileChange={(fileList) => { }}
              multipleFiles={false}
              hideClearButton={false}
              ref={imageRef}
            />
          </FormControl>
        )
      }

      <Button
        backgroundColor="#253C1F"
        color="#fff"
        _hover={{ backgroundColor: "#6FBE5E" }}
        onClick={handleSubmit}
      >
        {productProp ? "Salvar" : "Cadastrar"}
      </Button>
    </VStack>
  );
}
