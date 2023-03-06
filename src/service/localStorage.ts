import { Product } from "../Types/product.type";

type User ={
    _id:string;
    u_type ?: ("client" | "farmer" | "assoc" | "coop")
    u_full_name : string,
    u_email:string,
    u_password:string

}

interface IPuchaseList {
  product: Product;
  quantity: number;
}
export const CheckLocalStorage = {

    // Função para salvar o usuário logado no local storage
    setLoggedUser(data:User){
        const UserLogged ={
            _id: data._id,
            u_type : data.u_type,
            u_email : data.u_email,
            u_full_name : data.u_full_name
        }
     
        localStorage.setItem("user",  JSON.stringify(UserLogged))
    },

    // Função responsável por recuperar o usuário logado do local storage
    getLoggedUser(){
        let data = localStorage.getItem("user");
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
        localStorage.removeItem("user");
  
    },

    // Purchase list
        // Função para salvar o usuário logado no local storage
    setItemOnPurchaseList(data:IPuchaseList[]){
        let parsedData =  JSON.stringify(data)
        localStorage.setItem("@PAF:purchase", parsedData)
    },

    // Função responsável por recuperar o usuário logado do local storage
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

