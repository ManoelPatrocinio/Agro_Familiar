import { ErrorMessage } from "@hookform/error-message";
import { ArrowRight, Question } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { DropzoneInput } from "../../../Components/Dropzone";
import { ImgPreview } from "../../../Components/ImgPreview";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { Load_spinner } from "../../../Components/load_spinner";
import { User } from "../../../Types/user.type";
import Logo from "../../../assets/images/Logo.png";
import Star from "../../../assets/images/star_icon.png";
import { api } from "../../../hook/useApi";
import {
  FirebaseDeleteFile,
  FirebaseUploadFile,
} from "../../../service/firebase";
import Cookies from "js-cookie";
import ReactInputMask from "react-input-mask";

interface formEditUser extends User {
  u_newPassword: string;
}

export function ManageProfile() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [toggleForm, setToggleForm] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<formEditUser>();

  const {
    data: entityData,
    isFetching,
    error,
  } = useQuery<User>(
    ["manageProfile", entityId],
    async () => {
      const response = await api.get(`/entity/${entityId}`);
      return response.data.entity;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oppss",
      text: "Desculpe, não foi possível  exibir suas informações, tente novamente, por favor",
    });
  }

  async function sendformWithBasicUserData(FormData: formEditUser | User) {

    FormData!.u_main_contact =  FormData!.u_main_contact!.replace(/[^0-9]+/g,'');
    FormData.u_secondary_contact =  FormData.u_secondary_contact ? FormData.u_secondary_contact.replace(/[^0-9]+/g,''): ""

    await api
      .put(`/admin/update-user/${entityId}`, FormData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success !",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          queryClient.invalidateQueries(["manageProfile"]);
          reset();
        }, 2000);
      })
      .catch((error) => {
        console.error("data", error);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: true,
        });
      });
  }

  async function formEditUserAccess(userAccessData: formEditUser) {
    await api
      .put(`/admin/update-user-access-data/${entityId}`, userAccessData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success !",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          Cookies.remove("token");
          queryClient.invalidateQueries(["manageProfile"]);
          window.location.reload();
          navigate("/");
        }, 1800);
      })
      .catch((error) => {
        console.error("error on Edit User Access", error);
        Swal.fire({
          icon: "error",

          text: error.response.data.message,
          showConfirmButton: true,
        });
      });
  }

  const handleDeleteUserImg = async (imgRef: string) => {
    let imgName: string[];
    let newUserData: User;

    if (entityData?.u_cover_photo === imgRef) {
      const splits = entityData?.u_cover_photo!.split("%2F");
      imgName = splits[1].split("?alt");

      newUserData = {
        ...entityData!,
        u_cover_photo: "",
      };
    }
    if (entityData?.u_img_profile === imgRef) {
      const splits = entityData?.u_img_profile!.split("%2F");
      imgName = splits[1].split("?alt");
      newUserData = {
        ...entityData!,
        u_img_profile: "",
      };
    }
    await FirebaseDeleteFile(imgName![0], "userImages")
      .then(() => {
        sendformWithBasicUserData(newUserData as User);
      })
      .catch((err) => {
        console.log("error on delete image on forebase");
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível excluir essa imagem, tente novamente, por favor",
        });
      });
  };
  const handleUpdateUserImg = async (file: File, whereSave?: string) => {
    let newUserData;
    const { url } = await FirebaseUploadFile(file, "/userImages");
    if (!url) {
      Swal.fire({
        icon: "error",
        title: "Oppss",
        text: "Desculpe, não foi possível carregar essa imagem, tente novamente, por favor",
      });
    }

    if (whereSave === "coverPhoto") {
      newUserData = {
        ...entityData,
        u_cover_photo: url,
      };
    } else if (whereSave === "profile") {
      newUserData = {
        ...entityData,
        u_img_profile: url,
      };
    }

    sendformWithBasicUserData(newUserData as User);
  };

  return (
    <>
      <header className="w-full md:hidden h-auto px-3 flex justify-between items-end">
        <Question size={40} color="#89B045" />
        <a href="/" className="w-[9rem]  mt-4">
          {" "}
          <img src={Logo} alt="Logo" className="w-full object-cover" />
        </a>
        <Menu_Sidebar type="admin" />
      </header>

      <div className="flex min-h-screen">
        <div className="hidden md:block w-[25%] min-h-full border-r border-gray-200 ">
          <MenuOfDashboard />
        </div>
        <div className="w-full md:w-[75%] h-full ">
          {isFetching && (
            <Load_spinner
              adicionalClass="w-full h-screen"
              message="Carregando suas informações ..."
            />
          )}
          {entityData && (
            <main className="w-full h-full  flex flex-col justify-between items-start pt-8 md:pt-0">
              <div className="w-full h-[35vh] md:h-[15rem] md:min-h-[40vh] relative ">
                {!entityData.u_cover_photo ? (
                  <div className="w-full h-full">
                    <DropzoneInput
                      onUpload={handleUpdateUserImg}
                      typeFile="image"
                      text="Clique ou arraste sua imagem de capa aqui..."
                      classNameAdditional={
                        " bg-gray-100 border border-dashed border-gray-400  mb-4 md:mb-0 "
                      }
                      whereSave="coverPhoto"
                    />
                  </div>
                ) : (
                  <ImgPreview
                    imgName={entityData.u_cover_photo}
                    url={entityData.u_cover_photo}
                    deleteFile={handleDeleteUserImg}
                    classNameAdditionalForImg="w-full h-full "
                  />
                )}
                <div className=" w-full absolute top-[7rem] md:top-[87%] flex flex-col md:flex-row  justify-between items-center  md:px-8 ">
                  <div className="flex flex-col md:flex-row items-center md:items-end">
                    <div className="w-[6rem] h-[6rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%] ">
                      {entityData.u_img_profile ? (
                        <ImgPreview
                          imgName={entityData.u_img_profile}
                          url={entityData.u_img_profile}
                          deleteFile={handleDeleteUserImg}
                          classNameAdditionalForImg="w-full h-full rounded-full"
                        />
                      ) : (
                        <DropzoneInput
                          onUpload={handleUpdateUserImg}
                          typeFile="image"
                          text="imagem de perfil"
                          classNameAdditional={
                            " bg-gray-100 border border-dashed border-gray-400 rounded mb-4 md:mb-0 rounded-full"
                          }
                          whereSave="profile"
                        />
                      )}
                    </div>
                    <div className=" text-center md:text-left px-2 md:px-4 py-4">
                      <h4 className="text-sm md:text-lg  text-palm-700 font-display font-semibold md:mb-2  ">
                        {entityData?.u_full_name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-400 font-semibold md:mb-2">
                        {" "}
                        {entityData?.u_city}
                      </p>
                      <div className="flex w-1/4 items-center justify-start">
                        <span className="text-xs md:text-sm text-gray-400">
                          {" "}
                          4.6{" "}
                        </span>
                        <img
                          src={Star}
                          className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
                        />
                        <span className="text-xs md:text-xs text-gray-400">
                          (202)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {!toggleForm ? (
                <form
                  onSubmit={handleSubmit(sendformWithBasicUserData)}
                  className="w-full  h-full px-4 md:py-10 md:p-10  mt-[11rem] md:mt-[8rem]"
                >
                  <h4 className="w-full text-center md:text-left  text-md md:text-lg font-semibold text-palm-700 mb-1">
                    Informações de registro
                  </h4>
                  <p className="w-full text-center md:text-left text-xs md:text-sm  text-gray-400 mb-10">
                    Caso deseje alterar alguma informação, selecione o campo,
                    insirar a nova informação e ao final, clique no botão
                    salvar.
                  </p>
                  <div className="grid grid-col-2 md:grid-cols-2  md:gap-8">
                    <div className="form-group mb-6">
                      <label
                        htmlFor="inputEditUserFullName"
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
                          focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                        id="inputEditUserFullName"
                        placeholder="Digite aqui"
                        defaultValue={entityData?.u_full_name}
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
                        name="u_full_name"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="form-group mb-6">
                      <label
                        htmlFor="inputEditUserCNPJCPF"
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
                          focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                        id="inputEditUserCNPJCPF"
                        placeholder="XXX.XXX.XXX-XX"
                        max={14}
                        maxLength={14}
                        defaultValue={entityData.u_CNPJ_CPF}
                        {...register("u_CNPJ_CPF", {
                          required: "Informe um CPF válido para continuar",
                          minLength: {
                            value: 11,
                            message:
                              "Este campo deve ter pelo menos 14 caracteres",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="u_CNPJ_CPF"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col md:flex-row items-center ">
                    <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6">
                      <label
                        htmlFor="inputEditUserCity"
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
                          focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                        id="inputEditUserCity"
                        maxLength={40}
                        max={40}
                        defaultValue={entityData.u_city}
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
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-[22%] min-w-[132px] md:mr-[4%] form-group mb-6">
                      <label
                        htmlFor="inputEditUserDistrict"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Bairro
                        <span className=" text-xs text-gray-400">
                          {" "}
                          (opcional)
                        </span>
                        :
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
                          focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                        id="inputEditUserDistrict"
                        placeholder="Digite aqui"
                        defaultValue={entityData.u_district}
                        max={40}
                        maxLength={40}
                        {...register("u_district", {
                          minLength: {
                            value: 2,
                            message: "Caracteres insuficiente",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="u_district"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-[30%]  form-group mb-6">
                      <label
                        htmlFor="inputRegisterEntityStreet"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Rua{" "}
                        <span className=" text-xs text-gray-400">
                          {" "}
                          (opcional)
                        </span>
                        :
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
                          focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                        id="inputRegisterEntityStreet"
                        placeholder="Digite aqui"
                        max={70}
                        maxLength={70}
                        defaultValue={entityData.u_street}
                        {...register("u_street", {
                          minLength: {
                            value: 2,
                            message: "Caracteres insuficiente",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="u_street"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col md:flex-row items-center ">
                    <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6 ">
                      <label
                        htmlFor="inputEditUserNumber"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Número{" "}
                        <span className=" text-xs text-gray-400">
                          {" "}
                          (opcional)
                        </span>
                        :
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
                          focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                        id="inputEditUserNumber"
                        defaultValue={entityData.u_number}
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
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-[23%] form-group mb-6 ">
                      <label
                        htmlFor="inputEditUserUf"
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
                            focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                          aria-label="select entity Uf"
                          id="inputRegisterEntityUf"
                          defaultValue={entityData.u_UF}
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
                        htmlFor="inputUserMainPhone"
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
                        mask="(99) 99999-9999"
                        placeholder="(XX) 9XXXX-XXXX"
                        {...register("u_main_contact", {
                          required: "Campo Obrigatório",
                          minLength: {
                            value: 11,
                            message: "Contato incompleto",
                          },
                        })}
                      />

                      <ErrorMessage
                        errors={errors}
                        name="u_main_contact"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-[23%] form-group mb-6 ">
                      <label
                        htmlFor="inputEditUserSecondaryPhone"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Nº Whatsapp 2
                        <span className=" text-xs text-gray-400">
                          {" "}
                          (opcional)
                        </span>
                        :
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
                        mask="(99) 99999-9999"
                        placeholder="(XX) 9XXXX-XXXX"
                        {...register("u_secondary_contact", {
                          minLength: {
                            value: 11,
                            message: "Contato incompleto",
                          },
                        })}
                      />

                      <ErrorMessage
                        errors={errors}
                        name="u_secondary_contact"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-6 w-full md:w-1/2">
                    <label
                      htmlFor="inputEditUserDescription"
                      className="form-label inline-block mb-2 text-palm-700 mr-3"
                    >
                      Informações Sobre Você
                      {/* <span className="text-red-500 font-bold"> *</span>: */}
                    </label>
                    <textarea
                      className="
                        form-control
                        block
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
                        focus:text-gray-700 focus:outline-none
                      "
                      id="inputEditUserDescription"
                      rows={3}
                      placeholder="Descreva aqui o que os cliente precisam ou querem saber sobre voçê, e, sobre o que produz."
                      defaultValue={entityData.u_description}
                      {...register("u_description", {
                        minLength: {
                          value: 30,
                          message:
                            "A descrição deve ter pelo menos 30 caracteres",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="u_description"
                      render={({ message }) => (
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>

                  <div className="flex flex-col justify-start  items-start  my-4 text-left ">
                    <button
                      type="button"
                      className="
                        flex
                        items-end
                        justify-start
                        w-full
                        md:w-1/4
                        
                        pt-2.5
                        bg-transparent
                        text-palm-700
                        font-normal
                        text-sm
                        text-left
           
                     "
                      onClick={() => setToggleForm(!toggleForm)}
                    >
                      Alterar dados de acesso
                      <ArrowRight size={20} />
                    </button>
                    <span className=" text-xs text-gray-500">
                      {" "}
                      (E-mail e senha)
                    </span>
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
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(formEditUserAccess)}
                  className="w-full md:w-[70%]  h-full px-4 md:px-0 md:py-10 md:p-10 mx-auto  mt-[11rem] md:mt-[7rem]"
                >
                  <h4 className="w-full text-center text-lg font-semibold text-palm-700 mb-3">
                    Seus dados de acesso
                  </h4>

                  <div className="w-full mb-6">
                    <label
                      htmlFor="inputEditUserEmail"
                      className="form-label inline-block text-sm mb-2 text-gray-700"
                    >
                      Seu E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                      placeholder="exemplo@gmail.com"
                      id="inputEditUserEmail"
                      defaultValue={entityData.u_email}
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
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>

                  <div className="w-full mb-4">
                    <label
                      htmlFor="inputEditUserPassword"
                      className="form-label inline-block text-sm mb-2 text-gray-700"
                    >
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                      placeholder="******"
                      autoComplete="off"
                      id="inputEditUserPassword"
                      {...register("u_password", {
                        required: "Campo Obrigatório",
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
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label
                      htmlFor="inputEditUserNewPassword"
                      className="form-label inline-block text-sm mb-2 text-gray-700"
                    >
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                      placeholder="******"
                      autoComplete="off"
                      id="inputEditUserNewPassword"
                      {...register("u_newPassword", {
                        required: "Campo Obrigatório",
                        minLength: {
                          value: 6,
                          message: "O senha deve ter no mínimo 6 caracteres",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="u_newPassword"
                      render={({ message }) => (
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    className="block mx-auto  px-6   py-2.5 bg-palm-700 text-white font-medium text-sm 
                      leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700
                       focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => setToggleForm(!toggleForm)}
                    className="block relative text-center text-sm text-gray-500 mx-auto px-2 py-3"
                  >
                    Voltar
                  </button>
                </form>
              )}
            </main>
          )}
        </div>
      </div>
    </>
  );
}
