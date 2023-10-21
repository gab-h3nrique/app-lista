import { createContext, useContext, useEffect, useState } from "react";
import { Item, List } from "../providers/storage/functions/UserStorageFunctions";
import Storage from "../providers/storage/storage";
import { Category } from "../providers/storage/functions/CategoryFunctions";

export interface User {
    name: string;
    token?: string;
    lists: List[];
    selectedList: List | null;
    selectedItem: Item | null;
    selectedCategory: Category | null;
}

export const UserContext = createContext({});

export const useUser = () => {

    return useContext(UserContext) as { user: User, setUser: any };

};

export const UserProvider = ({ children }:any) => {

    const [ user, setUser ] = useState<User>({ 

        name: '',
        token: '',
        lists: Storage.List.getMany(),
        selectedList: null,
        selectedItem: null,
        selectedCategory: null,

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