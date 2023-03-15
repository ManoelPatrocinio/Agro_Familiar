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
import entity_profile from "../../assets/images/img_entity_profile_exemple.png";
import header_background from "../../assets/images/img_header_exemple.png";
import Star from "../../assets/images/star_icon.png";
import { api } from "../../hook/useApi";
import { CheckLocalStorage } from "../../service/localStorage";
interface IPuchaseList {
  product: Product;
  quantity: number;
}
export function Entity() {
  const [productData, setProductData] = useState<Product[]>();
  const [entityData, setEntityData] = useState<User>();
  const [purchaseList, setPurchaseList] = useState<IPuchaseList[]>([]);
  const [productFiltedByCategory, setProductFiltedByCategory] = useState<
    Product[]
  >([]);
  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);

  const { userId } = useParams();
  useEffect(() => {
    api
      .get(`/all-products/${userId}`)
      .then((response) => {
        // console.log("response.data", response.data);
        setEntityData(response.data.entity[0]);
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
    setPurchaseList(CheckLocalStorage.getItemPurchaseList());
  }, [userId]);

  function filterByCategory(category: string) {
    const filtedList = productData?.filter(
      (item) => item.p_category === category
    );
    setProductFiltedByCategory(filtedList!);
  }
  const useAddToPuchaseList = (product: Product) => {
    // const item = products.find((product) => product._id === id);

    const alreadyInPuchaseList = purchaseList.find(
      (item) => item.product._id === product._id
    );

    if (alreadyInPuchaseList) {
      const newPuchaseList: IPuchaseList[] = purchaseList.map((item) => {
        if (item.product._id === product._id)
          ({
            ...item,
            quantity: item.quantity++,
          });
        return item;
      });
      setPurchaseList(newPuchaseList);
      localStorage.setItem("@PAF:purchase", JSON.stringify(newPuchaseList));
      console.log("adiconado alreadyInPuchaseList", newPuchaseList);
      return;
    }
    //if product is not already in puchase list
    const listItem: IPuchaseList = {
      product: product!,
      quantity: 1,
    };
    const newPuchaseList: IPuchaseList[] = [...purchaseList, listItem];
    setPurchaseList(newPuchaseList);
    localStorage.setItem("@PAF:purchase", JSON.stringify(newPuchaseList));
    console.log("adiconado ", newPuchaseList);
  };
  return (
    <>
      <Header />
      <div className="w-full h-40 md:h-[27rem] md:min-h-[60vh] relative mt-4">
        <img
          src={header_background}
          alt="foto de capa"
          className="w-full h-full  "
        />
        <div className=" w-full absolute top-[7rem] md:top-[87%] flex justify-between  items-center md:px-20">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="w-[7rem] h-[7rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%]">
              <img
                src={entity_profile}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center md:items-start justify-evenly px-4 pb-4">
              <h4 className="text-sm md:text-lg text-center md:text-left text-palm-700 font-display font-semibold md:mb-2">
                {" "}
                {entityData?.u_entity_name
                  ? entityData?.u_entity_name
                  : entityData?.u_full_name}
              </h4>{" "}
              <p className="text-xs md:text-sm text-gray-400 font-semibold md:mb-2">
                {" "}
                {entityData?.u_city}
              </p>
              <div className="flex w-1/4 items-center justify-start">
                <span className="text-xs md:text-sm text-gray-400"> 4.6 </span>
                <img
                  src={Star}
                  className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
                />
                <span className="text-xs md:text-xs text-gray-400">(202)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <div>
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
                      to="/Entity-info"
                    >
                      Sobre
                    </Link>
                  </li>
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
                      to="#"
                    >
                      Another action
                    </Link>
                  </li>
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
                      to="#"
                    >
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-20 mt-[10rem]">
        <div className="w-full mb-4 md:mb-8 ">
          <h4 className="w-full text-sm md:text-left md:text-lg text-gray-800  font-medium">
            Todos os Podutos
          </h4>
          <p className="w-full mx-auto   text-xs md:text-left md:text-sm text-gray-400">
            {" "}
            122 items{" "}
          </p>
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
            <div className="w-full flex flex-wrap justify-around mt-4">
              {productFiltedByCategory.length === 0 ? (
                <>
                  {productData?.map((product, index) => (
                    <CardProduct
                      product={product}
                      key={index}
                      addPurchaseList={useAddToPuchaseList}
                    />
                  ))}
                </>
              ) : (
                <>
                  {productFiltedByCategory?.map((product, index) => (
                    <CardProduct
                      product={product}
                      key={index}
                      addPurchaseList={useAddToPuchaseList}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
