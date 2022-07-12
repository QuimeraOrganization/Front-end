import axios from "../config/axios";

export async function getAllIngredients() {
  return await axios.get("/ingredients").then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
  });
}