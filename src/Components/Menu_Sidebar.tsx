import {
  House,
  List,
  MapPinLine,
  ToteSimple,
  User,
  UsersThree,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { Login } from "./Login";

export function Menu_Sidebar() {
  return (
    <div className="md:hidden">
      <button
        className="md:hidden"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <List size={32} color="#789B3D" className="md:hidden" />
      </button>

      <div
        className="offcanvas offcanvas-start w-[90vw] fixed bottom-0 flex 
        flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none
        transition duration-300 ease-in-out text-gray-700 top-0 left-0 border-none "
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="w-full h-auto flex items-center justify-between border-b-[1px] py-6 px-2 border-palm-700">
          <div className="dropdown relative   items-center">
            <button
              className="
              flex  
              text-left
              font-body
              text-xs 
              font-semibold
              text-palm-700 ml-2         
            "
              type="button"
              id="dropdownLogin"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size={32} color="#789B3D" weight="fill" className="mr-3" />
              Login / <br /> Registre-se{" "}
            </button>
            <div
              className="
                dropdown-menu
                min-w-max
                absolute
                w-[100%]
                h-[26rem]
                top-[4rem]
                left-[0]
                bg-white
                z-50
                float-left
                px-4
                py-8
               text-left
                rounded-lg
                shadow-lg
                mt-1
                hidden
                m-0
                bg-clip-padding
                border
                border-gray-200
              "
              aria-labelledby="dropdownLogin"
            >
              <Login />
            </div>
          </div>
          <button
            type="button"
            className="btn-close box-content w-4 h-4 p-2 -my-5  text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline mr-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <ul className="w-full  flex flex-col items-center justify-evenly mt-8 ">
          <li className="w-full px-2 py-4   ">
            {" "}
            <Link
              to="/"
              className="flex items-end text-left text-lg text-palm-700 font-normal font-display "
            >
              <House size={28} weight="fill" className="mr-3" />
              Início
            </Link>
          </li>
          <li className="w-full  px-2 py-4  ">
            {" "}
            <Link
              to="/Products"
              className="flex items-end  text-left text-lg text-palm-700 font-normal font-display"
            >
              <ToteSimple size={28} weight="fill" className="mr-3" />
              Produtos
            </Link>
          </li>
          <li className="w-full px-2 py-4  ">
            {" "}
            <Link
              to="/Entities"
              className="flex items-end text-left text-lg text-palm-700 font-normal font-display"
            >
              <UsersThree size={28} weight="fill" className="mr-3" />
              Associações/Cooperativas
            </Link>
          </li>
          <li className="w-full  px-2 py-4  ">
            {" "}
            <Link
              to="/"
              className="flex items-end  text-left text-lg text-palm-700 font-normal font-display"
            >
              <User size={28} weight="fill" className="mr-3" />
              Produtores
            </Link>
          </li>
          <li className="w-full  px-2 py-4  ">
            {" "}
            <Link
              to="/"
              className="flex items-end text-left text-lg text-palm-700 font-normal font-display"
            >
              <MapPinLine size={28} weight="fill" className="mr-3" />
              Territórios
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
