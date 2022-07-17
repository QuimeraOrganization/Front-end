import axios from "../config/axios";

async function getAllCategories() {
  const categories = await axios
    .get("/categories")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return categories;
}

async function createCategory(name) {
  const category = await axios
    .post("/categories", { name })
    .then((response) => {
      return response.data;
    });
  return category;

  // const data = {
  //   name: name,
  // };

  // return await axios
  //   .post("/categories", data)
  //   .then(async (response) => {
  //     return await axios
  //       .get(`/categories/${response.data.id}`)
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

async function getCategoryById(id) {
  const category = await axios
    .get(`/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return category;
}

async function updateCategory(id, name) {
  const category = await axios
    .put(`/categories/${id}`, { name })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return category;
}

async function deleteCategory(id) {
  return await axios.delete(`/categories/${id}`);
}

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
