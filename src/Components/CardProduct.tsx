import { Link } from "react-router-dom";
import { Product } from "../Types/product.type";
import { IconAddList } from "./IconAddList";

type Prop = {
  product: Product;
  addPurchaseList: any;
};

export function CardProduct({ product, addPurchaseList }: Prop) {
  return (
    <div className="w-[20rem] md:w-[16rem] h-[20rem] flex flex-col  mb-4 md:mb-8 hover:scale-110 transition duration-300 ease-in-out rounded-lg shadow-lg bg-white ">
      <Link
        to={`/Product-detail/${product._id}`}
        className="block h-[57%] w-full"
      >
        <img
          className="rounded-t-lg w-full h-full"
          src={product.p_images![0]}
          alt={product.p_name}
          loading="lazy"
        />
      </Link>
      <div className="py-4 px-3 w-full h-[43%]">
        <h5 className="w-full h-[1.25rem] overflow-y-auto text-center text-gray-700 text-sm font-medium mb-2">
          {product.p_name}
        </h5>

        <div className="w-full flex justify-center items-center text-base mb-4">
          <span className=" text-sm text-green-600"> R$ {product.p_price}</span>
          <span className=" text-sm text-gray-400 line-through ml-3 ">
            {" "}
            R$ {product.p_old_price}
          </span>
        </div>
        <button
          type="button"
          className="checked:bg-blue-500 w-full flex items-center justify-center py-4 md:py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-slate-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => addPurchaseList(product)}
        >
          <IconAddList w={"20"} h={"20"} color="#fff" className="mr-1" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
