import { ErrorMessage } from "@hookform/error-message";
import { ChatText } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CardComment } from "../../Components/CardComment";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Comment } from "../../Types/comment.type";
import { User } from "../../Types/user.type";
import exemple_user_profile from "../../assets/images/exemple_user_profile.png";
import Star from "../../assets/images/star_icon.png";
import exemple_user_cover_background from "../../assets/images/user_cover_background.jpg";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../hook/useApi";

export function EntityInfo() {
  const { userId } = useParams();
  const [entityData, setEntityData] = useState<User>();
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const { userLogged } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Comment>();

  useEffect(() => {
    api
      .get(`/entity/${userId}`)
      .then((response) => {
        // console.log("response.data", response.data);
        setEntityData(response.data.entity);

        // setProductData(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível  exibir essa informação, tente de novo.",
        });
      });
    api
      .get(`get-farmer-comments/${userId}`)
      .then((response) => {
        // console.log("response.data", response.data);
        setCommentsList(response.data.comments);

        // setProductData(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível  exibir os comentários.",
        });
      });
  }, [userId]);

  async function formSubmit(FormData: Comment) {
    if (!FormData.c_raiting) {
      Swal.fire({
        icon: "info",
        title: "Atenção",
        text: "É  preciso informar um número de estrelas para continuar",
        showConfirmButton: true,
      });
    } else {
      const newComent: Comment = {
        c_comment: FormData.c_comment,
        c_raiting: FormData.c_raiting,
        c_customer_id: userLogged?._id!,
        c_customer_name: FormData.c_customer_name,
        c_customer_email: userLogged?.u_email!,
        c_user_img_profile: !userLogged?.u_img_profile
          ? ""
          : userLogged.u_img_profile,

        id_farmer: userId,
      };

      await api
        .post("/create-comment", newComent)
        .then((response) => {
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
  }
  function raitingCalculate(comments: Comment[]) {
    // Na escala de 1 a 5, as notas 1 e 2 são negativas(detractors), 4 e 5 são positivas(promoters), e 3 é neutro.
    var promoters = 0;
    var detractors = 0;
    var soma = 0;
    for (var i = 0, l = comments.length; i < l; i++) {
      soma += comments[i].c_raiting;
      if (comments[i].c_raiting >= 4) promoters++;
      if (comments[i].c_raiting <= 2) detractors++;
    }

    const nps = ((promoters - detractors) / comments.length) * 100;
    const media = soma / comments.length;
    return media < 0 ? 0 : media;
  }
  return (
    <>
      <Header setSearch={() => {}} ItemSearched={""} />
      <div className="w-full h-40 md:h-[27rem] md:min-h-[60vh] relative mt-4">
        {entityData && entityData.u_cover_photo ? (
          <>
            {entityData.u_cover_photo.length > 0 ? (
              <img
                src={entityData?.u_cover_photo}
                alt="foto de capa"
                className="w-full h-full "
              />
            ) : (
              <img
                src={exemple_user_cover_background}
                alt="foto de capa"
                className="w-full h-full "
              />
            )}
          </>
        ) : (
          <img
            src={exemple_user_cover_background}
            alt="foto de perfil"
            className="w-full h-full object-cover"
          />
        )}
        <div className=" w-full absolute top-[7rem] md:top-[87%] flex flex-col md:flex-row items-center md:items-end md:pl-16">
          <div className="w-[7rem] h-[7rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%]">
            {entityData && entityData.u_img_profile ? (
              <>
                {entityData.u_img_profile.length > 0 ? (
                  <img
                    src={entityData.u_img_profile}
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
            <h4 className="text-sm md:text-lg text-center md:text-left text-palm-700 font-display font-semibold pt-3 md:pt-0">
              {entityData?.u_type === "farmer"
                ? entityData.u_full_name
                : entityData?.u_entity_name}
            </h4>
            <p className="text-xs md:text-sm text-gray-400 font-semibold py-2 md:py-1">
              {" "}
              {entityData?.u_city}
            </p>

            <div className="flex md:w-1/4 items-center justify-start">
              <span className="text-xs md:text-sm text-gray-400">
                {" "}
                {commentsList.length === 0 ? 0 : raitingCalculate(commentsList)}
              </span>
              <img
                src={Star}
                className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
              />
              <span className="text-xs md:text-xs text-gray-400">
                ({commentsList.length})
              </span>
            </div>
          </div>
        </div>
      </div>
      <main className="w-full px-8 md:px-20 mt-[11rem] md:mt-[9rem]">
        <h1 className="w-full text-center text-sm md:text-lg  text-gray-800 font-display font-semibold  mb-4">
          Informações sobre a Associação
        </h1>

        <p className="w-full md:text-left text-justify text-sm text-gray-700 indent-9 md:indent-12">
          {entityData?.u_description
            ? entityData.u_description
            : "Este usuário ainda não adicionou uma descrição sobre suas atividades. Caso precise de mais informações, além das que estão apresentadas aqui, entre em contato com esse usuário pelos meios disponíveis."}
        </p>
        <div className="w-full flex flex-col md:flex-row justify-evenly py-8">
          {entityData?.u_type !== "farmer" ? (
            <p className="w-full md:max-w-[25%] text-sm text-left md:text-center text-gray-600">
              <span className="font-semibold">CNPJ: </span>
              {entityData?.u_CNPJ_CPF?.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5"
              )}
            </p>
          ) : (
            <p className="w-full md:max-w-[25%] text-sm text-left md:text-center text-gray-600">
              <span className="font-semibold">E-mail:</span>
              {entityData?.u_email}
            </p>
          )}

          {entityData?.u_type !== "farmer" && (
            <p className="w-full md:max-w-[25%] text-sm text-left md:text-center text-gray-600 py-4 md:py-0 ">
              <span className="font-semibold">Presidente: </span>
              {entityData?.u_president_name}
            </p>
          )}
          <div className="w-full md:max-w-[25%] flex flex-col items-start justify-start mb-3 md:md-0">
            <p className="w-full text-sm text-left md:text-center text-gray-600">
              <span className="font-semibold">Telefone(s): </span>{" "}
              {entityData?.u_main_contact?.length === 12 &&
                entityData?.u_main_contact?.replace(
                  /^(\d{3})(\d{5})(\d{4})/,
                  "($1)$2-$3"
                )}
              {entityData?.u_main_contact?.length === 11 &&
                entityData?.u_main_contact?.replace(
                  /^(\d{2})(\d{5})(\d{4})/,
                  "($1)$2-$3"
                )}
            </p>
            <p className="w-full text-sm text-left md:text-center text-gray-600">
              <span className="invisible font-semibold">Telefone(s): </span>{" "}
              {entityData?.u_secondary_contact?.length === 12 &&
                entityData?.u_secondary_contact?.replace(
                  /^(\d{3})(\d{5})(\d{4})/,
                  "($1)$2-$3"
                )}
              {entityData?.u_secondary_contact?.length === 11 &&
                entityData?.u_secondary_contact?.replace(
                  /^(\d{2})(\d{5})(\d{4})/,
                  "($1)$2-$3"
                )}
            </p>
          </div>

          {entityData?.u_type !== "farmer" && (
            <p className="w-full md:max-w-[25%] text-sm text-left md:text-center text-gray-600">
              <span className="font-semibold">E-mail: </span>
              {entityData?.u_email}
            </p>
          )}
        </div>
        <div className="mt-6">
          <h4 className="w-full text-left text-sm md:text-md text-gray-800 font-semibold pb-8">
            Comentários & Avaliações
          </h4>

          {commentsList.length === 0 ? (
            <h4 className="w-full text-left text-sm md:text-md text-gray-500 md:pl-6 mb-20">
              Ainda não temos comentários e avaliações, seja o primeiro a
              comentar e ajude o nosso perfil 😀
            </h4>
          ) : (
            <div className="w-full max-h-[25rem] overflow-y-auto md:pl-20  ">
              {commentsList.map((comment) => (
                <CardComment comment={comment} key={comment._id} />
              ))}
            </div>
          )}
        </div>
        {userLogged && (
          <div className="mt-5 md:col-span-2 md:mt-12">
            <div className="w-full  flex items-start justify-start pb-4">
              {" "}
              <ChatText size={24} color="#678433" />{" "}
              <p className="w-full ml-1 text-left text-sm text-palm-900 font-semibold ">
                {" "}
                Deixe o seu Comentário
              </p>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} method="POST">
              <div className="overflow-hidden ">
                <div className="bg-white py-5">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="c_customer_name"
                        className="block text-sm font-semibold text-palm-900"
                      >
                        Seu Nome
                      </label>
                      <small className="text-xs text-gray-400">
                        Será publicado
                      </small>
                      <input
                        type="text"
                        id="c_customer_name"
                        autoComplete="given-name"
                        className="mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-palm-700 focus:outline-none sm:text-sm"
                        {...register("c_customer_name", {
                          required: "Informe seu nome completo para continuar",
                          minLength: {
                            value: 6,
                            message: "Este campo deve ter mais de 6 caracteres",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="c_customer_name"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="c_customer_email"
                        className="block text-sm font-semibold text-palm-900"
                      >
                        Seu E-mail
                      </label>
                      <small className="text-xs text-gray-400">
                        Não será publicado
                      </small>

                      <input
                        type="email"
                        id="c_customer_email"
                        autoComplete="email"
                        className="mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-palm-700 focus:outline-none sm:text-sm"
                        defaultValue={userLogged.u_email}
                        {...register("c_customer_email", {
                          required: "Campo obrigatório",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Informe um e-mail válido",
                          },
                          minLength: {
                            value: 15,
                            message:
                              "O email deve ter pelo menos 15 caracteres",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="c_customer_email"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="c_comment"
                        className="block text-sm font-semibold text-palm-900"
                      >
                        Seu Comentário
                      </label>
                      <small className="text-xs text-gray-400">
                        será publicado nesta página
                      </small>
                      <textarea
                        id="c_comment"
                        rows={5}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-palm-700 focus:outline-none  sm:text-sm"
                        {...register("c_comment", {
                          required: "Informe algum comentário para continuar",
                          minLength: {
                            value: 3,
                            message:
                              "Este campo deve ter pelo mesnos 3 caracteres",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="c_comment"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label className="block text-sm font-semibold text-red-500">
                        Deixe sua Avaliação
                      </label>
                      <small className="text-xs text-gray-400">
                        Sua avaliação é importante para o desenvolvimento
                        desse(s) produtor(es)
                      </small>

                      <div className="star-rating mt-2">
                        <input
                          type="radio"
                          id="c_raiting5"
                          defaultValue={5}
                          {...register("c_raiting", {})}
                        />
                        <label htmlFor="c_raiting5"></label>
                        <input
                          type="radio"
                          id="c_raiting4"
                          defaultValue={4}
                          {...register("c_raiting", {})}
                        />
                        <label htmlFor="c_raiting4"></label>
                        <input
                          type="radio"
                          id="c_raiting3"
                          defaultValue={3}
                          {...register("c_raiting", {})}
                        />
                        <label htmlFor="c_raiting3"></label>
                        <input
                          type="radio"
                          id="c_raiting2"
                          defaultValue={2}
                          {...register("c_raiting", {})}
                        />
                        <label htmlFor="c_raiting2"></label>
                        <input
                          type="radio"
                          id="c_raiting1"
                          defaultValue={1}
                          {...register("c_raiting", {})}
                        />
                        <label htmlFor="c_raiting1"></label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex justify-center rounded-md border border-transparent bg-palm-500 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-palm-900 focus:outline-none focus:ring-2  focus:ring-offset-2"
                >
                  Publicar Comentário
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
