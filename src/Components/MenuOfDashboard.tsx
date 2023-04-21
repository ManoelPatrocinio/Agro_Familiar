import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserLoggedContextType } from "../Types/Contexts.type";
import Logo from "../assets/images/Logo.png";
import { UserLoggedContext } from "../context/UserLoggedContext";

export function MenuOfDashboard() {
  const { userLogged } = useContext(UserLoggedContext) as UserLoggedContextType;
  return (
    <div className="w-full h-full flex flex-col justify-start items-center relative">
      <button
        type="button"
        className="md:hidden absolute right-0 top-1 btn-close box-content w-4 h-4 p-2   text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline mr-3"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <Link to="/" className="w-[11rem] h-20 mt-4 mb-8">
        {" "}
        <img
          src={Logo}
          alt="Logo"
          className="w-full object-cover"
          loading="lazy"
        />
      </Link>
      <ul className=" w-full h-full px-2 ">
        <li className="w-full  bg-palm-700  my-2  rounded hover:bg-palm-500">
          <Link
            to={`/Admin/my-profile/${userLogged?._id}`}
            className="block w-full h-full px-4 py-3 text-left text-white text-md  font-semibold"
          >
            Meu Perfil
          </Link>{" "}
        </li>
        <li className="w-full  bg-palm-700  my-2  rounded hover:bg-palm-500">
          <Link
            to="/Admin/create-product"
            className="block w-full h-full px-4 py-3 text-left text-white text-md  font-semibold"
          >
            Cadastrar Produto
          </Link>{" "}
        </li>
        <li className="w-full  bg-palm-700  my-2  rounded hover:bg-palm-500">
          <Link
            to={`/Admin/manager/${userLogged?._id}`}
            className="block w-full h-full px-4 py-3 text-left text-white text-md  font-semibold"
          >
            Gerenciar produtos
          </Link>{" "}
        </li>
        <li className="w-full  bg-palm-700  my-2  rounded hover:bg-palm-500">
          <Link
            to={`/my-shop/${userLogged._id}`}
            className="block w-full h-full px-4 py-3 text-left text-white text-md  font-semibold"
          >
            Ir p/ o site
          </Link>{" "}
        </li>
        <li className="w-full  bg-palm-700  my-2  rounded hover:bg-palm-500">
          <Link
            to="#"
            className="block w-full h-full px-4 py-3 text-left text-white text-md  font-semibold"
          >
            Ajuda
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
}
