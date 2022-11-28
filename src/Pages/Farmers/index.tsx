import { CardEntity } from "../../Components/CardEntity";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

export function Farmers() {
  return (
    <>
      <Header />
      <Carrousel />
      <main className=" w-full flex items-start flex-col px-6 md:px-20">
        <SectionTitle title="Produtores" className={"my-6 w-full"} />
        <Dropdrown />

        <div className="w-full flex flex-wrap justify-around ">
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
          <CardEntity type="farmer" />
        </div>
      </main>
      <Footer />
    </>
  );
}
