import { Link } from "react-router-dom";
import IconFacebook from "../assets/images/icon-facebook.svg";
import IconInstagram from "../assets/images/icon-instragam.svg";
import IconWhatsapp from "../assets/images/icon-whatsapp.svg";

const phone = import.meta.env.VITE_PORTAL_PHONE;
const instagram = import.meta.env.VITE_PORTAL_INSTAGRAM;
const linkWhatsapp = `https://api.whatsapp.com/send?phone=${phone}`;

export function Footer() {
  return (
    <footer className="w-full  border-t border-gray-200 mt-10 py-8">
      <div className="w-full flex flex-col md:flex-row  item-center justify-between px-10 md:px-14 mb-10">
        <div className="w-full md:w-auto text-left md:max-w-[30%] mb-4 md:mb-0">
          <p className="w-full text-center md:text-left text-sm font-semibold text-palm-700 mb-6">
            Portal Agro Familiar
          </p>
          <p className="w-full text-justify md:text-left text-sm text-gray-800">
            Somos a ponte entre o consumidor e os produtores famliliares da sua
            região.
          </p>
        </div>
        <div className="w-full md:w-auto text-left my-4 md:my-0 ">
          <p className="w-full text-sm font-semibold text-palm-700 mb-6">
            Informações e Ajuda
          </p>
          <ul className="w-full ">
            <li className="text-sm text-gray-800 py-2 hover:text-palm-700 transition-all">
              Política de privacidade
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              {" "}
              Termos de Uso{" "}
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              {" "}
              <Link to="/ContactUs"> Fale Conosco </Link>{" "}
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/AboutUs"> Sobre Nós </Link>
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              {" "}
              FAQ
            </li>
          </ul>
        </div>
        <div className="hidden md:block w-full md:w-auto text-left">
          <p className="text-sm text-palm-700 font-semibold mb-6">Serviços</p>
          <ul className="w-full">
            <li className="text-sm text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/"> Início </Link>
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/Products"> Produtos </Link>
            </li>
          
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/Farmers"> Produtores </Link>
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/Entities"> Assocs/Coops </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-left my-4 md:my-0">
          <p className="text-sm text-palm-700 font-semibold mb-6">
            Criar Conta
          </p>
          <ul className="w-full">
            <li className="text-sm text-gray-800 py-2 hover:text-palm-700 transition-all">
              Cliente
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/Register-farmer"> Produtor Individual</Link>
            </li>
            <li className="text-xs text-gray-800 py-2 hover:text-palm-700 transition-all">
              <Link to="/Register-entity">Associação/Cooperativa</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-left">
          <p className="text-sm text-center md:text-left text-palm-700 mb-6">
            Redes Sociais
          </p>

          <div className="flex justify-between items-center">
            <a href={linkWhatsapp} className="w-9 h-9" target={"_blank"}>
              <img
                className="w-full h-full"
                src={IconWhatsapp}
                alt="whatsApp"
                loading="lazy"
              />
            </a>
            <a href={instagram} className="w-9 h-9 mx-8" target={"_blank"}>
              <img
                className="w-full h-full"
                src={IconInstagram}
                alt="Instagram"
                loading="lazy"
              />
            </a>
            <img
              className="w-9 h-9"
              src={IconFacebook}
              alt="Facebook"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <p className="w-full text-center text-sm text-gray-800 ">
        {" "}
        Copyright (©) Manoel Patrocinio, 2022.
      </p>
    </footer>
  );
}
