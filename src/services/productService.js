import axios from "../config/axios";



export async function getProductsPaged(page) {
  return await axios.get(`/products?page=${page}`).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}