import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

export function RegisterFarmer() {
  return (
    <>
      <Header />
      <Carrousel />
      <main className="px-8 md:px-20">
        <SectionTitle
          title="Cadastro de Produtor Individual"
          className="my-6 w-full font-semibold md:font-normal"
        ></SectionTitle>

        <form
          className="w-full md:w-[80%] h-full md:border border-gray-200 rounded   md:py-10 md:p-10  md:mx-auto"
          method="POST"
        >
          <h3 className=" hidden md:block text-center text-sm md:text-lg text-palm-700 mb-2">
            Formulário de cadastro
          </h3>
          <p className="w-full text-center text-sm text-gray-400 mb-8 ">
            Preencha o formulário com os dados da Associação ou Cooperativa que
            você é responsável.
          </p>

          <div className="grid grid-col-2 md:grid-cols-2  md:gap-4">
            <div className="form-group mb-6">
              <label
                htmlFor="FarmerName"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                Nome Completo
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
                id="FarmerName"
                aria-describedby="FarmerName"
                placeholder="Seu nome completo"
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="farmerCPF"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                CPF
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
                id="farmerCPF"
                aria-describedby="farmerCPF"
                placeholder="000.000.000-00"
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center ">
            <div className="w-full md:w-[23%] md:mr-[3%] form-group mb-6">
              <label
                htmlFor="entityName"
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
                id="entityName"
                aria-describedby="emailHelp123"
                placeholder="Digite aqui"
              />
            </div>
            <div className="w-full md:w-[22%] md:mr-[4%] form-group mb-6">
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
            <div className="w-full md:w-[30%]  form-group mb-6">
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
          </div>
          <div className="w-full flex flex-col md:flex-row items-center ">
            <div className="w-full md:w-[23%] mr-[3%] form-group mb-6 ">
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
            <div className="w-full md:w-[23%] form-group mb-6 ">
              <label
                htmlFor="entityCnpj"
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
                  aria-label="Default select example"
                >
                  <option selected>Selecione</option>
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
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center ">
            <div className="w-full md:w-[23%] mr-[3%] form-group mb-6 ">
              <label
                htmlFor="entityCnpj"
                className="form-label inline-block mb-2 text-palm-700 mr-3"
              >
                Nº Whatsapp 1<span className="text-red-500 font-bold"> *</span>:
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
                id="entityCnpj"
                aria-describedby="emailHelp124"
              />
            </div>
            <div className="w-full md:w-[23%] form-group mb-6 ">
              <label
                htmlFor="entityCnpj"
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
