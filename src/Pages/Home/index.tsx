import { User, UsersThree } from "phosphor-react";
import { Link } from "react-router-dom";
import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

export function Home() {
  return (
    <>
      <Header />
      <Carrousel />

      <main className="w-full flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Destaques"} className={"my-6 w-full"} />
        <Dropdrown />
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
        <div className="w-full md:h-[22rem] h-auto bg-[url('https://i.ibb.co/2MRTyb9/banner-join-Us.jpg')] bg-no-repeat bg-[length:100%_100%] rounded">
          <div className="bg-[rgba(0,0,0,0.7)] w-full h-full px-2 py-8 rounded ">
            <h3 className="w-full text-center text-md text-white font-bold mb-4">
              Faça parte do Potal Agro Familiar
            </h3>
            <p className="w-full text-justify md:text-center text-sm text-white mb-8 leading-6">
              Esse portal foi criado como objetivo de aumentar a visubilidade e
              os meios de divulgação das Associações, Cooperativas e produtores
              individuais, além de trazer maior proximidade com o consumidor
              interessado em produtos da agricultura familiar de sua região.
              <br />
              <span className="underline decoration-1 ">
                {" "}
                Gostaria de ver sua produção divulgada neste portal ?
              </span>
            </p>
            <div className="w-full h-auto flex  flex-wrap justify-around items-center">
              <Link
                to="/Register-entity"
                className="w-[17rem] h-[7.5rem] border border-white flex flex-col justify-center items-center py-4 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <UsersThree size={48} color="white" weight="fill" />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro como Associação
                </span>
              </Link>
              <Link
                to="/Register-entity"
                className="w-[17rem] h-[7.5rem] border border-white flex flex-col justify-center items-center py-4 my-6 md:my-0 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <User size={48} color="white" weight="fill" />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro como Produtor Individual
                </span>
              </Link>
              <Link
                to="/Register-entity"
                className="w-[17rem] h-[7.5rem] border border-white flex flex-col justify-center items-center py-4 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <UsersThree size={48} color="white" weight="fill" />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro como Cooperativa
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
