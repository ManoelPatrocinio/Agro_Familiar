import { useState } from "react";
import { Product } from "../Types/product.type";
import { CheckLocalStorage } from "../service/localStorage";

interface IPuchaseList {
  product: Product;
  quantity: number;
}


export function  useAddToPuchaseList  ( product:Product) {
  const [purchaseList, setPurchaseList] = useState<IPuchaseList[]>(()=>{
    return CheckLocalStorage.getItemPurchaseList()
  });

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
    localStorage.setItem('@PAF:purchase', JSON.stringify(newPuchaseList))
    return;
  }
  //if product is not already in puchase list
  const listItem: IPuchaseList = {
    product: product!,
    quantity: 1,
  };
  const newPuchaseList: IPuchaseList[] = [...purchaseList, listItem];
  setPurchaseList(newPuchaseList);
  localStorage.setItem('@PAF:purchase', JSON.stringify(newPuchaseList))

  return purchaseList
};

  