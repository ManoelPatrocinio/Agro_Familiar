import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import exemple_user_profile from "../../assets/images/exemple_user_profile.png";
import exemple_user_cover_background from "../../assets/images/user_cover_background.jpg";
import { api } from "../../hook/useApi";
import { User } from "../../Types/user.type";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { DotsThreeVertical } from "phosphor-react";
import Cookies from "js-cookie";

interface FormEditUserAccessData extends User {
  u_newPassword: string;
  u_confirmNewPassword: string;
}
export function ClientProfile() {
  const { userId } = useParams();
  const [alterForm, setAlterForm] = useState<boolean>(false);
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormEditUserAccessData>();

  const {
    data: entity,
    isFetching,
    error,
  } = useQuery<User>(
    ["clientProfile", userId],
    async () => {
      const response = await api.get(`/entity/${userId}`);
      reset()
      return await response.data.entity;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oppss",
      text: "Desculpe, não foi possível  essa informação, tente novamente, por favor",
    });
  }
  
  async function formSubmit(userFormData: FormEditUserAccessData) {
    await api.put(`/admin/update-userinfo/${userId}`,userFormData)
    .then((response)=>{
      Cookies.remove('token');

      Swal.fire({
        icon: "success",
        title:"Sucesso",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1700
      });
      setTimeout(()=>{
        navigate('/')
        window.location.reload();
      },1900)
    }).catch((error)=>{
    
      Swal.fire({
        icon: "error",
        title:"Ooppss",
        text: error.response.data.message,

        timer: 1700
      });
    })
  }
  async function formAlterPassword(userFormData: FormEditUserAccessData) {
    if(userFormData.u_newPassword !== userFormData.u_confirmNewPassword){
      Swal.fire({
        icon: "info",
        title:"Ooppss",
        text: "O valor inserido no compo 'Confirme a nova senha' é diferente do compo 'Nova senha' ",
       
      });
      return null;
    }
    await api.put(`/admin/alter-password/${userId}`,userFormData)
    .then((response)=>{
      Cookies.remove('token');
      Swal.fire({
        icon: "success",
        title:"Sucesso",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1700
      });
      setTimeout(()=>{
        navigate('/')
        window.location.reload();
      },1900)

    }).catch((error)=>{
     
      Swal.fire({
        icon: "error",
        title:"Ooppss",
        text: error.response.data.message,
        timer: 1700
      });
    })
  }

  async function handleDeleteUserAcount() {
    Swal.fire({
      icon: 'question',
      title: 'Excluir conta ?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      text: 'Ao excluir essa conta, todos os seus dados e informações serão perdidas, tem certeza ?',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserAcount()
      }
    });
  }
  

  async function deleteUserAcount() {
    await api.delete(`/admin/delete-account/${userId}`).then((response)=>{
      Cookies.remove('token');
      Swal.fire({
        icon: "success",
        title:"Sucesso",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1700

      });
      setTimeout(()=>{
        navigate('/')
        window.location.reload();
      },1900)
    })
  }
  return (
    <>
      <Header setSearch={() => {}} ItemSearched={""} />
      <div className="w-full h-40 md:h-[23rem] md:min-h-[50vh] relative mt-4">
        {entity && entity.u_cover_photo ? (
          <img
            src={entity?.u_cover_photo}
            alt="foto de capa"
            className="w-full h-full "
          />
        ) : (
          <img
            src={exemple_user_cover_background}
            alt="foto de perfil"
            className="w-full h-full object-cover"
          />
        )}
        <div className=" w-full absolute top-[7rem] md:top-[87%] flex flex-col md:flex-row  justify-between items-center  md:px-16 ">
          <div className="flex flex-col md:flex-row items-center ">
            <div className="w-[7rem] h-[7rem] md:w-[8rem] md:h-[8rem] rounded-[50%] ">
              {entity && entity.u_img_profile ? (
                <>
                  {entity.u_img_profile.length > 0 ? (
                    <img
                      src={entity.u_img_profile}
                      alt="foto de perfil"
                      className="w-full h-full rounded-[50%]"
                    />
                  ) : (
                    <img
                      src={exemple_user_profile}
                      alt="foto de perfil"
                      className="w-full h-full  rounded-[50%]"
                    />
                  )}
                </>
              ) : (
                <img
                  src={exemple_user_profile}
                  alt="foto de perfil"
                  className="w-full h-full rounded-[50%]"
                />
              )}
            </div>
            <div className="flex flex-col items-center md:items-start justify-evenly px-4 pb-4">
              <h4 className="text-sm md:text-lg text-center md:text-left text-palm-700 font-display font-semibold pt-5 ">
                {entity?.u_full_name}
              </h4>
              {/* <p className='text-xs md:text-sm text-gray-400 font-semibold'>
                {' '}
                {entity?.u_city}
              </p> */}
            </div>
          </div>
          <div className='absolute md:relative mx right-0 top-[30%] flex justify-center '>
            <div className='dropstart relative md:pt-8'>
              <button
                className='
                    dropdown-toggle
                    py-2.5
                    flex
                    items-center
                    whitespace-nowrap
                  '
                type='button'
                id='dropdownMenuButton1s'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <DotsThreeVertical size={38} weight='bold' color='#789B3D'  />
              </button>
              <ul
                className='
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  '
                aria-labelledby='dropdownMenuButton1s'
              >
                <li>
                  <button
                    type="button"
                    className='
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      '
                    onClick={()=>handleDeleteUserAcount()}  
                  >
                    Exluir conta
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-1 md:px-20 mt-[12rem] md:mt-[10rem]">
        {!alterForm ? (
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="w-full md:w-1/2 h-auto mx-auto flex flex-col items-start justify-start px-2 md:px-0"
          >
            <h1 className="w-full text-center text-lg font-semibold text-palm-700 mb-2">
              Edite ou Adicione suas informações
            </h1>
            <p className="w-full text-center text-sm font-semibold text-gray-500 mb-6">
              Selecione e edite a informação desejada, ao final clique em SALVAR
              para confirmar a alteração
            </p>
            <div className="w-full mb-6">
              <label
                htmlFor="inputEditUserFullName"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="inputEditUserFullName"
                className="form-control block w-full p-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="Nome Completo"
                defaultValue={entity?.u_full_name}
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
                defaultValue={entity?.u_email}
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
            <div className="w-full mb-4">
              <label
                htmlFor="inputEditUserPassword"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Sua senha
              </label>
              <input
                type="password"
                className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="******"
                id="inputEditUserPassword"
                autoComplete="off"
                defaultValue=""
                {...register("u_password", {
                  required: "Informe sua senha para válidar a alteração",
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

            <button
              className="flex justify-center items-center text-sm font-medium text-palm-700 mb-8 transition duration-150 ease-in-out hover:text-palm-900 hover:underline"
              type="button"
              onClick={()=>setAlterForm((old) => !old)}
            >
              Alterar senha
              <svg
                width="28"
                height="12  "
                viewBox="0 0 33 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.7812 10.3125H7.21875C6.64125 10.3125 6.1875 9.85875 6.1875 9.28125C6.1875 8.70375 6.64125 8.25 7.21875 8.25H25.7812C26.3587 8.25 26.8125 8.70375 26.8125 9.28125C26.8125 9.85875 26.3587 10.3125 25.7812 10.3125Z"
                  fill="#789B3D"
                />
                <path
                  d="M20.625 17.5313C20.4898 17.5329 20.3557 17.5062 20.2313 17.453C20.107 17.3997 19.9952 17.321 19.9031 17.2219C19.4906 16.8094 19.4906 16.17 19.9031 15.7575L26.4 9.26064L19.9031 2.76377C19.4906 2.35127 19.4906 1.7119 19.9031 1.2994C20.3156 0.886896 20.955 0.886896 21.3675 1.2994L28.5863 8.51815C28.9988 8.93065 28.9988 9.57002 28.5863 9.98252L21.3675 17.2013C21.1612 17.4075 20.8931 17.5106 20.6456 17.5106L20.625 17.5313Z"
                  fill="#789B3D"
                />
              </svg>
            </button>

            <button
              type="submit"
              className="w-full md:w-1/2 block mx-auto  px-7 py-3 bg-palm-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Salvar
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(formAlterPassword)}
            className="w-full md:w-1/2 h-auto mx-auto flex flex-col items-start justify-start px-2 md:px-0"
          >
            <div className="w-full mb-4">
              <label
                htmlFor="inputEditUserPassword"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Senha atual
              </label>
              <input
                type="password"
                className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="******"
                id="inputEditUserPassword"
                autoComplete="off"
                defaultValue=""
                {...register("u_password", {
                  required: "Informe sua senha para válidar a alteração",
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
            <div className="w-full mb-4">
              <label
                htmlFor="inputEditUserNewPassword"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Nova senha
              </label>
              <input
                type="password"
                className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="******"
                id="inputEditUserNewPassword"
                autoComplete="off"
                defaultValue=""

                {...register("u_newPassword", {
                  required: "Campo obrigatório",
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
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="inputEditConfirmUserNewPassword"
                className="form-label inline-block text-sm mb-2 text-gray-700"
              >
                Confirme a nova senha
              </label>
              <input
                type="password"
                className="form-control block w-full p-2  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-palm-700 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-palm-700 focus:outline-none"
                placeholder="******"
                id="inputEditConfirmUserNewPassword"
                autoComplete="off"
                defaultValue=""

                {...register("u_confirmNewPassword", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 6,
                    message: "O senha deve ter no mínimo 6 caracteres",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="u_confirmNewPassword"
                render={({ message }) => (
                  <small className="text-red-500 text-xs">{message}</small>
                )}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-1/2 block mx-auto  px-7 py-3 my-4 bg-palm-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Salvar
            </button>
            
            <button
              className="w-1/2 mx-auto flex justify-center items-center text-sm font-medium text-palm-700 mb-8 transition duration-150 ease-in-out hover:text-palm-900 hover:underline"
              type="button"
              onClick={()=>setAlterForm((old) => !old)}
            >
              <svg width="28" height="12" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.21875 10.5556H25.7812C26.3588 10.5556 26.8125 10.0911 26.8125 9.50001C26.8125 8.9089 26.3588 8.44446 25.7812 8.44446H7.21875C6.64125 8.44446 6.1875 8.9089 6.1875 9.50001C6.1875 10.0911 6.64125 10.5556 7.21875 10.5556Z" fill="#789B3D"/>
              <path d="M12.375 17.9445C12.5102 17.9462 12.6443 17.9189 12.7687 17.8643C12.893 17.8098 13.0048 17.7292 13.0969 17.6278C13.5094 17.2056 13.5094 16.5511 13.0969 16.1289L6.6 9.47892L13.0969 2.82892C13.5094 2.4067 13.5094 1.75226 13.0969 1.33003C12.6844 0.907811 12.045 0.907811 11.6325 1.33003L4.41375 8.71892C4.00125 9.14114 4.00125 9.79559 4.41375 10.2178L11.6325 17.6067C11.8387 17.8178 12.1069 17.9234 12.3544 17.9234L12.375 17.9445Z" fill="#789B3D"/>
              </svg>
              voltar 

            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
