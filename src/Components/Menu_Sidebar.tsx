import classNames from "classnames";
import { User, X } from "phosphor-react";
import { Link } from "react-router-dom";

type PropsHeader = {
    toggleMenuVisibility: any
    valueMenu:boolean,
   
  }
  
export function Menu_Sidebar ({toggleMenuVisibility,valueMenu}:PropsHeader){
    return(
        <div className={classNames(
            "block fixed top-0 min-h-screen h-auto w-[90%] z-20  px-2 bg-white  shadow-md shadow-gray-400 transition-all ",
            {
                "left-0":valueMenu,
                "left-[-90%]":!valueMenu
            }
            
        )
        }>
            <X size={32} color="#789B3D"   className="absolute right-0 top-0" onClick={()=>toggleMenuVisibility(!valueMenu)}/>
            <div className="w-full h-auto flex items-center border-b-[1px] py-6 px-2 border-palm-700">
                <User size={32} color="#789B3D" />
                <Link to="/Login" className=" font-body text-sm font-medium text-palm-700 ml-2" >Login / <br/>  Registre-se </Link>
            </div>

            <ul  className="w-full  flex flex-col items-center justify-evenly mt-8 pl-2">
                <li className="w-full py-4" >  <Link to="/" className="text-left text-lg text-palm-700 font-normal font-display ">Início</Link></li>
                <li className="w-full py-4" >  <Link to="/Products" className=" text-left text-lg text-palm-700 font-normal font-display">Produtos</Link></li>
                <li className="w-full py-4" >  <Link to="/Entities" className=" text-left text-lg text-palm-700 font-normal font-display">Associações/Cooperativas</Link></li>
                <li className="w-full py-4" >  <Link to="/" className="text-left text-lg text-palm-700 font-normal font-display">Produtores</Link></li>
                <li className="w-full py-4" >  <Link to="/" className="text-left text-lg text-palm-700 font-normal font-display">Territórios</Link></li>
            </ul>

        </div>
    )
}