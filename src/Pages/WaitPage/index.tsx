import { Carrousel } from "../../Components/Carrousel";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import imgBackgrounWaitPage from "../../assets/images/img_background_waitPage.svg";
import { Footer } from "../../Components/Footer";
export function WaitPage(){
    return (
      <>
        <Header />
        <Carrousel />
        <main className="px-8 md:px-20">
          <SectionTitle
            title="Página de Espera"
            className="my-8 w-full font-semibold md:font-normal"
          />
          <h3 className="w-full text-center text-lg text-palm-700">
            Formulário Enviado Com Sucesso !
          </h3>
          <img
            src={imgBackgrounWaitPage}
            alt="image formulario completo"
            className="md:w-[80%] h-[40vh] mx-auto mt-4 mb-0 md:my-8"
          />
          <p className="w-full text-justify md:text-center text-md text-gray-700 leading-9 mb-2">
            Agora o Administrador do portal entrará em contato com você, para
            validar as informações, e depois, liberar seu acesso como
            colaborador do portal.
          </p>
          <p className="w-full text-justify md:text-center text-md text-gray-700 ">
            Fique atento as suas mesagens no Whatsapp e e-mail{" "}
          </p>
        </main>
        <Footer/>
      </>
    );
}