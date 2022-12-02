import { User, UsersThree } from "phosphor-react";
import { Link } from "react-router-dom";
import { CardEntity } from "../../Components/CardEntity";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";

export function Entities() {
  return (
    <>
      <Header />
      <Carrousel />
      <main className=" w-full flex items-start flex-col px-6 md:px-20">
        <SectionTitle title="Entidades" className={"my-6 w-full"} />

        <div className="w-full flex justify-around py-3 ">
          <h4 className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800">
            Associações
          </h4>
          <h4 className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800">
            Produtores Individuais
          </h4>
          <h4 className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800">
            Cooperativas
          </h4>
        </div>
        <Dropdrown />

        <div className="w-full flex flex-wrap justify-around ">
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
          <CardEntity type="entity" />
        </div>
        <div className="w-full min-h-[10%] bg-bg-joinUs bg-no-repeat bg-[length:100%_100%]   rounded">
          <div className="bg-[rgba(0,0,0,0.7)] w-full h-full px-2 py-8 rounded">
            <h3 className="w-full text-center text-md text-white font-bold mb-4">
              Faça parte do Potal Agro Familiar
            </h3>
            <p className="w-full text-justify md:text-center text-sm text-white mb-8 leading-6">
              {" "}
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
            <div className="w-full flex  flex-wrap justify-around">
              <Link
                to="/Register-entity"
                className="w-[17rem] border border-white flex flex-col justify-center items-center py-4 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <UsersThree size={48} color="white" />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro como Associação
                </span>
              </Link>
              <Link
                to="/Register-entity"
                className="w-[17rem] border border-white flex flex-col justify-center items-center py-4 my-6 md:my-0 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <User size={48} color="white" />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro como Produtor Individual
                </span>
              </Link>
              <Link
                to="/Register-entity"
                className="w-[17rem] border border-white flex flex-col justify-center items-center py-4 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <UsersThree size={48} color="white" />
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
