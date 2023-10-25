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

const NavigationProvider = ({ tab: Tab, children }: Props) => {

    const [isPending, startTransition] = useTransition();

    const delay = 600
    
    const getInitialChildName = useCallback((): any[]=>{
        let lastChild: any;

        Children.forEach(children, (child:any, i) => {
    
            if(i == 0) lastChild = child
            
        });
        return [lastChild.props.name]
    },[])
    
    const getInitialChild = useCallback((): string[]=>{
        let lastChild: string = '';

        Children.forEach(children, (child:any, i) => {
    
            if(i == 0) lastChild = child
            
        });
        return [lastChild]
    },[])
    
    
    const [ screens, setScreens ] = useState<string[]>(()=> getInitialChildName())
    const [ childrenArray, setChildrenArray ] = useState<any>(()=> getInitialChild())


    const navigate: Navigate = {
        get: useCallback((name: string) => {

            return screens.length > 0 && screens.find(screen=> screen == name) || null 

        },[screens]),

        isOpen: useCallback((name: string) => {

            return screens.some((screen)=> screen == name)

        },[screens]),

        isFocused: useCallback((name: string) => {

            return (screens[screens.length -1] === name) ? true : false;

        },[screens]),
        
        // cuidado para nao passar nome errado da tela 
        open: useCallback((name: string, props?: any) => {

            let newChild: any;

            Children.forEach(children, (child:any, index) => {

                // if(child.props.name == name) newChild = {...child, props: {...child.props, data: props}};
                if(child.props.name == name) newChild = {...child, props: {...child.props, data: props}};

            });

            if(!newChild) return console.error(`Não existe nenhum componente com este nome: ${name}\n Verifique se o nome passado para <Navigation.Stack nome={'nomeExemplo'} esteja correto com o nome passado no navigate.open('nomeExemplo)`)
            
            startTransition(()=> {

                setChildrenArray((e:any)=> {
                    return [...e.filter((s: any)=> s.props.name !== name), newChild]
                })

                setScreens((sc)=> [...sc.filter(s=> s != name), name])

            })


        },[]),

        push: useCallback((name: string, props?: any) => {

            let filteredChild: any = [];
            
            Children.forEach(children, (child:any, i) => {
                
                if(child.props.name === name) filteredChild = {...child, props: {...child.props, data: props}};
                
            });
            
            if(!filteredChild) return console.error(`Não existe nenhum componente com este nome: ${name}\n Verifique se o nome passado para <Navigation.Stack nome={'nomeExemplo'} esteja correto com o nome passado no navigate.open('nomeExemplo)`)
            
            startTransition(()=> {

                setScreens((sc)=> [name])
                setChildrenArray(()=> [filteredChild])

            })

        },[]),

        close: useCallback((name: string) => {

            setScreens((e)=>[...e.filter((s)=> s !== name)])
            
            setTimeout(()=>{

                setChildrenArray((e:any)=> {

                    return e.filter((s: any)=> s.props.name !== name)

                })

            }, delay)

        },[]),

        closeMultiples: useCallback((names: string[]) => {

            setScreens((e)=>[...e.filter((e)=> !names.includes(e) )])
            
            setTimeout(()=>{

                setChildrenArray((e:any)=> {

                    return e.filter((s: any)=> !names.includes(s.props.name))

                })

            }, delay)

        },[]),

        closeLast: useCallback(() => {

            setScreens((e)=> e.filter((s,i)=> i !==  (e.length -1)))

            setTimeout(()=>{

                setChildrenArray((e: any)=> {
                    
                    return e.filter((s: any, i:number)=> i !== (e.length -1))

                })

            }, delay)

        },[]),

        isLastScreen: useCallback((): boolean => {

            return screens.length == 1;

        },[screens])

    }


    
    // const onBackPress = useCallback(() => {

    //     if(navigate.isLastScreen()) BackHandler.exitApp()
    //     else navigate.closeLast()

    //     return true;
    
    // },[navigate, screens]);

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

