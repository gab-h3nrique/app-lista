import React, { ReactNode, Children, createContext, useContext, useEffect, useState, ElementType } from "react";

import { BackHandler, TouchableWithoutFeedback, View } from "react-native";

import NavigateStack from "./StackNavigation";
import TabNavigation from "./TabNavigation";
import tw from "../../libs/tailwind";



interface UseNavigation {

    navigate: Navigate
    screens: string[]

}

interface Navigate {

    get: (name: string) => string | null;
    getAll: () => any;
    isOpen: (name: string) => boolean;
    isFocused: (name: string) => boolean;
    open: (name: string, props?: any) => void;
    push: (name: string, props?: any) => void;
    close: (name: string) => void;
    closeLast: () => void;
    isLastScreen: () => boolean;

}

interface Props {

    tab?: ElementType;
    children: ReactNode[]
}

const NavigationContext = createContext({});

export const useNavigation = () => {

    const { navigate, screens } = useContext(NavigationContext) as UseNavigation;

    return { navigate, screens };

};

const NavigationProvider = ({ tab: Tab ,children }: Props) => {

    const delay = 1000

    let lastChild: any = [];

    Children.forEach(children, (child:any, i) => {

        if(i == 0) lastChild = child

    });

    
    const [ screens, setScreens ] = useState<string[]>([lastChild.props.name])
    const [ childrenArray, setChildrenArray ] = useState<any>([lastChild])



    function navigateFunctions(): Navigate {

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
            open: (name: string, props?: any) => {

                let foundChild: boolean = false;

                Children.forEach(children, (child:any, index) => {

                    if(child.props.name == name) foundChild = true;

                });

                if(!foundChild) return console.error(`Não existe nenhum componente com este nome: ${name}\n Verifique se o nome passado para <Navigation.Stack nome={'nomeExemplo'} esteja correto com o nome passado no navigate.open('nomeExemplo)`)

                setScreens((sc)=> [...sc.filter(s=> s != name), name])

                setChildrenArray(()=> {


                    let newChild: any;
                    let teste: any;

                    Children.forEach(children, (child:any, index) => {

                        if(child.props.name == name) newChild = {...child, props: {...child.props, data: props}};

                    });
                    
                    if(newChild) return [...childrenArray.filter((s: any)=> s.props.name !== name), newChild]

                })


            },

            push: (name: string, props?: any) => {

                let foundChild: boolean = false;

                Children.forEach(children, (child:any, index) => {

                    if(child.props.name == name) foundChild = true;

                });

                if(!foundChild) return console.error(`Não existe nenhum componente com este nome: ${name}\n Verifique se o nome passado para <Navigation.Stack nome={'nomeExemplo'} esteja correto com o nome passado no navigate.open('nomeExemplo)`)

                setScreens((sc)=> [name])

                setTimeout(()=>{

                    let filteredChild: any = [];

                    Children.forEach(children, (child:any, i) => {
                
                        if(child.props.name === name) filteredChild = {...child, props: {...child.props, data: props}};
                
                    });

                    setChildrenArray(()=> [filteredChild])

                }, 0)

            },

            close: (name: string) => {

                setScreens((e)=>[...e.filter((s)=> s !== name)])

                setTimeout(()=>{

                    setChildrenArray((e:any)=> {
    
                        return e.filter((s: any)=> s.props.name !== name)
    
                    })

                }, delay)

            },

            closeLast: () => {

                setScreens((e)=> e.filter((s,i)=> i !==  (e.length -1)))

                setTimeout(()=>{

                    setChildrenArray((e: any)=> {
                        
                        return e.filter((s: any, i:number)=> i !== (e.length -1))
    
                    })

                }, delay)

            },

            isLastScreen: (): boolean => {

                return screens.length == 1;

            }

        }
    }

    const navigate = navigateFunctions();

    function onBackPress() {

        if(navigate.isLastScreen()) BackHandler.exitApp()
        else navigate.closeLast()

        return true;
    
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    useEffect(()=> {
    },[])
    console.log('--------------------- renderizou navigate')
    
    return (

        <NavigationContext.Provider value={{ navigate, screens }}>


            {childrenArray}

            {Tab && <Tab/>}


        </NavigationContext.Provider>
        
    )

}


export const Navigation = {

    Context: NavigationProvider,
    Stack: NavigateStack,
    
}

