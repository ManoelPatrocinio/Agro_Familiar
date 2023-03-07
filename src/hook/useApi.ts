import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const backendUrl = import.meta.env.VITE_BACKEND_PORT;

export const api = axios.create({
  baseURL: backendUrl,
});


// // hook from POST request Api

export async function useApiPost<T = unknown>(url: string, data: unknown) {
  let apiResponse: T | null = null;

  await api
    .post(url, data)
    .then((response) => {
      apiResponse = response.data;
    })
    .catch((error) => {
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que sai do alcance de 2xx
        console.error("data", error);
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
        // http.ClientRequest no node.js
        Swal.fire({
          icon: "error",
          title:"Oppss",
            text: "Não foi prossível realizar esse pedido, tente mais tarde",
          showConfirmButton: true,
        });
        //console.error(error.request);
      } else {
        // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
        Swal.fire({
          icon: "error",
          title: "Erro na requisição, tente novamente",
          showConfirmButton: true,
        });
        console.error("Error", error.message);
      }
      console.error(error.config);
    });
  return { apiResponse };
}

// hook from GET request Api
export function useApiGet<T = unknown>(url: string) {
  //let apiResponse:(User | null) = null
  const [apiGetResponse, setApiGetResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setApiGetResponse(response.data);
      })
      .catch((error) => {
       
        console.error(error);
        setError(error)
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, []);

  return { apiGetResponse,error,isLoading };
}
