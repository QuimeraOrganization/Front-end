import axios from "../config/axios";

export async function getAllBrands() {
  return await axios.get("/brands").then(response => {
    return response.data;
  });
}

export async function createBrand(name) {
  const data = {
    name: name
  }

  return await axios.post("/brands", data).then(async (response) => {
    return await axios.get(`/brands/${response.data.id}`).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error)
    });
  }).catch((error) => {
    console.log(error)
  });
}