import axios from "../config/axios";
async function createUser(email, password, ingredients, permission) {
  const user = await axios.post("/users", {
    email,
    password,
    ingredients,
    permission,
  });
  return user.data;
}

async function createProvider(
  email,
  password,
  brandId,
  ingredients,
  permission
) {
  console.log(ingredients);
  const user = await axios.post("/users/provider", {
    email: email,
    password: password,
    brandId: brandId,
    permission: permission,
  });
  return user.data;
}

async function deleteUser(id) {
  return await axios.delete(`/users/${id}`);
}

async function getUsers() {
  const users = await axios.get("/users");
  return users.data;
}

async function updateUser(id, email, password, ingredients, permission) {
  const user = await axios.put(`/users/${id}`, {
    email,
    password,
    ingredients,
    permission,
  });
  return user.data;
}

async function getUserById(id) {
  const users = await axios.get(`/users/${id}`);
  return users.data;
}

export {
  createProvider,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getUserById,
};
