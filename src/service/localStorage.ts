
type User ={
    u_type ?: ("client" | "farmer" | "assoc" | "coop")
    u_full_name : string,
    u_email:string,
    u_password:string

}
export const CheckLocalStorage = {

    // Função para salvar o usuário logado no local storage
    setLoggedUser(data:User){
        let parsedData = JSON.stringify(data)
        localStorage.setItem("user", parsedData)
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
  
    }
}

