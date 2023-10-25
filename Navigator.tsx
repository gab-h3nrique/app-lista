

import { View, Text, StyleSheet, Animated, Dimensions, NativeModules } from 'react-native'
import React, { Children, ElementType, ReactNode, createContext, memo, useCallback, useContext, useMemo, useRef, useState, useTransition } from 'react'
import tw from 'twrnc';

// const { UIManager } = NativeModules;

// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const { width } = Dimensions.get('window');

interface Props {

    children: ReactNode[]

}

interface ChildrenType {

    name: string;
    component: ElementType;
    props?: {}

}

interface Config {

    rootElements: ChildrenType[];
    stacks: ChildrenType[];

}

const formatElement = (children: ReactNode[]) => {

    const elements: ChildrenType[] = [];

    Children.forEach(children, (child: any) =>{

        elements.push({ name: child.props.name, component: child.props.component })

    })
  
    return elements;

};

export const NavigationContext = createContext({});

const Navigator = ({ children }: Props) => {

    const rootElements = useMemo(() => formatElement(children) ,[children])

    const [ config, setConfig ] = useState<Config>({rootElements, stacks: [rootElements[0]]})

    const positionScreen = useRef(new Animated.Value(0)).current;

    const push = useCallback((name: string, props?: {}) => {

        (async()=>{
    
            setConfig((prev) => {

                const foundElement = prev.rootElements.find((e: ChildrenType) => e.name === name);

                if(foundElement) return { ...prev, stacks: [...prev.stacks.filter((e) => e.name !== name), {...foundElement, props}] };
                else return prev;

            });
            
        })().then(()=>{

            positionScreen.setValue(width);
            Animated.timing(positionScreen, { toValue: 0, duration: 250, useNativeDriver: true }).start();

        })

    },[])

    const pop = useCallback(() => {

        Animated.timing(positionScreen, {
          toValue: width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {

            positionScreen.setValue(0);
            setConfig((prev: any) => {

                if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.slice(0, prev.stacks.length - 1) };
                else return prev;
                
            });

        });

    },[])

    const contextValue = useMemo(() => ({
        pop,
        push
    }), []);


    // console.log('-----------------------------------------------------renderizando Navigator')

    return (

        <NavigationContext.Provider value={contextValue}>

            {config.stacks.map((stack, index)=>{

                const Component = stack.component;

                // console.log('data', stack.props)

                let translateX: any = 0;

                if(index === (config.stacks.length -1) && index > 0) translateX = positionScreen



                return (

                    <Animated.View key={stack.name} style={[tw`flex w-full h-full absolute`, { transform: [{ translateX: translateX }] }]}>
                        <Component key={index} {...stack.props}/>
                    </Animated.View>

                )
            })}

        </NavigationContext.Provider>

    )
  

}

export const Stack = memo((props: ChildrenType) => null);

export default Navigator

export const useNavigation:any = () => useContext(NavigationContext);




// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################
// #####################################################################################################################################










// import { View, Text, StyleSheet, Animated, Dimensions, NativeModules } from 'react-native'
// import React, { Children, ElementType, ReactNode, createContext, memo, useCallback, useContext, useMemo, useRef, useState, useTransition } from 'react'
// import tw from 'twrnc';

// // const { UIManager } = NativeModules;

// // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// const { width } = Dimensions.get('window');

// interface Props {
//     children: ReactNode[]
// }

// interface ChildrenType {
//     name: string;
//     component: ElementType;
// }

// interface Config {

//     rootElements: ChildrenType[];
//     stacks: ChildrenType[];

// }

// const formatElement = (children: ReactNode[]) => {

//     const elements: ChildrenType[] = [];

//     Children.forEach(children, (child: any) =>{

//         elements.push({ name: child.props.name, component: child.props.component })

//     })
  
//     return elements;

// };


// export const NavigationContext = createContext({});


// const Navigator = ({ children }: Props) => {

//     const rootElements = useMemo(() => formatElement(children) ,[children])

//     const [ config, setConfig ] = useState<Config>({rootElements, stacks: [rootElements[0]]})

//     const positionScreen = useRef(new Animated.Value(0)).current;


//     const push = useCallback((name: string) => {
//         (async()=>{
            
//             console.log('-----------------------------------------------------push')
//             setConfig((prev) => {

//                 const foundElement = prev.rootElements.find((e: ChildrenType) => e.name === name);

//                 if(foundElement) return { ...prev, stacks: [...prev.stacks.filter((e) => e.name !== name), foundElement] };
//                 else return prev;

//             });
            
//         })().then(()=>{

//             positionScreen.setValue(width);
//             Animated.timing(positionScreen, { toValue: 0, duration: 250, useNativeDriver: true }).start();

//         })

//     },[])

//     const pop = useCallback(() => {
//         console.log('-----------------------------------------------------pop')
//         Animated.timing(positionScreen, {
//           toValue: width,
//           duration: 250,
//           useNativeDriver: true,
//         }).start(() => {

//             positionScreen.setValue(0);
//             setConfig((prev: any) => {

//                 if(prev.stacks.length > 1) return { ...prev, stacks: prev.stacks.slice(0, prev.stacks.length - 1) };
//                 else return prev;
                
//             });

//         });

//     },[])

//     const contextValue = useMemo(() => ({
//         pop,
//         push
//     }), []);

//     // const navigator = {
//     //     push: handlePush,
//     //     pop: handlePop,
//     // }

//     console.log('-----------------------------------------------------renderizando Navigator')

//     return (

//         <NavigationContext.Provider value={contextValue}>

//             { 
//                 children.map((child: any, i)=>{

//                     const Component = child.props.component;
//                     console.log('child', child)



//                     return (
//                         <Component key={child.props.name} />
//                     )

//                 })
//             }


//             {/* <View key={stack.name} style={[tw`flex w-full h-full absolute`]}>
//                 <Component navigator={{ push: handlePush, pop: handlePop }} />
//             </View> */}

//         </NavigationContext.Provider>
//     )
  

// }

// export const Stack = (props: ChildrenType) => null;

// export default Navigator

// export const useNavigation:any = () => useContext(NavigationContext);




