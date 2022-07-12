import axios from "../config/axios";
async function createUser(email, password, permission) {
  const user = await axios.post("/users", { email, password, permission });
  return user.data;
}
async function deleteUser(id) {
  return await axios.delete(`/users/${id}`);
}

async function getUsers() {
  const users = await axios.get("/users");
  return users.data;
}

export { createUser, deleteUser, getUsers };
