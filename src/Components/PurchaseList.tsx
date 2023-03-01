import { Trash } from "phosphor-react";
import { useState } from "react";
import { Product } from "../Types/product.type";
import productExemple from "../assets/images/product-exemple.png";

const product = [
  { _id: "163eaf9b4f2536575309672e3", p_name: "maço de coentro", p_price: 4.5 },
  { _id: "63eaf9b4f2536575309672e4", p_name: "maço de alface", p_price: 2.5 },
  { _id: "63eaf9b4f25365753096725", p_name: "maço de couve", p_price: 1.5 },
];

interface IPuchaseList {
  product: Product;
  quantity: number;
}
export function PurchaseList() {
  const [puchaseList, setPuchaseList] = useState<IPuchaseList[]>([]);

  const handleAddToPuchaseList = (id: string) => {
    const item = product.find((product) => product._id === id);
    const alreadyInPuchaseList = puchaseList.find(
      (item) => item.product._id === id
    );

    if (alreadyInPuchaseList) {
      const newPuchaseList: IPuchaseList[] = puchaseList.map((item) => {
        if (item.product._id === id)
          ({
            ...item,
            quantity: item.quantity++,
          });
        return item;
      });
      setPuchaseList(newPuchaseList);
      return;
    }
    //if product is not already in puchase list
    const listItem: IPuchaseList = {
      product: item!,
      quantity: 1,
    };
    const newPuchaseList: IPuchaseList[] = [...puchaseList, listItem];
    setPuchaseList(newPuchaseList);
  };
  const handleRemoveToPuchaseList = (id: string) => {
    const alreadyInPuchaseList = puchaseList.find(
      (item) => item.product._id === id
    );
    if (alreadyInPuchaseList!.quantity > 1) {
      const newPuchaseList: IPuchaseList[] = puchaseList.map((item) => {
        if (item.product._id === id)
          ({
            ...item,
            quantity: item.quantity--,
          });
        return item;
      });
      setPuchaseList(newPuchaseList);
      return;
    }
    const newPuchaseList: IPuchaseList[] = puchaseList.filter(
      (item) => item.product._id !== id
    );
    setPuchaseList(newPuchaseList);
  };
  const removeProductToPuchaseList = (id: string) => {
    const newPuchaseList: IPuchaseList[] = puchaseList.filter(
      (item) => item.product._id !== id
    );
    setPuchaseList(newPuchaseList);
  };

  const TotalPuchaseList = puchaseList.reduce((total, current) => {
    return total + current.product.p_price! * current.quantity;
  }, 0);
  return (
    <div
      className="offcanvas offcanvas-end fixed bottom-0 flex flex-col justify-between max-w-full max-h-[100vh] bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-[90vw] md:w-[45vw]"
      tabIndex={-1}
      id="PurchaseList"
      aria-labelledby="PurchaseListLabel"
    >
      <div className="offcanvas-header h-[7%] flex items-center justify-between p-4">
        <h5
          className="w-full text-center text-md text-palm-700 mb-0 leading-normal font-semibold "
          id="PurchaseListLabel"
        >
          Lista de Compra
        </h5>
        <button
          type="button"
          className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body max-h-[70%] flex-grow p-4 overflow-y-auto">
        {puchaseList.length > 0 ? (
          <>
            {puchaseList?.map((item, index) => (
              <div
                key={index}
                className="w-full h-auto min-h-[8rem] flex items-center flex-wrap justify-evenly md:justify-between border-b-2 border-b-green-400 py-3 mb-2"
              >
                <div className="w-32 h-32 max-w-[47%] rounded mr-3 md:mr-0 ">
                  <img
                    src={productExemple}
                    alt=""
                    className="w-full h-full rounded"
                  />
                </div>
                <div className="max-w-[50%] h-32 flex flex-col justify-around items-start">
                  <div>
                    <h4 className="w-full text-left  text-md text-palm-700">
                      {item.product.p_name}
                    </h4>
                    <p className="w-full text-left text-xs text-gray-400 ">
                      Associação de produtores de Barra
                    </p>
                  </div>
                  <span className="w-full text-left text-lg text-green-600">
                    {item?.product.p_price! * item.quantity}
                  </span>
                  <small>{item.quantity}</small>
                </div>
                <div className="md:min-w-[6rem] md:w-auto w-1/2 flex justify-start  rounded border border-palm-700  mt-4 md:mt-0">
                  <button
                    onClick={() => handleRemoveToPuchaseList(item.product._id)}
                    className="w-1/4 h-full text-center text-xl text-palm-700 py-2"
                    type="button"
                  >
                    -
                  </button>
                  <div className="w-1/2 h-full text-center text-sm text-palm-700 py-3">
                    1
                  </div>
                  <button
                    onClick={() => handleAddToPuchaseList(item.product._id)}
                    className="w-1/4 h-full text-center text-xl text-palm-700 py-2"
                    type="button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeProductToPuchaseList(item.product._id)}
                  className="w-12  h-12  rounded-[100%]  flex justift-center items-end mt-4 md:mt-0"
                >
                  <Trash size={42} color="#789B3D" weight="light" />
                </button>
              </div>
            ))}
          </>
        ) : (
          <h1>Lista vazia</h1>
        )}

        {product.map((item, index) => (
          <div key={index} className="w-full">
            <p className="w-full">{item.p_name}</p>
            <p className="w-full">{item.p_price}</p>
            <button onClick={() => handleAddToPuchaseList(item._id)}>
              add
            </button>
          </div>
        ))}
      </div>
      <div className="w-full h-[23%] flex flex-col justify-between border-t border-gray-200">
        <div className="w-full h-[40%] flex justify-between px-3 py-5">
          {" "}
          <h4 className=" text-md md:text-lg text-gray-600 ">Total</h4>{" "}
          <span className="text-md md:text-lg text-green-600 ">
            R$ {TotalPuchaseList}
          </span>
        </div>
        <button className="w-full h-[60%] text-lg text-white  bg-green-600 py-4">
          Solicitar Produtos
        </button>
      </div>
    </div>
  );
}
