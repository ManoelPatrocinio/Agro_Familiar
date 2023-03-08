import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import { User } from "../../Types/user.type";
import { useApiPost } from "../../hook/useApi";
import { CheckLocalStorage } from "../../service/localStorage";

const InitialUserState: User = {
  u_type: "farmer",
  u_full_name: "",
  u_email: "",
  u_password: "",
  u_president_name: "",
  u_entity_name: "",
  u_CNPJ_CPF: "",
  u_UF: "",
  u_city: "",
  u_district: "",
  u_street: "",
  u_number: "",
  u_main_contact: "",
  u_secondary_contact: "",
};

export function RegisterFarmer() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState<User>(InitialUserState);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  //function for add value input on state
  const setValueFromFormInput = (newValue: any) => {
    setFormData((inputValue) => ({ ...inputValue, ...newValue }));
  };

  const formSubmit = async () => {
    console.log("FormData", FormData);

    const { apiResponse } = await useApiPost<User>("/register", FormData);
    if (apiResponse != null) {
      Swal.fire({
        icon: "success",
        title: "Success !",
        showConfirmButton: false,
        timer: 1500,
      });
      CheckLocalStorage.setLoggedUser(apiResponse!);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <Carrousel />
      <main className="px-8 md:px-20">
        <SectionTitle
          title="Cadastro de Produtor "
          className="my-6 w-full font-semibold md:font-normal"
        ></SectionTitle>
        {!toggleForm ? (
          <form className="w-full md:w-[80%] h-full md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto">
            <div className="grid grid-col-2 md:grid-cols-2  md:gap-8">
              <div className="form-group mb-6">
                <label
                  htmlFor="inputRegisterEntityName"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nome da completo
                  <span className="text-red-500 font-bold"> *</span>:
                </label>
                <input
                  type="text"
                  className="form-control
                    
                    w-full
                    px-3
                    py-1.5
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputRegisterEntityName"
                  aria-describedby="entityName"
                  placeholder="Digite aqui"
                  {...register("inputRegisterEntityName", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 6,
                      message: "Este campo deve ter mais de 6 caracteres",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_full_name: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="inputRegisterEntityName"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  htmlFor="inputRegisterEntityCnpj"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  CPF <span className="text-red-500 font-bold"> *</span>:
                </label>
                <input
                  type="text"
                  className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputRegisterEntityCnpj"
                  aria-describedby="EntityCnpj"
                  placeholder="XXX.XXX.XXX-XX"
                  max={14}
                  maxLength={14}
                  {...register("inputRegisterEntityCnpj", {
                    required: "Informe um CPF válido para continuar",
                    minLength: {
                      value: 11,
                      message: "Este campo deve ter pelo menos 14 caracteres",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_CNPJ_CPF: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="inputRegisterEntityCnpj"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6">
                <label
                  htmlFor="iputRegisterEntityCity"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Cidade
                  <span className="text-red-500 font-bold"> *</span>:
                </label>
                <input
                  type="text"
                  className="form-control
                    
                    w-full
                    px-3
                    py-1.5
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="iputRegisterEntityCity"
                  maxLength={40}
                  max={40}
                  aria-describedby="entity City"
                  placeholder="Digite aqui"
                  {...register("iputRegisterEntityCity", {
                    required: "Campo Obrigatório",
                    minLength: {
                      value: 3,
                      message: "Caracteres insuficiente",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_city: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="iputRegisterEntityCity"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="w-full md:w-[22%] min-w-[132px] md:mr-[4%] form-group mb-6">
                <label
                  htmlFor="inputRegisterEntityDistrict"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Bairro
                  <span className=" text-xs text-gray-400"> (opcional)</span>:
                </label>
                <input
                  type="text"
                  className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputRegisterEntityDistrict"
                  aria-describedby="inputRegisterEntityDistrict"
                  placeholder="Digite aqui"
                  max={40}
                  maxLength={40}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_district: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full md:w-[30%]  form-group mb-6">
                <label
                  htmlFor="inputRegisterEntityStreet"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Rua{" "}
                  <span className=" text-xs text-gray-400"> (opcional)</span>:
                </label>
                <input
                  type="text"
                  className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputRegisterEntityStreet"
                  placeholder="Digite aqui"
                  max={70}
                  maxLength={70}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_street: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6 ">
                <label
                  htmlFor="inputRegisterEntityNumber"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Número{" "}
                  <span className=" text-xs text-gray-400"> (opcional)</span>:
                </label>
                <input
                  type="text"
                  className="form-control          
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputRegisterEntityNumber"
                  max={6}
                  maxLength={6}
                  {...register("inputRegisterEntityNumber", {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Por favor, apenas números",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_number: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="inputRegisterEntityNumber"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="w-full md:w-[23%] form-group mb-6 ">
                <label
                  htmlFor="inputRegisterEntityUf"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  UF
                  <span className="text-red-500 font-bold"> *</span>:
                </label>
                <div className=" w-full">
                  <select
                    className="form-select appearance-none
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="select entity Uf"
                    id="inputRegisterEntityUf"
                    {...register("inputRegisterEntityUf", {
                      required: "Campo obrigatório",
                    })}
                    onChange={(e) =>
                      setValueFromFormInput({
                        u_UF: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espirito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="inputRegisterEntityUf"
                    render={({ message }) => (
                      <small className="text-red-500 text-xs">{message}</small>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6 ">
                <label
                  htmlFor="inputEntityMainPhone"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nº Whatsapp
                  <span className="text-red-500 font-bold"> *</span>:
                </label>
                <input
                  type="text"
                  className=" input-number-arrow-hidden
                  form-control  
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputEntityMainPhone"
                  max={12}
                  maxLength={12}
                  placeholder="(DDD) 9XXXX-XXXX"
                  {...register("inputEntityMainPhone", {
                    required: "Campo Obrigatório",
                    minLength: {
                      value: 11,
                      message: "Números insuficiente",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Por favor, apenas números",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_main_contact: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="inputEntityMainPhone"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="w-full md:w-[23%] form-group mb-6 ">
                <label
                  htmlFor="inputRegisterEntitySecondaryPhone"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nº Whatsapp 2
                  <span className=" text-xs text-gray-400"> (opcional)</span>:
                </label>
                <input
                  type="text"
                  className="form-control
                    input-number-arrow-hidden
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="inputRegisterEntitySecondaryPhone"
                  placeholder="(DDD) 9XXXX-XXXX"
                  max={12}
                  maxLength={12}
                  aria-describedby="entity phone 2"
                  {...register("inputRegisterEntitySecondaryPhone", {
                    minLength: {
                      value: 12,
                      message: "Números insuficiente",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Por favor, apenas números",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_secondary_contact: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="inputRegisterEntitySecondaryPhone"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center  items-center  my-4 ">
              <button
                type="button"
                className="
                
                w-full
                md:w-1/4
                px-6
                py-2.5
                bg-palm-700
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-palm-500 hover:shadow-lg
                focus:bg-palm-500 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-palm-500 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                onClick={handleSubmit(() => setToggleForm(!toggleForm))}
              >
                Próximo
              </button>
            </div>

            <p className="w-full text-center text-sm text-gray-500 mt-3">
              {" "}
              Etapa <span className="text-palm-700 font-semibold"> 1 </span> de
              2
            </p>
          </form>
        ) : (
          <form className="w-full md:w-[70%] h-full flex flex-col items-center  md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto">
            <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-3">
              Dados para acesso
            </h4>
            <p className="w-full text-center text-sm text-gray-500 mb-6">
              Lembre-se bem desses dados, eles serão necessários para acessar
              sua contra neste Portal.
            </p>

            <div className="w-full mb-6">
              <label
                htmlFor="inputRegisterUserEmail"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Seu E-mail
              </label>
              <input
                type="email"
                className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="exemplo@gmail.com"
                id="inputRegisterUserEmail"
                {...register("inputRegisterUserEmail", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Informe um e-mail válido",
                  },
                  minLength: {
                    value: 15,
                    message: "O email deve ter mais de 14 caracteres",
                  },
                })}
                onChange={(e) =>
                  setValueFromFormInput({
                    u_email: e.target.value,
                  })
                }
              />
              <ErrorMessage
                errors={errors}
                name="inputRegisterUserEmail"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>

            <div className="w-full mb-4">
              <label
                htmlFor="inputRegisterUserPassword"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Sua senha
              </label>
              <input
                type="password"
                className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="******"
                id="inputRegisterUserPassword"
                {...register("inputRegisterUserPassword", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 6,
                    message: "O senha deve ter no mínimo 6 caracteres",
                  },
                })}
                onChange={(e) =>
                  setValueFromFormInput({
                    u_password: e.target.value,
                  })
                }
              />
              <ErrorMessage
                errors={errors}
                name="inputRegisterUserPassword"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>

            <div className="flex flex-col justify-center  text-center lg:text-left mt-6">
              <button
                type="button"
                onClick={handleSubmit(() => formSubmit())}
                className="w-full inline-block px-7 py-2 bg-palm-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cadastrar
              </button>
            </div>
            <p className="w-full text-center text-sm text-gray-500 my-3">
              {" "}
              Etapa <span className="text-palm-700 font-semibold"> 2 </span> de
              2
            </p>
            <button
              onClick={() => setToggleForm(!toggleForm)}
              className="block relative text-center text-sm text-gray-500 mx-auto"
            >
              Voltar
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
