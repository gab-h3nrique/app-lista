import React, { ReactNode, Children, createContext, useContext, useEffect, useState } from "react";

import { BackHandler, TouchableWithoutFeedback, View } from "react-native";
import tw from "../libs/tailwind";
import Tabs from "../components/navigation/Tabs";


type Component = React.FC;

const delay = 1000


interface UseNavigation {

    navigate: Navigate
    screens: string[]

}

interface Navigate {

    get: (name: string) => string | null;
    getAll: () => any;
    isOpen: (name: string) => boolean;
    isFocused: (name: string) => boolean;
    open: (name: string) => void;
    push: (name: string) => void;
    close: (name: string) => void;
    closeLast: () => void;
    isLastScreen: () => boolean;

}

export const NavigationContext = createContext({});

export const useNavigation2 = () => {

    const { navigate, screens } = useContext(NavigationContext) as UseNavigation;

    return { navigate, screens };

};

interface Props {
    children: ReactNode 
}

export const NavigationProvider2 = ({ children }: Props) => {



    let lastChild: any = [];

    Children.forEach(children, (child:any, i) => {

        if(i == 0) lastChild = child

    });

    
    const [ screens, setScreens ] = useState<string[]>([lastChild.props.name])
    const [ childrenArray, setChildrenArray ] = useState<any>([lastChild])



    function navigateFunctions() {

        return {

            get: (name: string) => {

                return screens.length > 0 && screens.find(screen=> screen == name) || null 

            },

            getAll: () => {

                console.log('screens', screens)
                // console.log('children', children)
                console.log('childrenArray', childrenArray)

            },

            isOpen: (name: string) => {

                return screens.some((screen)=> screen == name)

            },

            isFocused: (name: string) => {


                return (screens[screens.length -1] === name) ? true : false;


            },

            // cuidado para nao passar nome errado da tela 
            open: (name: string) => {


                setScreens((sc)=> [...sc.filter(s=> s != name), name])

                console.log('ch', childrenArray)

                setChildrenArray(()=> {


                    let newChild;

                    Children.forEach(children, (child:any, index) => {

                        if(child.props.name == name) newChild = child;

                    });
                    

                    if(newChild) return [...childrenArray.filter((s: any)=> s.props.name !== name), newChild]


                })


            },

            push: (name: string) => {

                setScreens((sc)=> [name])

                setTimeout(()=>{

                    let filteredChild: any = [];

                    Children.forEach(children, (child:any, i) => {
                
                        if(child.props.name === name) filteredChild = child
                
                    });

                    setChildrenArray(()=> [filteredChild])

                }, delay)

            },

            close: (name: string) => {

                setScreens((sc)=>[...sc.filter((s)=> s !== name)])

                setTimeout(()=>{

                    setChildrenArray((e:any)=> {
    
                        console.log('teste', e[0].props);
    
                        return e.filter((s: any)=> s.props.name !== name)
    
                    })

                }, delay)


            },

            closeLast: () => {

                setScreens((sc)=> sc.filter((s,i)=> i !==  0))

                setTimeout(()=>{

                    setChildrenArray((e: any)=> {
                        
                        return e.filter((s: any, i:number)=> i !==  0)
    
                    })

                }, delay)

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
    
    return (

        <NavigationContext.Provider value={{ navigate, screens }}>

            {childrenArray}

            <Tabs/>

        </NavigationContext.Provider>
        
    )

}


export default NavigationProvider2


export function StackContainer(props: { children: ReactNode, type?: string } ) {

    props.type = 'screens'

  return props.children
}

