import { Link } from "react-router-dom";
import { IconAddList } from "./IconAddList";

export function CardProduct() {
  return (
    <div className="w-[16rem] h-auto min:h-[20rem] mb-4 md:mb-8 flex justify-center hover:scale-110 transition duration-300 ease-in-out">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <Link to="/Product-detail">
          <img
            className="rounded-t-lg "
            src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
            alt=""
          />
        </Link>
        <div className="py-4 px-3">
          <h5 className="w-full text-center text-gray-900 text-md font-medium mb-2">
            Product Name
          </h5>
          <div className="w-full flex justify-center items-center text-base mb-4">
            <span className=" text-sm text-green-600"> R$ 5,00</span>
            <span className=" text-sm text-gray-400 line-through ml-3 ">
              {" "}
              R$ 5,67
            </span>
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center  py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
          >
            <IconAddList w={"20"} h={"20"} color="#fff" className="mr-1" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
