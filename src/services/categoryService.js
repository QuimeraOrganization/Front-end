import axios from "../config/axios";

export async function findCategory(id) {
  return await axios.get(`/categories/${id}`).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}