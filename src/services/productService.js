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
    .get(`/products/unique/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return product;
}

async function getAllProducts() {
  const products = await axios.get("/products/all");
  return products.data;
}

async function deleteProduct(id) {
  return await axios.delete(`/products/${id}`);
}

export {
  getProductsPaged,
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
