import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { ChatText, WhatsappLogo } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CardComment } from "../../Components/CardComment";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { IconAddList } from "../../Components/IconAddList";
import { SectionTitle } from "../../Components/SectionTitle";
import { PuchaseListContextType } from "../../Types/Contexts.type";
import { Comment } from "../../Types/comment.type";
import { Product } from "../../Types/product.type";
import Star from "../../assets/images/star_icon.png";
import { AuthContext } from "../../context/AuthContext";
import { PuchaseListContext } from "../../context/PuchaseListContext";
import { api } from "../../hook/useApi";

let FarmerName: string;

export function ProductDetail() {
  const { productId } = useParams();
  const [productQTD, setProductQTD] = useState<number>(1);
  const [productData, setProductData] = useState<Product>();
  const [viewProdDetail, setViewProdDetail] = useState<
    "description" | "reviews"
  >("description");
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const { AddToPuchaseList } = useContext(
    PuchaseListContext
  ) as PuchaseListContextType;
  const { userLogged } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Comment>();

  useEffect(() => {
    api
      .get(`/product/${productId}`)
      .then((response) => {
        FarmerName = response.data.entityAndproducts.farmer_name;
        setProductData(response.data.entityAndproducts.product);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível  exibir as informações do produto.",
        });
      });
    api
      .get(`get-product-comments/${productId}`)
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
          text: "Desculpe, não foi possível  exibir essa comentários.",
        });
      });
  }, [productId]);

  const handleProdQtd = (arg: boolean) => {
    if (arg) {
      setProductQTD((oldQTD) => oldQTD + 1);
    } else {
      if (productQTD! > 1) {
        setProductQTD((oldQTD) => oldQTD - 1);
      }
    }
  };
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
  const reviews = (
    <div className="w-full h-auto">
      <div className="mt-6 ">
        <h4 className="w-full text-left text-sm md:text-md text-gray-800 font-semibold pb-8 ">
          Comentários & Avaliações
        </h4>
        {commentsList.length === 0 ? (
          <h4 className="w-full text-left text-sm md:text-md text-gray-500 md:pl-6 mb-20">
            Este produto ainda não tem comentários e avaliações, seja o primeiro
            a comentar e ajude o nosso perfil 😀
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
                          message: "O email deve ter pelo menos 15 caracteres",
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
                      Sua avaliação é importante para o desenvolvimento desse(s)
                      produtor(es)
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
    </div>
  );
  const description = (
    <div className="w-full">
      <h4 className="w-full text-start  text-md text-palm-700 mb-8">
        Descrição do Produto{" "}
      </h4>
      <p className="w-full text-justify text-sm text-gray-700 indent-8">
        {/* Produto fresco e bem cuidado, retirado assim que a compra é confirmada.
        plantado na roça de seu Zé Borges Com disponibilidade de entrega a cada
        semana, a partir de terça-feira Conseguimos atender até uma demanda de
        200 maços por semana A depender da quantidade podemos entregar em sua
      casa se morar na mesma cidade. */}

        {productData?.p_description}
      </p>
    </div>
  );

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

        id_product: productId,
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

  return (
    <>
      <Header setSearch={() => {}} ItemSearched={""} />
      <Carrousel />
      <SectionTitle
        title={FarmerName}
        entityLink={`/my-shop/${productData?.farmer_id}`}
        className={"my-10"}
      />
      <main className="w-full h-full md:h-[22rem]  flex flex-col md:flex-row px-4 md:px-20">
        <div
          id="carouselProductImg"
          className="carousel slide carousel-fade relative w-full md:w-1/2 h-[12rem]  md:h-full   "
          data-bs-ride="carousel"
          data-bs-interval="false"
        >
          <div className="carousel-inner relative w-full h-full overflow-hidden rounded">
            {productData?.p_images?.map((img, index) => (
              <div
                className={classNames("carousel-item float-left h-full", {
                  "active  w-full": index === 0,
                  " w-full": index != 0,
                })}
                key={index}
              >
                <img
                  src={img}
                  className="block w-full h-full"
                  alt="imagem do produto"
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselProductImg"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselProductImg"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="w-full md:w-1/2 h-100 flex flex-col justify-between items-start  pt-4 md:pt-0 md:pl-8 md:pr-20">
          <div className="w-full   flex flex-col items-center md:items-start justify-between ">
            <div className="text-left">
              <h2 className="w-full text-center md:text-start text-palm-700 text-lg md:text-xl font-medium mb-3 ">
                {productData?.p_name}
              </h2>
              <div className="flex w-[100%] items-center justify-center md:justify-start mb-2">
                <span className="text-sm text-gray-400">
                  {" "}
                  {commentsList.length === 0
                    ? 0
                    : raitingCalculate(commentsList)}
                </span>
                <img
                  src={Star}
                  className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-1"
                />
                <span className="text-xs md:text-xs text-gray-400">
                  ({commentsList.length})
                </span>
                {productData?.p_stock! > 0 && (
                  <span className="text-left text-gray-500 text-xs ml-4">
                    Em estoque: {productData?.p_stock}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="w-full flex justify-center md:justify-start items-start text-base mb-2">
              <span className=" text-lg text-green-600">
                {" "}
                R$ {productData?.p_price}
              </span>
              <span className=" text-lg text-gray-400 line-through ml-3 ">
                R$ {productData?.p_old_price}
              </span>
            </div>
            <p className="w-full text-justify md:text-start text-xs md:text-sm text-gray-400 pt-4  pb-8">
              <span className="text-red-500"> Aviso:</span> Todo o processo de
              negociação e entrega , deve ser feito entre o cliente e
              responsavel por este produto.
            </p>

            <div className="w-full flex flex-col md:flex-row  items-center mt-2 md:mt-0 mb-4">
              <div className="w-[75%] md:w-1/4 flex justify-start rounded border border-palm-700 py-1 mb-4 md:mb-0 md:mr-8 ">
                <button
                  className="w-1/4 h-full text-center text-xl text-palm-700"
                  type="button"
                  onClick={() => handleProdQtd(false)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-1/2 h-full text-center text-sm text-palm-700 py-2 focus:border-none focus:outline-none"
                  value={productQTD}
                  onChange={(e) => setProductQTD(e.target.valueAsNumber)}
                />

                <button
                  className="w-1/4 h-full text-center text-xl text-palm-700"
                  type="button"
                  onClick={() => handleProdQtd(true)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center px-2 py-3.5 md:px-0 md:py-2.5 bg-palm-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-500 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => AddToPuchaseList(productData!, productQTD!)}
              >
                <IconAddList w={"20"} h={"20"} color="#fff" className="mr-1" />
                Adicionar na lista
              </button>
            </div>
            <a
              href={`http://api.whatsapp.com/send?l=pt_BR&phone=+5574988393944&text=Olá tudo bem ? Eu Tenho interesse no produto: ${productData?.p_name}, de preço: ${productData?.p_price} reais. Ainda estar disponível ?`}
              target="_blank"
              className="w-full flex justify-center items-center px-2 py-2.5 bg-green-600 text-white  text-sm leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              <WhatsappLogo size={32} color="#fff" />
              Conversar
            </a>
          </div>
        </div>
      </main>
      <section className="w-full flex flex-col items-start justify-start px-8 md:px-20 mt-8">
        <header className="w-full flex items-center font-medium justify-evenly py-3 text-center text-lg text-palm-700   underline-offset-4 mb-8">
          <button
            className=" focus:underline "
            onClick={() => {
              setViewProdDetail("description");
            }}
          >
            {" "}
            Descrição
          </button>
          <button
            className=" focus:underline "
            onClick={() => {
              setViewProdDetail("reviews");
            }}
          >
            Avaliações
          </button>
        </header>
        {viewProdDetail === "description" ? description : reviews}
      </section>
      <Footer />
    </>
  );
}
