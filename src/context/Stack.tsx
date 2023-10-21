import { View, Text, NativeModules, Animated, } from 'react-native'
import React, { ReactNode, memo, useEffect, useRef } from 'react'
import tw from '../libs/tailwind'
import { useNavigation2 } from './NavigationProvider2';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

type StackProps = {

    name: string;
    component: ReactNode;
    disableAnimate?: boolean;

}

const Stack = memo(function Stack(props: StackProps) {

    const { name, component, disableAnimate } = props

    // console.log('props', props)
    
    const { navigate, screens } = useNavigation2()
    
    const delay = disableAnimate ? 0 : 300 

    const positionScreen = useRef(new Animated.Value(300)).current;

    function openAnimate() {

        Animated.timing(positionScreen, { toValue: 0, duration: delay, useNativeDriver: false, }).start();

    }

    function closeAnimate() {

        Animated.timing(positionScreen, { toValue: 300, duration: delay, useNativeDriver: false}).start();
        
    }

    function lostFocus() {

        Animated.timing(positionScreen, { toValue: -200, duration: delay + 200, useNativeDriver: false}).start();
        
    }


    useEffect(()=>{

        // start open animation
        if(navigate.isOpen(name)) openAnimate();

        // start not focused animation
        if(!navigate.isFocused(name)) lostFocus()

        // start close animation
        if(!navigate.isOpen(name)) closeAnimate();


    }, [screens])

    return (

        <Animated.View style={[tw`top-0 left-0 w-full h-full absolute`, { transform: [{translateX: positionScreen}], }]}>

            <View style={tw`w-full h-full relative`}>
                {component}
            </View>

        </Animated.View>
        
    )

})

export default Stack

