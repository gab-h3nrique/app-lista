import { View, Text, NativeModules, Animated, StyleProp, TextStyle, } from 'react-native'
import React, { ElementType, ReactNode, memo, useEffect, useRef } from 'react'
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
    const delay = 50

    const positionScreen = useRef(new Animated.Value(animate ? 400 : 0)).current;

    function openAnimate() {

        Animated.timing(positionScreen, { toValue: 0, delay: delay, duration: duration, useNativeDriver: false, }).start();

    }

    function closeAnimate() {

        Animated.timing(positionScreen, { toValue: 500, delay: delay, duration: duration, useNativeDriver: false}).start();
        
    }

    function lostFocus() {

        Animated.timing(positionScreen, { toValue: -200, delay: delay, duration: duration + 50, useNativeDriver: false}).start();
        
    }


    useEffect(()=>{

        if(!animate) return

        // start open animation
        if(navigate.isOpen(name)) openAnimate();

        // // start not focused animation
        if(!navigate.isFocused(name)) lostFocus()

        // start close animation
        if(!navigate.isOpen(name)) closeAnimate();

        // [navigate.get(name), !navigate.isFocused(name)] is more slow than [navigate.get(name)]
    }, [navigate.get(name), !navigate.isFocused(name)])

    return (

        <Animated.View style={[tw`top-0 left-0 w-full h-full absolute`, { transform: [{translateX: positionScreen}]}, style]}>

            <View style={tw`flex w-full h-full`}>
                <Component {...data}/>
            </View>

        </Animated.View>
        
    )

})

export default StackNavigation

