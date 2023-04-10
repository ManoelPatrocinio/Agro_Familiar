import { createContext, useEffect, useState } from "react";
import { UserLoggedType } from "../../Types/user.type";
import { CheckLocalStorage } from "../../service/localStorage";

interface Props {
  children: React.ReactNode;
}
export const UserLoggedContext = createContext({});

export const UserLoggedProvider = ({ children }: Props) => {
  const [userLogged, setUserLogged] = useState<UserLoggedType | null>(null);
  useEffect(() => {
    setUserLogged(CheckLocalStorage.getLoggedUser());
  }, []);

  const UserFirstName = userLogged?.u_full_name!.split(" ", 1);

  return (
    <UserLoggedContext.Provider
      value={{
        userLogged,
        UserFirstName,
      }}
    >
      {children}
    </UserLoggedContext.Provider>
  );
};
