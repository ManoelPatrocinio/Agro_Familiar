import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CardEntity } from "../../Components/CardEntity";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import { Load_spinner } from "../../Components/load_spinner";
import { User } from "../../Types/user.type";
import entitiesPromotionImage1 from "../../assets/images/banner_joinUs.jpeg";
import iconFarmeWhite from "../../assets/images/icon-farmer-white.png";
import iconEntityWhite from "../../assets/images/icone-entity-white.png";
import { api } from "../../hook/useApi";

export function Entities() {
  const [entityData, setEntityData] = useState<User[]>();
  const [filtedEntityList, setFiltedEntityList] = useState<
    "farmer" | "coop" | "assoc"
  >("assoc");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    api
      .get("/all-entity")
      .then((response) => {
        setEntityData(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível  exibir as organizações da sua região.",
        });
      });
  }, []);

  function filtedEntity() {
    return entityData?.filter((entity) => entity.u_type === filtedEntityList);
  }
  const filteredEntityList =
    search.length > 0
      ? entityData?.filter((product) =>
          product.u_entity_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <Carrousel />
      <main className=" w-full flex items-start flex-col px-6 md:px-20">
        <SectionTitle title="Entidades" className={"my-6 w-full"} />

        <div className="w-full flex justify-around py-3 ">
          <button
            onClick={() => setFiltedEntityList("assoc")}
            className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800"
          >
            Associações
          </button>
          <button
            onClick={() => setFiltedEntityList("farmer")}
            className="mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800"
          >
            Produtores Individuais
          </button>
          <button
            onClick={() => setFiltedEntityList("coop")}
            className="mx-2 md:mx-0  text-sm md:text-lg font-display text-center text-gray-800"
          >
            Cooperativas
          </button>
        </div>
        <Dropdrown items={["De A a Z", "De Z a A"]} />

        <div className="w-full flex flex-wrap justify-around ">
          {!entityData && (
            <Load_spinner
              adicionalClass="w-screen h-screen"
              message="Carregando ..."
            />
          )}
          {search.length > 0 ? (
            <>
              <>
                {filteredEntityList?.map((entity, index) => (
                  <CardEntity entity={entity} key={index} />
                ))}
              </>
            </>
          ) : (
            <>
              {filtedEntity() && (
                <>
                  {filtedEntity()?.map((entity, index) => (
                    <CardEntity entity={entity} key={index} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div
          className="w-full  h-auto  bg-no-repeat bg-[length:100%_100%] rounded"
          style={{ backgroundImage: `url(${entitiesPromotionImage1})` }}
        >
          <div className="bg-[rgba(0,0,0,0.7)] w-full h-auto px-2 py-8 rounded ">
            <h3 className="w-full text-center text-md text-white font-bold mb-4">
              Faça parte do Potal Agro Familiar
            </h3>
            <p className="w-full text-justify md:text-center text-sm text-white mb-8 leading-6">
              Esse portal foi criado como objetivo de aumentar a visibilidade e
              os meios de divulgação das Associações, Cooperativas e produtores
              individuais, além, de trazer maior proximidade com o consumidor
              interessado em produtos da agricultura familiar da sua região.
              <br />
              <span className="underline decoration-1 ">
                {" "}
                Cadastre-se, e faça parte dessa iniciativa
              </span>
            </p>
            <div className="w-full h-auto flex  flex-wrap justify-around items-center">
              <Link
                to="/Register-entity"
                className="w-[17rem] h-[8.5rem] border border-white flex flex-col justify-center items-center  rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <img
                  src={iconEntityWhite}
                  alt="icon Cadastro como Associação"
                  className="h-[5.5rem] max-h-24 mx-auto"
                  loading="lazy"
                />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro de Assoc/Coop
                </span>
              </Link>
              <Link
                to="/Register-farmer"
                className="w-[17rem] h-[8.5rem] border border-white flex flex-col justify-center items-center py-4 my-6 md:my-0 rounded hover:scale-110 transition duration-300 ease-in-out"
              >
                <img
                  src={iconFarmeWhite}
                  alt="icon Cadastro como Associação"
                  className="h-[5.5rem] max-h-24 mx-auto"
                  loading="lazy"
                />
                <span className="w-full text-center text-sm text-white font-bold">
                  Cadastro como Produtor Individual
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
