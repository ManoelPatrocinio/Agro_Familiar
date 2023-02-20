export type User ={
    _id?: string;
    u_type: ("customer" | "farmer" | "assoc" | "coop")
    u_full_name: string;
    u_email : string;
    u_password : string;
    u_president_name?:string,
    u_entity_name ?: string,
    u_CNPJ_CPF?: string,
    u_UF?:string,
    u_city?:string,
    u_district ?:string,
    u_street ?:string,
    u_number ?:string,
    u_main_contact?:string,
    u_secondary_contact?:string,
}