import { Link, MagnifyingGlass, Question } from "phosphor-react";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import Logo from "../../../assets/images/Logo.png";
import { DashboardMenu } from "../../../Components/DashboardMenu";
import { ProductInList } from "../../../Components/ProductInList";

export function ManageProducts() {
  return (
    <>
      <header className="w-full md:hidden h-auto px-3 flex justify-between items-end">
        <Question size={40} color="#89B045" />
        <Link to="/" className="w-[9rem]  mt-4">
          {" "}
          <img src={Logo} alt="Logo" className="w-full object-cover" />
        </Link>
        <Menu_Sidebar type="admin" />
      </header>
      <div className="flex ">
        <div className="hidden md:block w-[30%] min-h-full border-r border-gray-200 ">
          <DashboardMenu />
        </div>
        <div className="w-full md:w-[70%] h-full px-8">
          <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8">
            Gerenciar de Produtos
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-between items-end mb-4 md:mb-10">
            <div className="form-search hidden w-[33%] md:flex items-end ">
              <button className="w-10 h-10">
                <MagnifyingGlass size={32} color="#789B3D" mirrored />
              </button>
              <input
                type="text"
                placeholder="Busque Aqui..."
                className="w-10/12  text-sm text-gray-400 p-2 border-b-[1px] border-palm-700 rounded-br focus:outline-none"
              />
            </div>
            <div className="relative w-full h-12 mb-12 md:mb-8 md:hidden ">
              <input
                type="text"
                placeholder="Busque Aqui..."
                className="w-full h-full pl-2  border-[1px] rounded border-palm-700  focus:outline-none"
              />
              <MagnifyingGlass
                size={24}
                color="#789B3D"
                className="absolute right-2 top-2"
              />
            </div>
            <div className="w-full md:w-[33%] flex items-end justify-start">
              <label
                htmlFor="manageSelectCategory"
                className="form-label inline-block  text-palm-700 mr-2"
              >
                Filtrar por:
              </label>

              <select
                id="manageSelectCategory"
                className="form-select appearance-none
                      block
                      
                      px-3
                      
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border-b border-solid border-palm-700
                      rounded
                      transition
                      ease-in-out
                      m-0
                      cursor-pointer
                      focus:text-gray-700 focus:bg-white focus:outline-none"
                aria-label="Default select example"
              >
                <option selected>Selecione</option>
                <optgroup label="Agricultura">
                  <option value="Milho">Milho</option>
                  <option value="Feijão">Feijão</option>
                  <option value="Mandioca">Mandioca</option>
                  <option value="Hotaliças">Hotaliças</option>
                  <option value="Frutas">Frutas</option>
                </optgroup>
                <optgroup label="Deriados">
                  <option value="Pães/Bolos/Biscoitos">
                    Pães/Bolos/Biscoitos
                  </option>
                  <option value="Doces">Doces </option>
                  <option value="Bebidas">Bebidas </option>
                  <option value="Tempores">Tempores</option>
                  <option value="Outros">Outros</option>
                </optgroup>
                <optgroup label="Pecuária">
                  <option value="Bovinos">Bovinos </option>
                  <option value="Capríno/Ovínos">Capríno/Ovínos </option>
                  <option value="Suínos">Suínos </option>
                  <option value=" Áves"> Áves</option>
                  <option value="Piscícultura">Piscícultura</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div className="w-full md:[30%] h-screen overflow-y-auto flex flex-col justify-start items-start pr-2">
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
            <ProductInList />
          </div>
        </div>
      </div>
    </>
  );
}
