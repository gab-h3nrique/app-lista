import { createContext, useContext, useEffect, useState } from "react";
import { List } from "../providers/storage/functions/UserStorageFunctions";
import Storage from "../providers/storage/storage";

export interface User {
    name: string;
    token?: string;
    selectedList: List | null;
    lists: List[];
}

export const UserContext = createContext({});

export const useUser = () => {

    return useContext(UserContext) as { user: User, setUser: any };

};

export const UserProvider = ({ children }:any) => {

    const [ user, setUser ] = useState<User>({ 

        name: '',
        token: '',
        selectedList: null,
        lists: Storage.List.getMany(),

    })

    // function updateUser(user: User) {

    //     setUser(()=> user)

    //     Storage.List.

    // }

    

    useEffect(()=>{

    },[user])


    return (

        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
        
    )

}