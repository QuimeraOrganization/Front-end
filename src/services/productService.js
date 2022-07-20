import axios from "../config/axios";
import FormData from "form-data";

async function createProduct(product, imageRef) {
  const form = new FormData();

  if (imageRef.current.state.files != null) {
    form.append("image", imageRef.current.state.files[0]);
  }

  form.append("product", JSON.stringify(product));

  return await axios
    .post("/products", form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// tem que converter os relacionamentos para array de inteiros
async function updateProduct(product, imageRef) {
  const form = new FormData();

  if (imageRef.current?.state?.files != null) {
    form.append("image", imageRef.current.state.files[0]);
  }

  console.log(imageRef)

  form.append("product", JSON.stringify(product));

  return await axios
    .put(`/products/${product.id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

async function getProductsPaged(page) {
  return await axios
    .get(`/products?page=${page}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getProductById(id) {
  const product = await axios
    .get(`/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return product;
}

async function getProductsWithFilter(url) {
  return await axios.get(url).then((response) => {
    return response.data;
  }).catch((error) => {
    return error.response;
  });
}



async function getAllProducts() {
  const products = await axios.get("/products/all");
  return products.data;
}

async function deleteProduct(id) {
  return await axios.delete(`/products/${id}`);
}

async function deleteProductImage(id) {
  return await axios.delete(`/products/${id}/image`);
}

export {
  createProduct,
  getProductsPaged,
  getAllProducts,
  getProductsWithFilter,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductImage
};
