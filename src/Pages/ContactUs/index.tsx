import IconEmail from "../../assets/images/icon_Gmail.svg";
import IconPhone from "../../assets/images/icon_Phone.svg";
import { Carrousel } from "../../Components/Carrousel";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

const emailContact = import.meta.env.VITE_EMAIL_CONTACT;

export function ContactUs() {
  return (
    <>
      <Header />
      <Carrousel />
      <main className="w-full flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Fale Conosco"} className={"my-6 w-full"} />
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:max-w-[50%]  md:px-10 md:pt-14">
            <p className="w-full text-left text-md text-gray-800 font-medium mb-4 ">
              Ficou com alguma dúvida, sugetão ou algo que queria falar conosco
              ? <br /> Se sim, teremos o maior prazer em te ajudar !
            </p>
            <p className="w-full text-left text-md text-gray-800 font-medium mb-8 ">
              {" "}
              Entre em contato pelos meios disponíveis
            </p>
            <div className="w-full md:w-1/2  text-left">
              <div className="flex justify-start items-center mb-8 md:mb-4">
                <img
                  className="w-10 h-10 mr-3"
                  src={IconEmail}
                  alt="whatsApp"
                />
                <div className="block">
                  <span className="w-full text-left text-sm text-gray-800">
                    Nosso E-mail
                  </span>
                  <br />
                  <span className="w-full text-left text-sm text-gray-700">
                    portalagrofamiliar@gmail
                  </span>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <img
                  className="w-10 h-10 mr-3"
                  src={IconPhone}
                  alt="whatsApp"
                />
                <div className="block">
                  <span className="w-full text-left text-sm text-gray-800">
                    Contato
                  </span>
                  <br />
                  <span className="w-full text-left text-sm text-gray-700">
                    (74)98819-3405
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="w-full md:w-1/2 md:max-w-[50%]  md:px-10 mt-8 md:mt-0 ">
            <h3 className="w-full text-center text-lg text-gray-800 font-display font-semibold py-4">
              Contato
            </h3>
            <form
              className="w-full h-full md:px-10"
              //   onSubmit={handleSubmit(onSubmit)}
              action={`https://formsubmit.co/${emailContact}`}
              method="POST"
            >
              <div className="form-group mb-6">
                <label
                  htmlFor="userMessageName"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Nome Completo
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
                  id="userMessageName"
                  aria-describedby="userMessageName"
                  required
                  placeholder="Nome Completo"
                />
              </div>

              <div className="form-group mb-6">
                <label
                  htmlFor="userMessageEmail"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Seu E-mail
                </label>
                <input
                  type="email"
                  className="form-control block
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
                  id="userMessageEmail"
                  placeholder="seuEmail@gmail.com"
                  required
                />
              </div>
              <div className="form-group mb-6">
                <label
                  htmlFor="userMessageName"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Sua Mensagem
                </label>
                <textarea
                  className="
                    form-control
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                     "
                  id="exampleFormControlTextarea13"
                  rows={3}
                  placeholder="Digite aqui, sua dúvida, ideia ou reclamação"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="
                    w-full
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
