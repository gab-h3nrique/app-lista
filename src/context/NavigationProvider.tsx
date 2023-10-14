import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { Children } from 'react';
import { BackHandler, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-svg";
import tw from "twrnc";
import AnimatedScreen from "../components/AnimatedScreen";

type Component = React.FC;

const delay = 1000




export const NavigationContext = createContext({});

export const useNavigation = ():any => {
    return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }:any) => {

    
    const [ screens, setScreens ] = useState<string[]>([])
    const [ loadContext, setLoadContext ] = useState(false)

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

            hasScreenOpen: (): boolean => {

                return screens.length > 0;

            }

        }
    }

    const navigate = navigateFunctions();

    function onBackPress() {

        // close the last screen when the gesture is made
        const hasLastScreen = navigate.closeLast()

        if(!navigate.hasScreenOpen()) BackHandler.exitApp()

        return true;
    
    };
    
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      useEffect(()=>{
        
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    
      },[screens])
    
    return (

        <NavigationContext.Provider value={{navigate, screens, loadContext}}>

                {children}

        </NavigationContext.Provider>
        
    )

}