import React, { createContext, useContext, useEffect, useState } from "react";

import Storage from "../providers/storage/storage";
import { useAppColorScheme } from "twrnc";
import tw from "../libs/tailwind";

interface Theme {
    theme: string;
    setAppTheme:(theme: string) => void;
}

export const ThemeContext = createContext({});

export const useTheme = (): Theme => {

    return useContext(ThemeContext) as Theme;

};

export const ThemeProvider = ({ children }:any) => {

    
    
    const [ theme, setTheme ] = useState<string>(Storage.storage.getItem('THEME'))
    
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw, Storage.storage.getItem('THEME'));

    function setAppTheme(value: string) {

        console.log('tema:', value)

        Storage.storage.setItem('THEME', value)

        setTheme(()=> value)

        setColorScheme(value as any)        

    }

    useEffect(()=>{
    

    },[theme])
    
    return (

        <ThemeContext.Provider value={{ theme, setAppTheme }}>

            {children}

        </ThemeContext.Provider>
        
    )

}