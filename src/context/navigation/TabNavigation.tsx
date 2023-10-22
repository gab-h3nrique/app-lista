import { View, Text, NativeModules, Animated, } from 'react-native'
import React, { ElementType, ReactNode, memo, useEffect, useRef } from 'react'
import tw from '../../libs/tailwind'
import { useNavigation2 } from './NavigationProvider';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

type StackProps = {

    component: ElementType;

}

const TabNavigation = memo(function TabNavigation({ component: Component }: StackProps) {

    return <Component />

})

export default TabNavigation

