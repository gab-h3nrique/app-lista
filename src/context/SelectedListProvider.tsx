import { createContext, useContext, useState } from "react";

export const SelectedListContext = createContext({});

export const useSelectedList = ():any => {
    return useContext(SelectedListContext);
};

export const SelectedListProvider = ({ children }:any) => {


    const [selectedList, setSelectedList] = useState<any>({ screenOpen: false, list: {} });

    return (

        <SelectedListContext.Provider value={{ selectedList, setSelectedList }}>
            {children}
        </SelectedListContext.Provider>
        
    )

}