import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { Children } from 'react';
import { TouchableWithoutFeedback, View } from "react-native";
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

    
    // const [ stacks, setStacks ] = useState([children[0]])
    const [ stacks, setStacks ] = useState([children[0]])


    const [ stackWillOpen, setStackWillOpen ] = useState(children[0].props.name)
    const [ stackWillClose, setStackWillClose ] = useState("")

    function navigateFunctions() {
        return {

            open: (name: string) => {

                let foundChild: any = null
        
                Children.forEach(children, child =>{
                    if(child.props.name === name) foundChild = child
                    
                })
        
                let newStacks: any[] = []
        
                if(foundChild) newStacks = stacks.filter(({props}:any) => props.name !== foundChild.props.name)
                else newStacks = stacks
        
        
                if(!foundChild) return console.error("rota não encontrada, open('algumNomeQueNaoExiste')")
        
                setStackWillOpen(foundChild.props.name)
                setStackWillClose(stacks[0].props.name)
        
                console.debug('open:', foundChild.props.name)
                console.debug('close:', stacks[0].props.name)
        
        
                setTimeout(()=>{
        
                    setStacks([foundChild, ...newStacks])
        
                }, delay)

            },

            back: () => {

                return;

            }


        }
    }

    const navigate = navigateFunctions();

   
    
    return (

        <NavigationContext.Provider value={navigate}>

                {Children.map(stacks, (child, index) => {
                    
                    let isOpen = true;

                    // always show the first stack
                    // if(index === 0) isOpen = true


                    // if(child.props.name === stackWillOpen) isOpen = true
                    // if(child.props.name === stackWillClose) isOpen = false
                    console.log('renderizou aqui', index)


                    return (

                        <View style={tw` w-full`}>

                            {child}

                        </View>
                        
                    )
                })}

        </NavigationContext.Provider>
        
    )

}

const Stack = (props: any): ReactNode => {

    const { name, component} = props

    return component 

}




export default Stack