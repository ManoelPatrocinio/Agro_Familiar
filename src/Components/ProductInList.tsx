import classNames from "classnames";
import { Product } from "../Types/product.type";
import Icon_edit from "../assets/images/icon-edit.png";
import Icon_trash from "../assets/images/icon-trash.png";
import Icon_disable from "../assets/images/icon-visible-desable.png";

interface IProp {
  product: Product;
}
export function ProductInList({ product }: IProp) {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start mb-6 border border-palm-500 p-3 rounded">
      {/* <img
        src={ProductExemple}
        alt=""
        className="w-full md:w-[15rem] h-full rounded mr-4"
        loading="lazy"
      /> */}

      <div
        id={"caroulsel_prodInListImg" + `${product._id}`}
        className="carousel slide carousel-fade relative  w-full md:w-[15rem] md:h-[10.8rem] h-full rounded mr-4 "
        data-bs-ride="carousel"
        data-bs-interval="false"
      >
        <div className="carousel-inner relative w-full h-full overflow-hidden rounded">
          {product?.p_images?.map((img, index) => (
            <div
              className={classNames("carousel-item float-left h-full", {
                "active  w-full": index === 0,
                " w-full": index != 0,
              })}
              key={index}
            >
              <img
                src={img}
                className="block w-full h-full"
                alt="imagem do produto"
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target={"#caroulsel_prodInListImg" + `${product._id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target={"#caroulsel_prodInListImg" + `${product._id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="w-full md:w-[70%] h-full text-left flex flex-col justify-between ">
        <div className="w-full flex flex-col md:flex-row justify-start items-center">
          <div className="w-full md:w-1/2 text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">
              Nome/Título
            </h4>
            <p className="w-full text-gray-500 text-sm"> {product.p_name}</p>
          </div>
          <div className="w-full md:w-1/2 text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">
              Categoria
            </h4>
            <p className="w-full text-gray-500 text-sm">
              {" "}
              {product.p_category}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between md:justify-start items-center">
          <div className="w-full md:w-1/2 text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">
              Preço Atual
            </h4>
            <p className="w-full text-gray-500 text-sm">R$ {product.p_price}</p>
          </div>
          <div className="w-full md:w-1/2 text-right md:text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">
              Preço Antigo
            </h4>
            <p className="w-full text-gray-500 text-sm">
              {" "}
              R$ {product.p_old_price}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-evenly items-center mt-4 md:mt-0">
          <button className="text-center text-sm text-palm-700">
            {" "}
            <img
              className="mx-auto"
              src={Icon_trash}
              alt="icone deletar"
              loading="lazy"
            />
            Deletar
          </button>
          <button className="text-center text-sm text-palm-700">
            {" "}
            <img
              className="mx-auto"
              src={Icon_edit}
              alt="icone editar"
              loading="lazy"
            />
            Editar
          </button>
          <button className="text-center text-sm text-palm-700">
            {" "}
            <img
              className="mx-auto"
              src={Icon_disable}
              alt="icone desativar"
              loading="lazy"
            />
            Desativar
          </button>
        </div>
      </div>
    </div>
  );
}
