import { useEffect } from "react";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

export function RegisterEntity() {
  return (
    <>
      <Header />
      <Carrousel />
      <main className="px-8 md:px-20">
        <SectionTitle
          title="Cadastro de Organização"
          className="my-6 w-full font-semibold md:font-normal"
        ></SectionTitle>

        <form
          className="w-dull md:w-[80%] h-full md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto"
          method="POST"
        >
          <h3 className=" hidden md:block text-center text-sm md:text-lg text-palm-700 mb-2">
            Formulário de cadastro
          </h3>
          <p className="w-full text-center text-sm text-gray-400 mb-8 ">
            Preencha o formulário com os dados da Associação ou Cooperativa que
            você é responsável.
          </p>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-palm-700 mr-3">
              Tipo de Organização{" "}
              <span className="text-red-500 font-bold"> *</span>:
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="inlineRadioOptions"
                id="typeAssoc"
                value="association"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="typeAssocs"
              >
                Associação
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="inlineRadioOptions"
                id="typeCooperative"
                value="cooperative"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="typeCooperative"
              >
                Cooperativa
              </label>
            </div>
          </div>
          <div className="form-group mb-6 ">
            <label
              htmlFor="presidentName"
              className="form-label inline-block mb-2 text-palm-700"
            >
              Nome do(a) Presitende{" "}
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
              id="presidentName"
              aria-describedby="president Name"
              required
              placeholder="Nome Completo"
            />
          </div>
          <div className="grid grid-col-2 md:grid-cols-2  md:gap-4">
            <div className="form-group mb-6">
              <label
                htmlFor="entityName"
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
                id="entityName"
                aria-describedby="emailHelp123"
                placeholder="Digite aqui"
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="entityCnpj"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                CNPJ da Organização{" "}
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
                id="entityCnpj"
                aria-describedby="emailHelp124"
                placeholder="Digite aqui"
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center ">
            <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6">
              <label
                htmlFor="entityName"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                Cidade/Comunidade{" "}
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
                id="entityName"
                aria-describedby="emailHelp123"
                placeholder="Digite aqui"
              />
            </div>
            <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6">
              <label
                htmlFor="entityCnpj"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                Rua <span className=" text-xs text-gray-400"> (opcional)</span>:
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
                id="entityCnpj"
                aria-describedby="emailHelp124"
                placeholder="Digite aqui"
              />
            </div>
            <div className="w-full md:w-1/5 md:mr-[3%] form-group mb-6">
              <label
                htmlFor="entityCnpj"
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
                id="entityCnpj"
                aria-describedby="emailHelp124"
                placeholder="Digite aqui"
              />
            </div>
            <div className="w-full md:w-[22%] form-group mb-6 ">
              <label
                htmlFor="entityCnpj"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                Número{" "}
                <span className=" text-xs text-gray-400"> (opcional)</span>:
              </label>
              <input
                type="number"
                className="form-control
                  
                  w-full
                  md:w-1/2
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
                id="entityCnpj"
                aria-describedby="emailHelp124"
              />
            </div>
          </div>
          <button
            type="submit"
            className="
                w-full
                md:w-1/4
                md:mx-[37.5%]
                mt-4
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
            Enviar
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
