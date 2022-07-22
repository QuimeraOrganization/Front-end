import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import axios from "../config/axios";
import parseJwt from "../utils/parseJWT";
import { singOut } from "../utils/singOut";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    (async () => {
      if (token) {
        setIsLoading(true);
        const id = parseJwt(token).id;

        await axios
          .get(`/users/${id}`)
          .then((res) => {
            setUser(parseJwt(token));
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            singOut();
          });
      } else {
        setUser(undefined);
      }
    })();
  }, []);

  const signOutUser = () => {
    setIsLoading(false);
    setUser(undefined);
    singOut();
  };

  async function singIn({ email, password }) {
    try {
      const res = await axios.post("/token", {
        email,
        password,
      });

      const { token } = res.data;

      setCookie(undefined, "nextauth.token", token, {
        //tempo de vida do cookie
        maxAge: 60 * 60 * 24 * 30, //30 dias
        //quais caminhos da aplicação vão ter acessos a esses cookies
        //no caso,esse vai ter usado de forma global
        path: "/",
      });

      setUser(parseJwt(token));

      //atulizando o header
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/");
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{ singIn, isAuthenticated, user, signOutUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
