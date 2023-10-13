import React, { ReactNode, createContext, useContext, useState } from "react";

type Component = React.FC;


export const NavigationContext = createContext({});

export const useSelectedList = ():any => {
    return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }:any) => {

    console.log('children', children)

    const [ stack, setStack ] = useState<React.FC>(children)


    const [selectedList, setSelectedList] = useState<any>({ screenOpen: false, list: {} });

    return (

        <NavigationContext.Provider value={{ selectedList, setSelectedList }}>
            {children}
        </NavigationContext.Provider>
        
    )

}

const Stack = (props: any): ReactNode => {

    const { name, component} = props

    return component 

}

export default Stack