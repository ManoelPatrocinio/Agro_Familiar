import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import { User } from "../../Types/user.type";
import { api } from "../../hook/useApi";
import { useState } from "react";
import { cnpj } from "cpf-cnpj-validator";
import ReactInputMask from "react-input-mask";


export function RegisterEntity() {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();

  async function formSubmit(FormData: User) {
    if (!FormData.u_type || FormData.u_type.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Escolha o Tipo da Organização",
      });
    }
    const cpfFromated =      FormData!.u_CNPJ_CPF!.replace(/[^0-9]+/g,'');
    const number_main =      FormData!.u_main_contact!.replace(/[^0-9]+/g,'');
    const number_secondary = FormData.u_secondary_contact ? FormData.u_secondary_contact.replace(/[^0-9]+/g,''): ""

    if(cnpj.isValid(FormData!.u_CNPJ_CPF!)){
      FormData!.u_CNPJ_CPF! = cpfFromated
      FormData!.u_main_contact = number_main
      FormData.u_secondary_contact = number_secondary

      await api
      .post("/register", FormData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success !",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/");
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
    }else{
      Swal.fire({
        icon: "info",
        title: "Oppss..",
        text: "O CNPJ que você informou não é válido, verifique e tente novamente",
        showConfirmButton: true,
      });
    }


  
  }

  return (
    <>
      <Header setSearch={() => {}} ItemSearched={""} />
      <Carrousel />
      <main className="px-8 md:px-20">
        <SectionTitle
          title="Cadastro de Organização"
          className="my-6 w-full font-semibold md:font-normal"
        ></SectionTitle>
        <form className="w-full md:w-[80%] h-full md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto">
          {!formStep ? (
            <>
              <p className="w-full text-center text-sm text-gray-400 mb-10 ">
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
                      id="inputRegisteEntityTypeAssoc"
                      value={"assoc"}
                      {...register("u_type", {})}
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
                      id="inputRegisteEntityTypeCoop"
                      value={"coop"}
                      {...register("u_type", {})}
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

              <div className="grid grid-col-2 md:grid-cols-2  md:gap-8">
                <div className="form-group mb-6">
                  <label
                    htmlFor="inputRegisterEntityName"
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
                    id="inputRegisterEntityName"
                    aria-describedby="entityName"
                    placeholder="Digite aqui"
                    {...register("u_full_name", {
                      required: "Campo obrigatório",
                      minLength: {
                        value: 6,
                        message: "Este campo deve ter mais de 6 caracteres",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_entity_name"
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
                    CNPJ
                    <span className="text-red-500 font-bold"> *</span>:
                  </label>
                  <ReactInputMask
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
                    mask='99.999.999/9999.99'

                    placeholder="XX.XXX.XXX/XXXX.XX"
                
                    {...register("u_CNPJ_CPF", {
                      required: "Informe um CNPJ válido para continuar",
                      minLength: {
                        value: 14,
                        message: "Este campo deve ter 14 caracteres",
                      },
              
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_CNPJ_CPF"
                    render={({ message }) => (
                      <small className="text-red-500 text-xs">{message}</small>
                    )}
                  />
                </div>
              </div>
              <div className="form-group mb-6 ">
                <label
                  htmlFor="inputRegisterPresidentName"
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
                  id="inputRegisterPresidentName"
                  aria-describedby="president Name"
                  placeholder="Nome Completo"
                  {...register("u_president_name", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 6,
                      message: "Este campo deve ter mais de 6 caracteres",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="u_president_name"
                  render={({ message }) => (
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
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
                    {...register("u_city", {
                      required: "Campo Obrigatório",
                      minLength: {
                        value: 3,
                        message: "Caracteres insuficiente",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_city"
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
                    {...register("u_district", {
                      minLength: {
                        value: 3,
                        message: "Caracteres insuficiente",
                      },
                      max: 40,
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_district"
                    render={({ message }) => (
                      <small className="text-red-500 text-xs">{message}</small>
                    )}
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
                    {...register("u_street", {
                      minLength: {
                        value: 3,
                        message: "Caracteres insuficiente",
                      },
                      max: 70,
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_street"
                    render={({ message }) => (
                      <small className="text-red-500 text-xs">{message}</small>
                    )}
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
                    {...register("u_number", {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Por favor, apenas números",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_number"
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
                      {...register("u_UF", {
                        required: "Campo obrigatório",
                      })}
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
                      name="u_UF"
                      render={({ message }) => (
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
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
                  <ReactInputMask
                    type="text"
                    className="
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
                    mask='(99) 99999-9999'
               
                    placeholder="(XX) 9XXXX-XXXX"
                    {...register("u_main_contact", {
                      required: "Campo Obrigatório",
                      minLength: {
                        value: 11,
                        message: "Contato incompleto",
                      }
                     
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_main_contact"
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
                  <ReactInputMask
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
                    id="inputRegisterEntitySecondaryPhone"
                    placeholder="(XX) 9XXXX-XXXX"
                    mask='(99) 99999-9999'
                  
                    aria-describedby="entity phone 2"
                    {...register("u_secondary_contact", {
                      minLength: {
                        value: 11,
                        message: "Números insuficiente",
                      }
                     
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="u_secondary_contact"
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
                  onClick={handleSubmit(() => setFormStep((old) => !old))}
                >
                  Próximo
                </button>
              </div>

              <p className="w-full text-center text-sm text-gray-500 mt-3">
                {" "}
                Etapa <span className="text-palm-700 font-semibold">
                  {" "}
                  1{" "}
                </span>{" "}
                de 2
              </p>
            </>
          ) : (
            <div className="w-full md:w-[70%] h-full flex flex-col items-center rounded   md:py-10 md:p-10  md:mx-auto">
              <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-3">
                Dados para acesso
              </h4>
              <p className="w-full text-center text-sm text-gray-500 mb-6">
                Lembre-se bem desses dados, eles serão necessários para acessar
                sua contra neste Portal
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
                  defaultValue={""}
                  {...register("u_email", {
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
                />
                <ErrorMessage
                  errors={errors}
                  name="u_email"
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
                  defaultValue=""
                  {...register("u_password", {
                    required: "Campo obrigatório",
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
                  onClick={handleSubmit(formSubmit)}
                  className="w-full inline-block px-7 py-2 bg-palm-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Cadastrar
                </button>
              </div>
              <p className="w-full text-center text-sm text-gray-500 my-3">
                {" "}
                Etapa <span className="text-palm-700 font-semibold">
                  {" "}
                  2{" "}
                </span>{" "}
                de 2
              </p>
              <button
                onClick={() =>setFormStep(old => !old) }
                className="relative text-center text-sm text-gray-500 mx-auto"
              >
                Voltar
              </button>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </>
  );
}
