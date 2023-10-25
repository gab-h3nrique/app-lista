import { View, Text, NativeModules, Animated, StyleProp, TextStyle, } from 'react-native'
import React, { ElementType, ReactNode, memo, useCallback, useEffect, useRef } from 'react'
import tw from '../../libs/tailwind'
import { useNavigation } from './NavigationProvider';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {

    name: string;
    component: ElementType;
    animate?: boolean;
    options?: Options;
    data?: any;

}

interface Options {
    style?: StyleProp<TextStyle> | undefined;
}


const StackNavigation = memo(function StackNavigation({ name, component: Component, animate = true, options, data = null }: Props) {

    const style = options?.style
    
    const { navigate, screens } = useNavigation()
    
    const duration = animate ? 250 : 0 
    const delay = 0

    const positionScreen = useRef(new Animated.Value(animate ? 400 : 0)).current;

    const openAnimate = useCallback(() => {

        Animated.timing(positionScreen, { toValue: 0, delay: delay, duration: duration, useNativeDriver: false, }).start();

    },[])

    const closeAnimate = useCallback(() => {

        Animated.timing(positionScreen, { toValue: 500, delay: delay, duration: duration+50, useNativeDriver: false}).start();
        
    },[])

    const lostFocus = useCallback(() => {

        Animated.timing(positionScreen, { toValue: -200, delay: delay, duration: duration + 50, useNativeDriver: false}).start();
        
    },[])

    // // start not focused animation
    // if(!navigate.isFocused(name)) lostFocus();

    // // start open animation
    // if(navigate.isFocused(name)) openAnimate();

    
    useEffect(()=>{

        // start open animation
        if(navigate.isOpen(name)) openAnimate();
        
        
        // start close animation
        if(!navigate.isOpen(name)) closeAnimate();

    },[navigate.get(name)])


    return (

        <Animated.View style={[tw`top-0 left-0 w-full h-full absolute`, { transform: [{translateX: positionScreen}]}, style]}>

            <View style={tw`flex w-full h-full relative`}>
                <Component {...data}/>
            </View>

        </Animated.View>
        
    )

})

export default StackNavigation

