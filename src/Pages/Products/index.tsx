import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

export function Products(){
    return(
        <>
            <Header/>
            <Carrousel/>
            
            <main className="flex items-start flex-col px-8 md:px-20">
            
                    <SectionTitle title={"Destaques"} className={ "my-6"}/>
                    <div className="w-full flex items-start justify-between mt-8">
                        <div className="w-1/4 border-[1px] border-palm-700 rounded px-4 py-2">
                            <h3 className="w-full text-center text-lg text-palm-700">Filtre Por:</h3>

                            <div className="w-full my-4"> 
                                <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">Agricultura</h5> 
                                <ul className="w-full text-left pl-2">
                                    <li className="w-full text-left text-sm my-1 py-1">Milho</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Feijão</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Mandioca</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Hotaliças</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Frutas</li>
                                </ul>
                            </div>
                            <div className="w-full my-4"> 
                                <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">Derivados</h5> 
                                <ul className="w-full text-left pl-2">
                                    <li className="w-full text-left text-sm my-1 py-1">Pães/Bolos/Biscoitos</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Doces</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Bebidas</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Tempores</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Outros</li>
                                </ul>
                            </div>
                            <div className="w-full my-4"> 
                            <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">Pecuária</h5> 
                                <ul className="w-full text-left pl-2">
                                    <li className="w-full text-left text-sm my-1 py-1">Bovinos</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Capríno/Ovínos</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Suínos</li>
                                    <li className="w-full text-left text-sm my-1 py-1"> Áves</li>
                                    <li className="w-full text-left text-sm my-1 py-1">Piscícultura</li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-3/4 flex flex-col  items-start">
                            <Dropdrown/>
                            <div className="w-full flex flex-wrap justify-around mt-4">
                                <CardProduct/>
                                <CardProduct/>
                                <CardProduct/>
                                <CardProduct/>
                                <CardProduct/>
                                <CardProduct/>
                                <CardProduct/>
                                <CardProduct/>
                            </div>
                          
                        </div>
                    </div>
                    
             
            </main>
      </>
    )
}