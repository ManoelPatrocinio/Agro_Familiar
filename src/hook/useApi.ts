import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Product } from "../Types/product.type";
import { User } from "../Types/user.type";
interface IapiResponse {
  error: boolean;
  message: string;
  product?: Product;
  user?: User;
}
const backendUrl = import.meta.env.VITE_BACKEND_PORT;

export const api = axios.create({
  baseURL: backendUrl,
});

// // hook from POST request Api

export async function useApiPost<T = unknown>(url: string, data: unknown) {
  let apiResponse: IapiResponse | null = null;

  await api
    .post(url, data)
    .then((response) => {
      apiResponse = response.data;
      Swal.fire({
        icon: "success",
        title: "Success !",
        showConfirmButton: false,
        timer: 1500,
      });
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
  return { apiResponse };
}

// // hook from PUT request Api
export async function useApiPut<T = unknown>(url: string, data: unknown) {
  let apiResponse: T | null = null;

  await api
    .put(url, data)
    .then((response) => {
      apiResponse = response.data;
    })
    .catch((error) => {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      }
    });
  return { apiResponse };
}
// hook from GET request Api
export function useApiGet<T = unknown>(url: string) {
  //let apiResponse:(User | null) = null
  const [apiGetResponse, setApiGetResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setApiGetResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { apiGetResponse, error, isLoading };
}
