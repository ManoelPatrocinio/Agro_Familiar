import Star from "../../assets/images/star_icon.png";
import header_background from "../../assets/images/img_header_exemple.png";
import entity_profile from "../../assets/images/img_entity_profile_exemple.png";
import { Header } from "../../Components/Header";
import { ChatText } from "phosphor-react";
export function InfoEntity() {
  return (
    <>
      <Header />
      <div className="w-full h-40 md:h-[27rem] md:min-h-[60vh] relative mt-4">
        <img
          src={header_background}
          alt="foto de capa"
          className="w-full h-full  "
        />
        <div className=" w-full absolute top-[7rem] md:top-[24rem] flex flex-col md:flex-row items-center md:items-end md:pl-16 ">
          <div className="w-[7rem] h-[7rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%]">
            <img
              src={entity_profile}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center md:items-start justify-evenly px-4 pb-4">
            <h4 className="text-sm md:text-lg text-center md:text-left text-gray-800 font-display font-semibold">
              {" "}
              Associação dos Produtores Rurais do Pau D´arco
            </h4>
            <p className="text-xs md:text-sm text-gray-400 font-semibold">
              {" "}
              Pau D´arco
            </p>

            <div className="flex w-1/4 items-center justify-start">
              <span className="text-xs md:text-sm text-gray-400"> 4.6 </span>
              <img
                src={Star}
                className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
              />
              <span className="text-xs md:text-xs text-gray-400">(202)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full px-8 md:px-20 mt-[11rem] md:mt-[9rem]">
        <h1 className="w-full text-center text-sm md:text-lg  text-gray-800 font-display font-semibold  mb-4">
          Informações sobre a Associação
        </h1>

        <p className="w-full md:text-left text-justify text-sm text-gray-800">
          A associação foi fundada em 2002 , como resposta da união dos
          moradores do povoado de Curral Novo, na cidade de Barra Bahia. Hoje já
          comtamos com mais de 23 colaboradores, que atuam em conjunto no
          plantio e cultivo de milho, feijão,mandioca e hortaliças. Prezamos
          pela qualidade de todos os produtos, através de um cultivo
          tradicional, sem adição de produtos químicos.
        </p>
        <div className="w-full flex flex-col md:flex-row justify-between py-8">
          <p className="text-sm text-left text-gray-800">
            <span className="font-semibold">CNPJ:</span> 44.448.094/0001-31
          </p>
          <p className="text-sm text-left  text-gray-800 py-4 md:py-0">
            <span className="font-semibold">Responsável Legal: </span> Manoel de
            Jesus Moura do Patrocinio
          </p>
          <p className="text-sm text-left text-gray-800">
            <span className="font-semibold">Telefone(s): </span> 74 98800-0000
          </p>
        </div>
        <div className="mt-6">
          <h4 className="w-full text-left text-sm text-gray-800 font-semibold pb-8">
            Comentários sobre Associação
          </h4>
          <div className="w-full max-h-[25rem] overflow-y-auto  ">
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
                <p className="w-full text-sm text-justify md:text-left text-gray-800 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime quisquam vero adipisci beatae voluptas dolor ame. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Maxime
                  quisquam vero adipisci beatae voluptas dolor ame. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Maxime quisquam
                  vero adipisci beatae voluptas dolor ame.
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
                <p className="w-full text-sm text-justify md:text-left text-gray-800 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime quisquam vero adipisci beatae voluptas dolor ame. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Maxime
                  quisquam vero adipisci beatae voluptas dolor ame. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Maxime quisquam
                  vero adipisci beatae voluptas dolor ame.
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
                <p className="w-full text-sm text-justify md:text-left text-gray-800 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime quisquam vero adipisci beatae voluptas dolor ame. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Maxime
                  quisquam vero adipisci beatae voluptas dolor ame. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Maxime quisquam
                  vero adipisci beatae voluptas dolor ame.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:col-span-2 md:mt-12">
          <div className="w-full  flex items-start justify-start pb-4">
            {" "}
            <ChatText size={24} />{" "}
            <p className="w-full ml-1 text-left text-sm text-gray-800 font-semibold ">
              {" "}
              Deixe o seu Comentário
            </p>
          </div>
          <form action="#" method="POST">
            <div className="overflow-hidden ">
              <div className="bg-white py-5">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seu Nome
                    </label>
                    <small className="text-xs text-gray-400">
                      Não será publica
                    </small>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-2 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seu E-mail
                    </label>
                    <small className="text-xs text-gray-400">
                      Não será publica
                    </small>

                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-2 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 ">
                    <label
                      htmlFor="user-comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seu Comentário
                    </label>
                    <small className="text-xs text-gray-400">
                      será publicado nesta página 
                    </small>
                    <textarea
                      name="user-comment"
                      id="user-comment"
                      rows={5}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 ">
                     <label
                      className="block text-sm font-medium text-gray-700"
                    >
                      Deixe sua Avaliação
                    </label>
                    <small className="text-xs text-gray-400">
                      Sua avaliação é importante para o desenvolvimento desse(s) produtor(es) 
                    </small>

                    <div className="star-rating mt-2">
                      <input type="radio" name="stars" id="star-a" value="5" />
                      <label htmlFor="star-a"></label>

                      <input type="radio" name="stars" id="star-b" value="4" />
                      <label htmlFor="star-b"></label>

                      <input type="radio" name="stars" id="star-c" value="3" />
                      <label htmlFor="star-c"></label>

                      <input type="radio" name="stars" id="star-d" value="2" />
                      <label htmlFor="star-d"></label>

                      <input type="radio" name="stars" id="star-e" value="1" />
                      <label htmlFor="star-e"></label>
                    </div>
                  </div>
                
                </div>
              </div>

              <button
                type="submit"
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Publicar Comentário
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}