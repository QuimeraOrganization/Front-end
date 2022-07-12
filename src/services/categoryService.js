import axios from "../config/axios";

export async function getAllCategories() {
  return await axios.get("/categories").then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
  });
}

export async function createCategory(name) {
  const data = {
    name: name
  }

  return await axios.post("/categories", data).then(async (response) => {
    return await axios.get(`/categories/${response.data.id}`).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error);
    });
  }).catch(error => {
    console.log(error);
  });
}

export async function findCategory(id) {
  return await axios.get(`/categories/${id}`).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}