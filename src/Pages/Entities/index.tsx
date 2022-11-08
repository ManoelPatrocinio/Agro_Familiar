import { CardEntity } from "../../Components/CardEntity";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";



export function Entities (){
    return (
      <>
        <Header />
        <Carrousel />
        <section className=" w-full flex items-start flex-col px-6 md:px-20">
          <SectionTitle title="Associações" className={"my-6 w-full"} />

          <div className="w-full flex justify-around py-3 ">
            <h4 className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800">Associações</h4>
            <h4 className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800">
              Produtores Individuais
            </h4>
            <h4 className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800">
              Cooperativas
            </h4>
          </div>
            <Dropdrown />
          
            <div className="w-full flex flex-wrap justify-around ">
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
              <CardEntity/>
            </div>
          
        </section>
      </>
    );
}