import { createContext, useEffect, useState } from "react";
import { Product } from "../../Types/product.type";
import { CheckLocalStorage } from "../../service/localStorage";
interface IPuchaseList {
  product: Product;
  quantity: number;
}
interface Props {
  children: React.ReactNode;
}
export const PuchaseListContext = createContext({});

export const PuchaseListProvider = ({ children }: Props) => {
  const [purchaseList, setPurchaseList] = useState<IPuchaseList[]>([]);
  useEffect(() => {
    setPurchaseList(CheckLocalStorage.getItemPurchaseList());
  }, []);

  //function to add a product on puchase list if not exist, or, inclement a quantity if already exist
  function AddToPuchaseList(product: Product, qtd?: number): void {
    const alreadyInPuchaseList = purchaseList.find(
      (item) => item.product._id === product._id
    );

    if (alreadyInPuchaseList) {
      const newPuchaseList: IPuchaseList[] = purchaseList.map((item) => {
        if (item.product._id === product._id)
          ({
            ...item,
            quantity: qtd ? qtd : item.quantity++,
          });
        return item;
      });
      setPurchaseList(newPuchaseList);
      CheckLocalStorage.setItemOnPurchaseList(newPuchaseList);
      return;
    }
    //if product is not already in puchase list
    const listItem: IPuchaseList = {
      product: product!,
      quantity: qtd ? qtd : 1,
    };
    const newPuchaseList: IPuchaseList[] = [...purchaseList, listItem];
    setPurchaseList(newPuchaseList);
    localStorage.setItem("@PAF:purchase", JSON.stringify(newPuchaseList));
  }
  function RemoveToPuchaseList(product: Product, qtd?: number) {
    const alreadyInPuchaseList = purchaseList.find(
      (item) => item.product._id === product._id
    );

    if (alreadyInPuchaseList!.quantity > 1) {
      const newPuchaseList: IPuchaseList[] = purchaseList.map((item) => {
        if (item.product._id === product._id)
          ({
            ...item,
            quantity: qtd ? qtd : item.quantity--,
          });
        return item;
      });
      setPurchaseList(newPuchaseList);
      CheckLocalStorage.setItemOnPurchaseList(newPuchaseList);
      return;
    }
    //if product is not already in puchase list
    const listItem: IPuchaseList = {
      product: product!,
      quantity: qtd ? qtd : 1,
    };
    const newPuchaseList: IPuchaseList[] = [...purchaseList, listItem];
    setPurchaseList(newPuchaseList);
    localStorage.setItem("@PAF:purchase", JSON.stringify(newPuchaseList));
  }
  function DeleteProductToPuchaseList(id: string) {
    const newPuchaseList: IPuchaseList[] = purchaseList.filter(
      (item) => item.product._id !== id
    );
    setPurchaseList(newPuchaseList);
    CheckLocalStorage.setItemOnPurchaseList(newPuchaseList);
  }
  return (
    <PuchaseListContext.Provider
      value={{
        purchaseList,
        AddToPuchaseList,
        RemoveToPuchaseList,
        DeleteProductToPuchaseList,
      }}
    >
      {children}
    </PuchaseListContext.Provider>
  );
};
