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
        <section className=" w-full flex items-start flex-col px-8 md:px-20">
          <SectionTitle title="Associações" className={"my-6 w-full"} />

          <div className="w-full flex justify-around py-3 ">
            <h4 className=" text-lg font-display text-gray-800">Associações</h4>
            <h4 className=" text-lg font-display text-gray-800">
              Produtores Individuais
            </h4>
            <h4 className=" text-lg font-display text-gray-800">
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