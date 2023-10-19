import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { BackHandler, TouchableWithoutFeedback, View } from "react-native";

type Component = React.FC;

const delay = 1000


interface UseNavigation {

    navigate: Navigate
    screens: string[]

}

interface Navigate {

    get: (name: string) => string | null;
    isOpen: (name: string) => boolean;
    open: (name: string) => void;
    push: (name: string) => void;
    close: (name: string) => void;
    closeLast: () => void;
    isLastScreen: () => boolean;

}

export const NavigationContext = createContext({});

export const useNavigation = (): UseNavigation => {

    return useContext(NavigationContext) as UseNavigation;

};

export const NavigationProvider = ({ children }:any) => {

    const [ screens, setScreens ] = useState<string[]>([])

    function navigateFunctions() {

        return {

            get: (name: string) => {

                return screens.length > 0 && screens.find(screen=> screen == name) || null 

            },
            isOpen: (name: string) => {

                return screens.some((screen)=> screen == name)

            },

            // cuidado para nao passar nome errado da tela 
            open: (name: string) => {

                setScreens((sc)=> [name, ...sc.filter(s=> s != name)])

            },

            push: (name: string) => {

                setScreens((sc)=> [name])

            },

            close: (name: string) => {

                setScreens((sc)=>[...sc.filter((s)=> s !== name)])

            },

            closeLast: () => {

                setScreens((sc)=> sc.filter((s,i)=> i !==  0))

            },

            isLastScreen: (): boolean => {

                return screens.length == 1;

            }

        }
    }

    const navigate: Navigate = navigateFunctions();

    function onBackPress() {

        if(navigate.isLastScreen()) BackHandler.exitApp()
        else navigate.closeLast()

        return true;
    
    };
    
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      useEffect(()=>{
        
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    
      },[screens])
    
    return (

        <NavigationContext.Provider value={{ navigate, screens }}>

            {children}

        </NavigationContext.Provider>
        
    )

}