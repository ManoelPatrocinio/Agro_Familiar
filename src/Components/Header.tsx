import Logo from "../assets/images/Logo.png"
import { MagnifyingGlass, User,ClipboardText,List } from "phosphor-react";

export function Header() {
  return (
    <header className="w-full px-5 md:px-14">
      <nav  className="navbar py-2  bg-white relative flex items-center w-full justify-between">
        <List size={32} color="#789B3D" className="md:hidden"/>
        <div className="header-form-search hidden md:flex items-end w-[25%]">
          <button className="w-10 h-10">
            <MagnifyingGlass size={32} color="#789B3D" mirrored/>
          </button>
          <input 
            type="text" 
            placeholder="Busque Aqui..."
            className="w-10/12 p-2 border-b-[1px] border-palm-700 rounded-br focus:outline-none"
          />
        </div>
        <div className="w-20 h-20 mt-2"> <img src={Logo} alt="Logo" className="w-full object-cover"/></div>
        <div className="header-icons-left w-10 md:w-[25%] flex  justify-end">
          <div className=" h-10 mr-6 hidden md:flex items-center">
            <User size={32} color="#789B3D" />
            <a href="/Login" className=" font-body text-xs font-semibold text-palm-700 ml-2" >Login / <br/>  Registre-se </a>
          </div>
          <button className="w-10 h-9 relative">
            <ClipboardText size={36} color="#789B3D"/>
            <span className="w-5 h-5 rounded-2xl bg-palm-700 text-white text-xs text-center leading-5 absolute top-[-6px] right-[-2px]">2</span>         
          </button>
        </div>

      
      </nav>
      <ul  className="w-full hidden max-h-8 h-8 md:flex items-center justify-evenly mt-8">
        <li>  <a href="/" className="text-lg text-palm-700 font-normal font-display ml-16">Início</a></li>
        <li>  <a href="/" className="text-lg text-palm-700 font-normal font-display">Produtos</a></li>
        <li>  <a href="/Entities" className="text-lg text-palm-700 font-normal font-display">Associações/Cooperativas</a></li>
        <li>  <a href="/" className="text-lg text-palm-700 font-normal font-display">Produtores</a></li>
        <li>  <a href="/" className="text-lg text-palm-700 font-normal font-display">Territórios</a></li>
      </ul>

      <div className="relative w-full h-10 mt-4 md:hidden">
        <input 
          type="text" 
          placeholder="Busque Aqui..."
          className="w-full h-full pl-2 border-[1px] rounded border-palm-700  focus:outline-none"
        />
        <MagnifyingGlass 
          size={24} 
          color="#789B3D" 
          className="absolute right-2 top-2"
        />

       </div>
    </header>
  );
}
