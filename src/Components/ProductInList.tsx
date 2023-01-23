import ProductExemple from "../assets/images/product-exemple.png"
import Icon_trash from "../assets/images/icon-trash.png"
import Icon_edit from "../assets/images/icon-edit.png"
import Icon_disable from "../assets/images/icon-visible-desable.png"


export function ProductInList() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start mb-6 border border-palm-500 p-3 rounded">
      <img
        src={ProductExemple}
        alt=""
        className="w-full md:w-[15rem] h-full rounded mr-4"
      />
      <div className="w-full md:w-[70%] h-full text-left flex flex-col justify-between ">
        <div className="w-full flex flex-col md:flex-row justify-start items-center">
          <div className="w-full md:w-1/2 text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">Nome/Título</h4>
            <p className="w-full text-gray-500 text-sm">
              {" "}
              Maço de alguma coisa
            </p>
          </div>
          <div className="w-full md:w-1/2 text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">Categoria</h4>
            <p className="w-full text-gray-500 text-sm"> Hortaliças</p>
          </div>
        </div>
        <div className="w-full flex justify-between md:justify-start items-center">
          <div className="w-full md:w-1/2 text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">Preço Atual</h4>
            <p className="w-full text-gray-500 text-sm">R$ 3.50</p>
          </div>
          <div className="w-full md:w-1/2 text-right md:text-left my-2 md:my-0">
            <h4 className="w-full  text-palm-700 text-md font-semibold">Preço Antigo</h4>
            <p className="w-full text-gray-500 text-sm"> R$ 4.50</p>
          </div>
        </div>
        <div className="w-full flex justify-evenly items-center mt-4 md:mt-0">
          <button className="text-center text-sm text-palm-700">
            {" "}
            <img className="mx-auto" src={Icon_trash} alt="icone deletar" />
            Deletar
          </button>
          <button className="text-center text-sm text-palm-700">
            {" "}
            <img className="mx-auto" src={Icon_edit} alt="icone editar" />
            Editar
          </button>
          <button className="text-center text-sm text-palm-700">
            {" "}
            <img className="mx-auto" src={Icon_disable} alt="icone desativar" />
            Desativar
          </button>
        </div>
      </div>
    </div>
  );
}
