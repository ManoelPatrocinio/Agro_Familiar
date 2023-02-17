import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { ModalRegister } from "../../Components/ModalRegister";
import { SectionTitle } from "../../Components/SectionTitle";
import imgHomePromation1 from "../../assets/images/header_slide_2.jpg"

export function Home() {
  return (
    <>
      <Header />
      <Carrousel />

      <main className="w-full flex items-start flex-col px-1 md:px-20">
        <SectionTitle title={"Destaques"} className={"my-6 w-full"} />
        <Dropdrown
          items={["Menor Preço", "Maior Preço", "De A a Z", "De Z a A"]}
        />
        <div className="w-full flex flex-wrap justify-around pt-4 px-0 ">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
        <div className="w-full  h-48 md:h-80 flex md:flex-col md:justify-center  items-end md:items-start bg-homePromotional-1 bg-no-repeat bg-[length:100%_100%] rounded">
          <div className="w-full md:w-1/2 md:ml-8 p-2 md:p-0 ">
            <h3 className="w-full  text-left text-sm md:text-xl text-white font-bold mb-4  drop-shadow-xl">
              Encontre e negocie diretamente com os produtores do sua região
            </h3>
            <p className="w-[80%] text-left text-xs md:text-md  text-white font-semibold mb-3 drop-shadow-xl ">
              Encontre aqui os principais produtores da sua região.{" "}
            </p>
            <p className="w-[80%] text-left text-xs md:text-md  text-white md:leading-8 font-semibold drop-shadow-xl">
              Além de informações e contato direto, para negociar preço e entrega. Tudo
              rápido, fácil e gratuito !
            </p>
          </div>
        </div>
      </main>
      <ModalRegister />

      <Footer />
    </>
  );
}
