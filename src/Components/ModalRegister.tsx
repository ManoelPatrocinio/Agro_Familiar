import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import iconEntity from "../assets/images/icon-entity.svg";
import iconFarmer from "../assets/images/icon-farmer.svg";
import iconUser2 from "../assets/images/icon-user2.svg";
import registerImgBackgroun from "../assets/images/registerImgBackgroun.png";
import { FormUserAccess } from "../Components/FormUserAccess";

export function ModalRegister() {
  const [typeContent, useTypeContent] = useState<
    "ChooseTypeRegister" | "userRegister" | null
  >(null);
  useEffect(() => {
    useTypeContent("ChooseTypeRegister");
  }, []);
  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="modalPreviewRegister"
      tabIndex={-1}
      aria-labelledby="modalPreviewRegister"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-xl relative w-auto ">
        <div className="modal-content bg-white  border-none shadow-lg relative flex flex-col md:flex-row w-full h-auto md:h-[34rem] items-center justify-start rounded mt-10">
          <div className="hidden md:block md:w-2/5  md:h-full rounded">
            <img
              src={registerImgBackgroun}
              alt="imagem de fundo verduras exportas"
              className="w-full h-full  rounded-l"
            />
          </div>
          <div className="w-full md:w-3/5 h-full relative flex flex-col justify-around  px-8  pb-2 pt-4 md:pt-0">
            {typeContent === "ChooseTypeRegister" ? (
              <>
                <header className="w-full ">
                  <h3 className="w-full text-center text-lg md:text-xl text-palm-700 font-display pb-3">
                    Bem-vindo ao Portal Agro Familiar
                  </h3>
                  <p className="w-full md:text-center text-justify text-sm md:text-md text-gray-700 font-display">
                    Junte-se a nós, e ajude a desenvolver a agricultura familiar
                    da sua região, e, por que não, de todo o Brasil ?
                  </p>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 absolute top-2 right-2 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-palm-700 hover:opacity-75 hover:no-underline cursor-pointer"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </header>
                <div className="mt-6 md:mt-0">
                  <p className="w-full text-left text-sm md:text-md text-gray-700 font-display font-semibold mb-8">
                    Escolha seu perfil de usuário:
                  </p>

                  <div className="w-full flex flex-col md:flex-row justify-between items-center">
                    <button
                      type="button"
                      className="w-[11rem] p-3 border border-gray-200 rounded cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                      onClick={() => useTypeContent("userRegister")}
                    >
                      <img
                        src={iconUser2}
                        alt="icone comprador"
                        className="h-24 max-h-24 mx-auto"
                      />
                      <h5 className="w-full text-center text-sm text-palm-700 font-semibold pb-2">
                        Comprador
                      </h5>
                      <p className="w-full text-center text-xs text-gray-700">
                        Busca e compra de produtos
                      </p>
                    </button>
                    <Link
                      to="/Register-entity"
                      className="w-[11rem] p-3 border border-gray-200 rounded my-4 md:my-0 cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                    >
                      <img
                        src={iconEntity}
                        alt="icone comprador"
                        className="h-[5.5rem] max-h-24 mx-auto"
                      />
                      <h5 className="w-full text-center text-sm text-palm-700 font-semibold pb-2 pt-1">
                        Assoc/Coop
                      </h5>
                      <p className="w-full text-center text-xs text-gray-700 ">
                        Cadastro e anúncio de produtos
                      </p>
                    </Link>
                    <div className="w-[11rem] p-3 border border-gray-200 rounded">
                      <img
                        src={iconFarmer}
                        alt="icone comprador"
                        className="h-24 max-h-24 mx-auto"
                      />
                      <h5 className="w-full text-center text-sm text-palm-700 font-semibold pb-2">
                        Produtor Individual
                      </h5>
                      <p className="w-full text-center text-xs text-gray-700">
                        Cadastro e anúncio de produtos
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <header className="w-full ">
                  <button onClick={() => useTypeContent("ChooseTypeRegister")}>
                    <ArrowLeft
                      size={32}
                      weight="bold"
                      className="absolute top-2 left-2 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-palm-700 hover:opacity-75 hover:no-underline cursor-pointer"
                    />
                  </button>
                  <h3 className="w-full text-center text-lg md:text-xl text-palm-700 font-display pb-3">
                    Bem-vindo ao Portal Agro Familiar
                  </h3>
                  <p className="w-full md:text-center text-justify text-sm md:text-md text-gray-700 font-display">
                    Junte-se a nós, e ajude a desenvolver a agricultura familiar
                    da sua região, e, por que não, de todo o Brasil ?
                  </p>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 absolute top-2 right-2 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-palm-700 hover:opacity-75 hover:no-underline cursor-pointer"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </header>
                <div className="md:px-11">
                  <FormUserAccess type="userRegister" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
