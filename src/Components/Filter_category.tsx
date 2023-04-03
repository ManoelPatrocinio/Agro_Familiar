import classNames from "classnames";
import { X } from "phosphor-react";

type FilterProps = {
  ToggleFilterVisibility: any;
  mobileVisiblity: boolean;
  filterByCategory: (category: string) => void;
};
export function Filter_category({
  ToggleFilterVisibility,
  mobileVisiblity,
  filterByCategory,
}: FilterProps) {
  return (
    <div
      className={classNames(" transition-all", {
        "block fixed right-[-2rem] top-[0] min-h-screen h-auto w-[90%] z-10 py-4 px-2 bg-white  shadow-md shadow-gray-400":
          mobileVisiblity,
        "hidden md:block md:w-1/4 border-[1px] border-palm-700 rounded px-4 py-2":
          !mobileVisiblity,
      })}
    >
      <X
        size={32}
        color="#789B3D"
        className="md:hidden absolute left-1 top-1"
        onClick={() => ToggleFilterVisibility(!mobileVisiblity)}
      />

      <h3 className="w-full text-center text-lg text-palm-700">Filtre Por:</h3>

      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Agricultura
        </h5>
        <ul className="w-full text-left ">
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Graos")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Grãos/Sementes
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Mandioca")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Mandioca{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Hortalicas")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Hortaliças{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Frutas")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Frutas{" "}
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Derivados
        </h5>
        <ul className="w-full text-left pl-2">
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Pães/Bolos/Biscoitos")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              Pães / Bolos / Biscoitos
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("derivados do leite")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Derivados do Leite{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Doces")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Doces{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Bebidas")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Bebidas{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Temperos{" "}
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Pecuária
        </h5>
        <ul className="w-full text-left pl-2">
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Bovinos")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Bovinos{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory(" Caprinos/Ovinos")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Caprínos / Ovínos{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Suinos")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Suínos{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Aves")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Áves{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("Piscicultura")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Piscícultura{" "}
            </button>
          </li>
          <li className="w-full  text-sm my-1 ">
            <button
              onClick={() => filterByCategory("cortes")}
              className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
            >
              {" "}
              Cortes{" "}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
