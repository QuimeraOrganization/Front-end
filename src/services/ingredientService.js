import axios from "../config/axios";

async function getAllIngredients() {
  return await axios
    .get("/ingredients")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function createIngredient(name) {
  const ingredient = await axios.post("/ingredients", { name });
  return ingredient.data;
}

async function deleteIngredient(id) {
  return await axios.delete(`/ingredients/${id}`);
}

async function updateIngredient(id, name) {
  const ingredient = await axios.put(`/ingredients/${id}`, { name });
  return ingredient.data;
}

async function getIngredientById(id) {
  const ingredient = await axios.get(`/ingredients/${id}`);
  return ingredient.data;
}

export {
  getAllIngredients,
  createIngredient,
  deleteIngredient,
  updateIngredient,
  getIngredientById,
};
