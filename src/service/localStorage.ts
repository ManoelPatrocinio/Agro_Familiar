import { Product } from "../Types/product.type";
import { UserLoggedType } from "../Types/user.type";

interface IPuchaseList {
  product: Product;
  quantity: number;
}
export const CheckLocalStorage = {

    // Função para salvar o usuário logado no local storage
    setLoggedUser(data:UserLoggedType){
        const UserLogged ={
            _id: data._id,
            u_type : data.u_type,
            u_email : data.u_email,
            u_full_name : data.u_full_name
        }
     
        localStorage.setItem("@PAF:User",  JSON.stringify(UserLogged))
    },

    // Função responsável por recuperar o usuário logado do local storage
    getLoggedUser(){
        let data = localStorage.getItem("@PAF:User");
        if(!data) return null;
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    },
    logout (){
        localStorage.removeItem("@PAF:User");
  
    },

    // Purchase list
        // Função para salvar produto no local storage
    setItemOnPurchaseList(data:IPuchaseList[]){
        let parsedData =  JSON.stringify(data)
        localStorage.setItem("@PAF:purchase", parsedData)
    },

    // Função responsável por recuperar lista de productos local storage
    getItemPurchaseList(){
        let data = localStorage.getItem("@PAF:purchase");
        if(!data) return [];
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    },
}

