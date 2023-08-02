import { ErrorMessage } from "@hookform/error-message";
import { memo, useContext } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { User } from "../Types/user.type";
import { AuthContext } from "../context/AuthContext";
import { api } from "../hook/useApi";

type FormProps = {
  type: "userLogin" | "userRegister";
};

export function FormUserAccess({ type }: FormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({
    mode: "onTouched",
  });

  const { signIn } = useContext(AuthContext);
  async function formSubmit(userFormData: User) {
    if (userFormData.u_full_name && userFormData.u_full_name.length > 0) {
      const newUser: User = {
        ...userFormData,
        u_type: "customer",
      };
      await api
        .post("/register", newUser)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success !",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
    } else {
      await signIn(userFormData);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} className="w-full h-auto">
        {type === "userRegister" ? (
          <>
            <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-6">
              Crie sua conta
            </h4>
            <div className="w-full mb-6">
              <label
                htmlFor="inputAccessUserFullName"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="inputAccessUserFullName"
                className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="Nome Completo"
                {...register("u_full_name", {
                  required: "Informe seu nome completo para continuar",
                  minLength: {
                    value: 6,
                    message: "Este campo deve ter mais de 6 caracteres",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="u_full_name"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
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
            htmlFor="inputFormAccessUserEmail"
            className="form-label inline-block text-sm mb-2 text-gray-700"
          >
            Seu E-mail
          </label>
          <input
            type="email"
            className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
            placeholder="exemplo@gmail.com"
            id="inputFormAccessUserEmail"
            {...register("u_email", {
              required: "Informe seu email para continuar",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Informe um e-mail válido",
              },
              minLength: {
                value: 15,
                message: "O email deve ter mais de 14 caracteres",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="u_email"
            render={({ message }) => (
              <small className="text-red-500 text-xs">{message}</small>
            )}
          />
        </div>

        <div className="w-full relative">
          <label
            htmlFor="inputFormAccessUserPassword"
            className="form-label inline-block text-sm mb-2 text-gray-700"
          >
            Sua senha
          </label>
          <input
            type="password"
            className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
            placeholder="******"
            id="inputFormAccessUserPassword"
            autoComplete="on"
            {...register("u_password", {
              required: "Informe sua senha para continuar",
              minLength: {
                value: 6,
                message: "O senha deve ter no mínimo 6 caracteres",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="u_password"
            render={({ message }) => (
              <small className="text-red-500 text-xs">{message}</small>
            )}
          />
        </div>

        <div className="flex flex-col justify-center  text-center lg:text-left mt-6">
          <button
            type="submit"
            className="w-full inline-block px-7 py-2 bg-palm-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
          >
            {type === "userRegister" ? "Cadastrar" : "Login"}
          </button>
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
