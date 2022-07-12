import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    // Authorization: `Bearer ${cookies["nextauth.token"]}`,
    Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjoiQURNSU4iLCJpYXQiOjE2NTc2NTM0ODksImV4cCI6MTY1NzczOTg4OX0.WtzkZeu_CwD5CDzV3kcQifsk90_dqbqMATjRGuQUXd4"
  },
});

export default instance;
