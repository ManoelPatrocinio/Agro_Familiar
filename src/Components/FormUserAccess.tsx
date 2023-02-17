import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useApiPost } from "../hook/useApi";
import { CheckLocalStorage } from "../service/localStorage";
import { Client } from "../Types/client.type";

type FormProps = {
  type: "userLogin" | "userRegister";
};

const InitialUserState ={
  c_full_name : "",
  c_email: "",
  c_password: ""
}
export function FormUserAccess({ type }: FormProps) {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState<Client>(InitialUserState); //state for add new user

  //function for add value input on state
  const setValueFromFormInput = (newValue: any) => {
    setUserFormData((inputValue) => ({ ...inputValue, ...newValue }));
  };

  const formSubmit = async(type: string) => {
   
    if (type === "userRegister"){
      const { apiResponse } = await useApiPost<Client>(
        "/client-register",
        userFormData
      );
      if (apiResponse) {
        Swal.fire({
          icon: "success",
          title: "Success !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      CheckLocalStorage.setLoggedUser(apiResponse!);
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    }else if(type === "userLogin"){
      const { apiResponse } = await useApiPost<Client>(
        "/login",
        userFormData
      );
      if (apiResponse) {
        Swal.fire({
          icon: "success",
          title: "Success !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      CheckLocalStorage.setLoggedUser(apiResponse!);
      setTimeout(() => {
             window.location.reload();
      }, 2000);
    }


  };
  return (
    <>
      <form className="w-full h-auto">
        {type === "userRegister" ? (
          <>
            <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-6">
              Crie sua conta
            </h4>
            <div className="w-full mb-6">
              <label
                htmlFor="idUserEmail"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Nome Completo
              </label>
              <input
                type="text"
                className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="Nome Completo"
                onChange={(e) =>
                  setValueFromFormInput({
                    c_full_name: e.target.value,
                  })
                }
              />
            </div>
          </>
        ) : (
          <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-6">
            Acesse sua conta
          </h4>
        )}

        <div className="w-full mb-6">
          <label
            htmlFor="idUserEmail"
            className="form-label inline-block text-sm mb-2 text-gray-700"
          >
            Seu E-mail
          </label>
          <input
            type="email"
            className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
            placeholder="exemplo@gmail.com"
            id="idUserEmail"
            onChange={(e) =>
              setValueFromFormInput({
                c_email: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="idUserPassword"
            className="form-label inline-block text-sm mb-2 text-gray-700"
          >
            Sua senha
          </label>
          <input
            type="password"
            className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
            placeholder="******"
            id="idUserPassword"
            onChange={(e) =>
              setValueFromFormInput({
                c_password: e.target.value,
              })
            }
          />
        </div>

        {type === "userLogin" && (
          <a href="#!" className="w-full text-left text-gray-800 text-sm ">
            Esqueceu sua senha?
          </a>
        )}

        <div className="flex flex-col justify-center  text-center lg:text-left mt-6">
          <button
            type="button"
            onClick={() => formSubmit(type)}
            className="w-full inline-block px-7 py-2 bg-palm-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
          >
            {type === "userRegister" ? "Cadastrar" : "Login"}
          </button>

          {/* <div className="hidden  w-full  flex-row items-center justify-around ">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-palm-700 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </button>

            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-palm-700 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                />
              </svg>
            </button>

            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-palm-700 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                />
              </svg>
            </button>
          </div> */}
          {type === "userLogin" && (
            <>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0 text-gray-400">
                  Or
                </p>
              </div>
              <p className="text-xs md:text-sm  font-semibold  mb-0 text-gray-400">
                Ainda não tem uma conta ?
                <button
                  type="button"
                  className="text-palm-500 hover:text-palm-700 focus:text-palm-700 ml-2 transition duration-200 ease-in-out"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPreviewRegister"
                >
                  Registre-se
                </button>
              </p>
            </>
          )}
        </div>
      </form>
    </>
  );
}
