import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import { useApiPost } from "../../hook/useApi";
import { CheckLocalStorage } from "../../service/localStorage";
import { User } from "../../Types/user.type";


const InitialUserState:User = {
  u_type:"customer",
  u_full_name: "",
  u_email: "",
  u_password: "",
  u_president_name:"",
  u_entity_name : "",
  u_CNPJ_CPF: "",
  u_UF:"",
  u_city:"",
  u_district:"",
  u_street :"",
  u_number :"",
  u_main_contact :"",
  u_secondary_contact:"",
};

export function RegisterEntity() {
  const navigate = useNavigate()
  const [FormData, setFormData] = useState<User>(InitialUserState); 
  const [toggleForm, setToggleForm] = useState<"step1" | "step2">("step1");
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
      
        // const { apiResponse } = await useApiPost<User>("/register", FormData);
        // if (apiResponse) {
        //   Swal.fire({
        //     icon: "success",
        //     title: "Success !",
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        // }
        // CheckLocalStorage.setLoggedUser(apiResponse!);
        // setTimeout(() => {
        //   navigate("/")
        // }, 2000);
 
        
      
    };
  const validadeFormStep1 = () => {
    setToggleForm("step2")
  };

  return (
    <>
      <Header />
      <Carrousel />
      <main className="px-8 md:px-20">
        <SectionTitle
          title="Cadastro de Organização"
          className="my-6 w-full font-semibold md:font-normal"
        ></SectionTitle>
        {toggleForm === "step1" ? (
          <form className="w-full md:w-[80%] h-full md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto">
            <h3 className=" hidden md:block text-center text-sm md:text-lg text-palm-700 mb-2">
              Formulário de cadastro
            </h3>
            <p className="w-full text-center text-sm text-gray-400 mb-8 ">
              Preencha o formulário com os dados da Associação ou Cooperativa
              que você é responsável.
            </p>
            <div className="form-group mb-6 flex justify-start">
              <label className="form-label inline-block mb-2 text-palm-700 mr-3">
                Tipo de Organização{" "}
                <span className="text-red-500 font-bold"> *</span>:
              </label>

              <div className="flex justify-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input  appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inputRegisteEntityTypeAssoc"
                    value={"assoc"}
                    onChange={(e) =>
                      setValueFromFormInput({
                        u_type: e.target.value,
                      })
                    }
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 cursor-pointer"
                    htmlFor="inputRegisteEntityTypeAssoc"
                  >
                    Associação
                  </label>
                </div>
                <div className="form-check form-check-inline ">
                  <input
                    className="form-check-input  appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inputRegisteEntityTypeCoop"
                    value={"coop"}
                    onChange={(e) =>
                      setValueFromFormInput({
                        u_type: e.target.value,
                      })
                    }
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 cursor-pointer"
                    htmlFor="inputRegisteEntityTypeCoop"
                  >
                    Cooperativa
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group mb-6 ">
              <label
                htmlFor="registerPresidentName"
                className="form-label inline-block mb-2 text-palm-700"
              >
                Nome do(a) Presidente{" "}
                <span className="text-red-500 font-bold"> *</span>:
              </label>

              <input
                type="text"
                className="
                  form-control
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
                id="registerPresidentName"
                aria-describedby="president Name"
                placeholder="Nome Completo"
                {...register("registerPresidentName", {
                  required:
                    "Informe o nome completo do(a) presitente(a) da organização para continuar",
                  minLength: {
                    value: 6,
                    message: "Este campo deve ter mais de 6 caracteres",
                  },
                })}
                onChange={(e) =>
                  setValueFromFormInput({
                    u_president_name: e.target.value,
                  })
                }
              />
              <ErrorMessage
                errors={errors}
                name="registerPresidentName"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>
            <div className="grid grid-col-2 md:grid-cols-2  md:gap-8">
              <div className="form-group mb-6">
                <label
                  htmlFor="RegisterEntityName"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nome da Organização
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
                  id="RegisterEntityName"
                  aria-describedby="entityName"
                  placeholder="Digite aqui"
                  {...register("RegisterEntityName", {
                    required: "Informe o nome da Organização para continuar",
                    minLength: {
                      value: 6,
                      message: "Este campo deve ter mais de 6 caracteres",
                    },
                  })}
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_entity_name: e.target.value,
                    })
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="RegisterEntityName"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="form-group mb-6">
                <label
                  htmlFor="registerEntityCnpj"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  CNPJ
                  <span className="text-red-500 font-bold"> *</span>:
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
                  id="registerEntityCnpj"
                  aria-describedby="EntityCnpj"
                  placeholder="Digite aqui"
                  max={14}
                  maxLength={14}
                  {...register("registerEntityCnpj", {
                    required: "Informe um CNPJ válido para continuar",
                    minLength: {
                      value: 14,
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
                  name="registerEntityCnpj"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6">
                <label
                  htmlFor="entityCity"
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
                  id="entityCity"
                  aria-describedby="entityCity"
                  placeholder="Digite aqui"
                  {...register("entityCity", {
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
                  name="entityCity"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="w-full md:w-[22%] md:mr-[4%] form-group mb-6">
                <label
                  htmlFor="entityDistrict"
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
                  id="entityDistrict"
                  aria-describedby="entityDistrict"
                  placeholder="Digite aqui"
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_district: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full md:w-[30%]  form-group mb-6">
                <label
                  htmlFor="entityStreet"
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
                  id="entityStreet"
                  aria-describedby="entityStreet"
                  placeholder="Digite aqui"
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_street: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-[23%] mr-[3%] form-group mb-6 ">
                <label
                  htmlFor="entityNumber"
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
                  id="entityNumber"
                  aria-describedby="emailHelp124"
                  {...register("entityNumber", {
                    required: "Campo Obrigatório",
                    minLength: {
                      value: 1,
                      message: "Caracteres insuficiente",
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
                  name="entityNumber"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="w-full md:w-[23%] form-group mb-6 ">
                <label
                  htmlFor="selectUf"
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
                    id="selectUf"
                    {...register("productCategory", {
                      required: "Informe a categoria do produto para continuar",
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
                    name="selectUf"
                    render={({ message }) => (
                      <small className="text-red-500 text-xs">{message}</small>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-[23%] mr-[3%] form-group mb-6 ">
                <label
                  htmlFor="entityMainphone"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nº Whatsapp 1
                  <span className="text-red-500 font-bold"> *</span>:
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
                  id="entityMainphone"
                  aria-describedby="input  entity cellphone"
                  max={15}
                  maxLength={15}
                  {...register("entityMainphone", {
                    required: "Campo Obrigatório",
                    minLength: {
                      value: 12,
                      message: "Números insuficiente",
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
                  name="entityMainphone"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
              <div className="w-full md:w-[23%] form-group mb-6 ">
                <label
                  htmlFor="entityphoneOP"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nº Whatsapp 2
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
                  id="entityphoneOP"
                  max={15}
                  maxLength={15}
                  aria-describedby="entityphone"
                  onChange={(e) =>
                    setValueFromFormInput({
                      u_secondary_contact: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col justify-center  items-center  my-4 ">
              <button
                type="submit"
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
                onClick={handleSubmit(() => validadeFormStep1())}
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
          <form className="w-full md:w-[70%] h-full md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto">
            <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-6">
              Crie sua conta
            </h4>
            <div className="w-full mb-6">
              <label
                htmlFor="userFullName"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="userFullName"
                className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="Nome Completo"
                {...register("userFullName", {
                  required: "Informe seu nome completo para continuar",
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
                name="userFullName"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>

            <div className="w-full mb-6">
              <label
                htmlFor="inputUserEmailLogin"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Seu E-mail
              </label>
              <input
                type="email"
                className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="exemplo@gmail.com"
                id="inputUserEmailLogin"
                {...register("inputUserEmailLogin", {
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
                onChange={(e) =>
                  setValueFromFormInput({
                    u_email: e.target.value,
                  })
                }
              />
              <ErrorMessage
                errors={errors}
                name="inputUserEmailLogin"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="inputUserPasswordLogin"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Sua senha
              </label>
              <input
                type="password"
                className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="******"
                value=""
                id="FormAccessUserPassword"
                {...register("FormAccessUserPassword", {
                  required: "Informe sua senha para continuar",
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
                name="inputUserPasswordLogin"
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
            <p className="w-full text-center text-sm text-gray-500 mt-3">
              {" "}
              Etapa <span className="text-palm-700 font-semibold"> 2 </span> de
              2
            </p>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
