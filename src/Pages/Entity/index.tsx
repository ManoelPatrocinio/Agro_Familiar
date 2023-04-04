import { DotsThreeVertical, Funnel } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CardProduct } from "../../Components/CardProduct";
import { Dropdrown } from "../../Components/Dropdrown";
import { Filter_category } from "../../Components/Filter_category";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Product } from "../../Types/product.type";
import { User } from "../../Types/user.type";
import Icon_WhatsApp from "../../assets/images/icon-whatsapp.svg";
import entity_profile from "../../assets/images/img_entity_profile_exemple.png";
import header_background from "../../assets/images/img_header_exemple.png";
import Star from "../../assets/images/star_icon.png";
import { api } from "../../hook/useApi";

export function Entity() {
  const [productData, setProductData] = useState<Product[]>();
  const [entityData, setEntityData] = useState<User>();
  const [productFiltedByCategory, setProductFiltedByCategory] = useState<
    Product[]
  >([]);

  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const { userId } = useParams();
  useEffect(() => {
    api
      .get(`/getEntityAndProducts/${userId}`)
      .then((response) => {
        // console.log("response.data", response.data);
        setEntityData(response.data.entity);
        setProductData(response.data.products);

        // setProductData(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível  exibir as organizações da sua região.",
        });
      });
  }, [userId]);

  function filterByCategory(category: string) {
    setSearch("");
    const filtedList = productData?.filter(
      (item) => item.p_category === category
    );
    filtedList && setProductFiltedByCategory(filtedList);
  }

  const filteredProdList =
    search.length > 0
      ? productData?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <div className="w-full h-40 md:h-[27rem] md:min-h-[60vh] relative mt-4">
        <img
          src={header_background}
          alt="foto de capa"
          className="w-full h-full  "
        />
        <div className=" w-full absolute top-[7rem] md:top-[87%] flex flex-col md:flex-row  justify-between items-center md:items-end md:px-16 ">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="w-[7rem] h-[7rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%]">
              <img
                src={entity_profile}
                alt="foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center md:items-start justify-evenly px-4 pb-4">
              <h4 className="text-sm md:text-lg text-center md:text-left text-palm-700 font-display font-semibold pt-3 md:pt-0">
                {entityData?.u_type === "farmer"
                  ? entityData.u_full_name
                  : entityData?.u_entity_name}
              </h4>
              <p className="text-xs md:text-sm text-gray-400 font-semibold">
                {" "}
                {entityData?.u_city}
              </p>

              <div className="flex md:w-1/4 items-center justify-start">
                <span className="text-xs md:text-sm text-gray-400"> 4.6 </span>
                <img
                  src={Star}
                  className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
                />
                <span className="text-xs md:text-xs text-gray-400">(202)</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center pt-8">
            <div className="dropstart relative">
              <button
                className="
                    dropdown-toggle
                    py-2.5
                    flex
                    items-center
                    whitespace-nowrap
                  "
                type="button"
                id="dropdownMenuButton1s"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <DotsThreeVertical size={38} weight="bold" color="#789B3D" />
              </button>
              <ul
                className="
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  "
                aria-labelledby="dropdownMenuButton1s"
              >
                <li>
                  <Link
                    className="
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      "
                    to={`/Entity-info/${entityData?._id}`}
                  >
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-20 mt-[10rem]">
        <div className="w-full flex justify-between items-center mb-6 md:mb-8 ">
          <div>
            <h4 className="w-full text-sm md:text-left md:text-lg text-gray-800  font-medium">
              Todos os Podutos
            </h4>
            <p className="w-full mx-auto   text-xs md:text-left md:text-sm text-gray-400">
              {" "}
              122 items{" "}
            </p>
          </div>
          <div className="flex md:hidden  justify-center ">
            <div className="dropstart relative">
              <button
                className="
                    dropdown-toggle
                    py-2.5
                    flex
                    items-center
                    whitespace-nowrap
                  "
                type="button"
                id="dropdownMenuButton1s"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <DotsThreeVertical size={38} weight="bold" />
              </button>
              <ul
                className="
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  "
                aria-labelledby="dropdownMenuButton1s"
              >
                <li>
                  <Link
                    className="
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      "
                    to={`/Entity-info/${entityData?._id}`}
                  >
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative w-full flex items-start justify-between ">
          <Filter_category
            ToggleFilterVisibility={SetToggleFilterVisibility}
            mobileVisiblity={toggleFilterVisibility}
            filterByCategory={filterByCategory}
          />
          <div className="w-full md:w-3/4 flex flex-col  items-start">
            <div className="w-full flex justify-between md:justify-start ">
              <Dropdrown
                items={["Menor Preço", "Maior Preço", "De A a Z", "De Z a A"]}
              />
              <button
                onClick={() =>
                  SetToggleFilterVisibility(!toggleFilterVisibility)
                }
                className=" md:hidden text-xs text-gray-800 flex items-center whitespace-nowrap "
              >
                <Funnel size={20} className="mr-2" />
                Filtrar
              </button>
            </div>
            <div className="w-full flex flex-wrap justify-around mt-4 relative">
              {search?.length > 0 && (
                <>
                  {filteredProdList?.map((product) => (
                    <CardProduct product={product} key={product._id} />
                  ))}
                </>
              )}

              {productFiltedByCategory.length > 0 &&
                search?.length === 0 &&
                productFiltedByCategory?.map((product) => (
                  <CardProduct product={product} key={product._id} />
                ))}

              {productFiltedByCategory.length === 0 &&
                search?.length === 0 &&
                productData?.map((product) => (
                  <CardProduct product={product} key={product._id} />
                ))}
            </div>
          </div>
          <a
            href={`http://api.whatsapp.com/send?l=pt_BR&phone=+55${entityData?.u_main_contact}&text=Olá, tudo bem ? Encontrei seu contato no Portal Agro Familiar `}
            className="fixed bottom-6 right-7 w-[4rem] h-[4rem]"
            target="_blank"
          >
            <img src={Icon_WhatsApp} className="w-full h-full scale-x-[-1]" />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
