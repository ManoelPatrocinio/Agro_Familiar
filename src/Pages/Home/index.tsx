import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { ModalRegister } from "../../Components/ModalRegister";
import { SectionTitle } from "../../Components/SectionTitle";

export function Home() {
  return (
    <>
      <Header />
      <Carrousel />

      <main className="w-full flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Destaques"} className={"my-6 w-full"} />
        <Dropdrown
          items={["Menor Preço", "Maior Preço", "De A a Z", "De Z a A"]}
        />
        <div className="w-full flex flex-wrap justify-around pt-4 ">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </main>
      <ModalRegister />

      <Footer />
    </>
  );
}
