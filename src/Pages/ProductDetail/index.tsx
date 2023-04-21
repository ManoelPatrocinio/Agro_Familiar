import classNames from "classnames";
import { WhatsappLogo } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { IconAddList } from "../../Components/IconAddList";
import { SectionTitle } from "../../Components/SectionTitle";
import { PuchaseListContextType } from "../../Types/Contexts.type";
import { Product } from "../../Types/product.type";
import Star from "../../assets/images/star_icon.png";
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
  const { AddToPuchaseList } = useContext(
    PuchaseListContext
  ) as PuchaseListContextType;

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
  }, []);

  const handleProdQtd = (arg: boolean) => {
    if (arg) {
      setProductQTD((oldQTD) => oldQTD + 1);
    } else {
      if (productQTD! > 1) {
        setProductQTD((oldQTD) => oldQTD - 1);
      }
    }
  };
  const reviews = (
    <div className="w-full max-h-[25rem] overflow-y-auto  ">
      <h4 className="w-full text-start  text-md text-palm-700 mb-8">
        Avaliações do Produto{" "}
      </h4>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-start items-start relative mb-6 border-b border-gray-400 pb-4">
          <div className="w-20 min-w-[5rem] h-20 rounded-[50%] mr-2">
            <img
              src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
              className="relative bg-white  h-full w-full"
              alt="Foto perfil"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col ">
            <p className="w-full text-left text-sm  text-gray-800 font-medium font-display">
              Manoel Patrocino
            </p>
            <div className=" flex flex-col md:flex-row justify-start items-start mb-4">
              <div className="flex mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">
                20 de abril de 2022, às 14h88
              </span>
            </div>
            <p className="w-full text-sm text-justify md:text-left text-gray-800 pr-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              quisquam vero adipisci beatae voluptas dolor ame. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Maxime quisquam vero
              adipisci beatae voluptas dolor ame. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Maxime quisquam vero adipisci beatae
              voluptas dolor ame.
            </p>
          </div>
        </div>
        <div className="flex  flex-col md:flex-row justify-start items-start relative mb-6 border-b border-gray-400 pb-4">
          <div className="w-20 min-w-[5rem] h-20 rounded-[50%] mr-2">
            <img
              src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
              className="relative bg-white  h-full w-full"
              alt="Foto perfil"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col ">
            <p className="w-full text-left text-sm  text-gray-800 font-medium font-display">
              Manoel Patrocino
            </p>
            <div className=" flex flex-col md:flex-row justify-start items-start mb-4">
              <div className="flex mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">
                20 de abril de 2022, às 14h88
              </span>
            </div>
            <p className="w-full text-sm text-justify md:text-left text-gray-800 pr-2 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              quisquam vero adipisci beatae voluptas dolor ame. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Maxime quisquam vero
              adipisci beatae voluptas dolor ame. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Maxime quisquam vero adipisci beatae
              voluptas dolor ame.
            </p>
          </div>
        </div>
        <div className="flex  flex-col md:flex-row justify-start items-start relative mb-6 border-b border-gray-400 pb-4">
          <div className="w-20 min-w-[5rem] h-20 rounded-[50%] mr-2">
            <img
              src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
              className="relative bg-white  h-full w-full"
              alt="Foto perfil"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col ">
            <p className="w-full text-left text-sm  text-gray-800 font-medium font-display">
              Manoel Patrocino
            </p>
            <div className=" flex flex-col md:flex-row justify-start items-start mb-4">
              <div className="flex mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">
                20 de abril de 2022, às 14h88
              </span>
            </div>
            <p className="w-full text-sm text-justify md:text-left text-gray-800 pr-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              quisquam vero adipisci beatae voluptas dolor ame. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Maxime quisquam vero
              adipisci beatae voluptas dolor ame. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Maxime quisquam vero adipisci beatae
              voluptas dolor ame.
            </p>
          </div>
        </div>
      </div>
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
                <span className="text-sm text-gray-400"> 4.6 </span>
                <img
                  src={Star}
                  className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-1"
                />
                <span className="text-xs md:text-xs text-gray-400">(202)</span>
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
