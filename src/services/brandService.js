import axios from "../config/axios";

async function getAllBrands() {
  const brands = axios
    .get("/brands")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return brands;
}

async function createBrand(name) {
  const brand = await axios
    .post("/brands", { name })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return brand;

  // const data = {
  //   name: name,
  // };

  // return await axios
  //   .post("/brands", data)
  //   .then(async (response) => {
  //     return await axios
  //       .get(`/brands/${response.data.id}`)
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

async function getBrandById(id) {
  const brand = await axios.get(`/brands/${id}`);
  // await axios
  //   .get(`/brands/${id}`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  return brand.data;
}

async function deleteBrand(id) {
  const brand = await axios
    .delete(`/brands/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  return brand;
}

async function updateBrand(id, name) {
  const brand = await axios
    .put(`/brands/${id}`, { name })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return brand;
}

export { getAllBrands, createBrand, deleteBrand, updateBrand, getBrandById };
