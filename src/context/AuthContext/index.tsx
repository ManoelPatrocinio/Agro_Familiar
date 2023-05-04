import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "../../Types/user.type";
import { api } from "../../hook/useApi";
interface IAuthProviderProps {
  children: React.ReactNode;
}
interface IapiResponse {
  error: boolean;
  message: string;
  user: User;
  token: string;
}

interface ISignInRequestData {
  u_email: string;
  u_password: string;
}
interface IreturnDecodeJWTType {
  user_id: string;
  iat: number;
  exp: number;
  sub: string;
}
interface IAuthContextType {
  isAuthenticated: boolean;
  userLogged: User | null;
  signIn: (user: ISignInRequestData) => void;
}
export const AuthContext = createContext({} as IAuthContextType);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [userLogged, setUseLogged] = useState<User | null>(null);
  const isAuthenticated = !!userLogged;
  function decodeJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodeJWT: IreturnDecodeJWTType = JSON.parse(window.atob(base64));
    return decodeJWT;
  }

  //check if there is a token saved in the Cookies, decode that token to get User_id and make a request to the backend to always return an updated user
  useEffect(() => {
    const { "@PAF:token": token } = parseCookies();
    if (token) {
      const decodeJWT = decodeJwt(token);
      api
        .get(`/entity/${decodeJWT?.user_id}`)
        .then((response) => {
          setUseLogged(response.data.entity);
        })
        .catch((error) => {
          console.error("data", error);
          Swal.fire({
            icon: "error",
            title: "Oppss..",
            text: error.response.data.message,
            showConfirmButton: true,
          });
        });
    }
  }, []);

  // do  requeste to backend with user data, receive a authenticated user, and save the token on cookies
  async function signIn(user: ISignInRequestData) {
    await api
      .post<IapiResponse>("/login", user)
      .then((response) => {
        setCookie(undefined, "@PAF:token", response.data.token, {
          maxAge: 60 * 60 * 24, //24 hours
        });
        setUseLogged(response.data.user);
        Swal.fire({
          icon: "success",
          title: "Success !",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1700);
      })
      .catch((error) => {
        console.error("data", error);
        Swal.fire({
          icon: "error",
          title: "Oppss..",
          text: error.response.data.message,
          showConfirmButton: true,
        });
      });
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, userLogged, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
