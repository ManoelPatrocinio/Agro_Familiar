import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";



export function Home() {
  return ( 
    <>
      <Header/>
      <Carrousel/>
      
      <section className="flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Destaques"} className={ "my-6"}/>
        <Dropdrown/>
        <div className="w-full flex flex-wrap justify-around ">
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
        </div>
      </section>
    </>
  );
}
