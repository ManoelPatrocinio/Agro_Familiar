import classNames from "classnames";
import { WhatsappLogo } from "phosphor-react";
import { Link } from "react-router-dom";
import { User } from "../Types/user.type";
import IconAgropecuary from "../assets/images/Agropecuaria.png";
import IconAgriculture from "../assets/images/agriculture.png";
import IconAgroIndut from "../assets/images/agroIndus.png";
import UserPhoto from "../assets/images/exemple_user_profile.png";
type Props = {
  entity: User;
};
export function CardEntity({ entity }: Props) {
  return (
    <div
      className={classNames(
        "w-[21.25rem] flex flex-col justify-between  pt-4 mt-4 mb-8 border border-gray-400 rounded  hover:scale-110 transition duration-300 ease-in-out",
        {
          "h-[15rem]": entity.u_type === "farmer",
          "h-[13rem]": entity.u_type !== "farmer",
        }
      )}
    >
      {entity.u_type === "farmer" ? (
        <>
          <div className="w-[6rem] h-[6rem] mx-auto mb-2">
            <img
              src={UserPhoto}
              alt="foto de perfil"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <Link
            to={`/my-shop/${entity._id}`}
            className="w-full text-sm text-center whitespace-nowrap text-ellipsis overflow-hidden text-palm-700 font-display px-2 "
          >
            {entity.u_full_name}{" "}
          </Link>
          <span className="w-full text-center text-gray-400 font-sans text-xs pt-2 pb-4">
            {entity.u_city}
          </span>
        </>
      ) : (
        <>
          <Link
            to={`/my-shop/${entity._id}`}
            className="w-full  text-center text-palm-700 font-display text-sm  text-ellipsis whitespace-nowrap overflow-hidden  px-2"
          >
            {entity.u_entity_name}
          </Link>
          <span className="w-full text-center text-gray-400 font-sans text-xs my-2">
            {entity.u_city}
          </span>
          <div className="flex justify-around items-center py-2">
            <div className="w-12 h-12 ">
              {" "}
              <img
                className="object-cover w-full h-full"
                src={IconAgriculture}
                alt="agricultura icone"
                loading="lazy"
              />
            </div>
            <div className="w-12 h-12 ">
              {" "}
              <img
                className="object-cover w-full h-full"
                src={IconAgropecuary}
                alt="agropecuaria icone"
                loading="lazy"
              />
            </div>
            <div className="w-12 h-12 ">
              {" "}
              <img
                className="object-cover w-full h-full"
                src={IconAgroIndut}
                alt="agroindustria icone"
                loading="lazy"
              />
            </div>
          </div>
        </>
      )}

      <a
        href={`http://api.whatsapp.com/send?l=pt_BR&phone=+55${entity.u_main_contact}&text=Olá, tudo bem ?`}
        target="_blank"
        className="w-full flex justify-center items-center px-2 py-2.5 bg-green-600 text-white  text-sm leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
      >
        <WhatsappLogo size={32} color="#fff" />
        Conversar
      </a>
    </div>
  );
}
