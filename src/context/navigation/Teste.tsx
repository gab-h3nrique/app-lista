import React, { ReactNode, Children, createContext, useContext, useEffect, useState, ElementType, useMemo, useCallback, useTransition } from "react";

import { BackHandler, TouchableWithoutFeedback, View } from "react-native";

import NavigateStack from "./StackNavigation";
import TabNavigation from "./TabNavigation";
import tw from "../../libs/tailwind";



interface UseNavigation {

    navigate: Navigate;
    screens: string[];

}

interface Navigate {

    get: (name: string) => string | null;
    isOpen: (name: string) => boolean;
    isFocused: (name: string) => boolean;
    open: (name: string, props?: any) => any;
    push: (name: string, props?: any) => void;
    close: (name: string) => void;
    closeMultiples: (names: string[]) => void;
    closeLast: () => void;
    isLastScreen: () => boolean;

}

interface Props {

    tab?: ElementType;
    children: ReactNode[]
}

const NavigationContext = createContext({});

const delay = 600

const NavigationProvider = ({ tab: Tab, children }: Props) => {


    let lastChild: any;

    Children.forEach(children, (child:any, i) => {

        if(i == 0) lastChild = child
        
    });

    
    const [ screens, setScreens ] = useState<string[]>(lastChild.props.name)
    const [ childrenArray, setChildrenArray ] = useState<any>(lastChild)


    const open = useCallback((name: string)=>{

    },[])



    const onBackPress = () => {

        if(navigate.isLastScreen()) BackHandler.exitApp()
        else navigate.closeLast()

        return true;
    
    }
    
    
    useEffect(()=> {
        
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

    }, [childrenArray])

    return (

        <NavigationContext.Provider value={{ navigate }}>


            {childrenArray}

            {Tab && <Tab/>}


        </NavigationContext.Provider>
        
    )

}


export const Navigation = {

    Context: NavigationProvider,
    Stack: NavigateStack,
    
}

export const useNavigation = () => useContext(NavigationContext) as UseNavigation;

