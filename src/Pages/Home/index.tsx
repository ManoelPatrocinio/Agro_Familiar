import { Carrousel } from "../../Components/Carrousel";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";



export function Home() {
  return ( 
    <>
      <Header/>
      <Carrousel/>
      <SectionTitle title={"Destaques"}/>
    </>
  );
}
