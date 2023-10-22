import { Animated, NativeModules, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HouseSvg from '../svg/icons/HouseSvg';
import ListSvg from '../svg/icons/ListSvg';
import HeartSvg from '../svg/icons/HeartSvg';
import UserSvg from '../svg/icons/UserSvg';
import Button from '../buttons/Button';
import { useTheme } from '../../context/ThemeProvider';
import tw from '../../libs/tailwind';
import LocationDotSvg from '../svg/icons/LocationDotSvg';
import { useNavigation } from '../../context/navigation/NavigationProvider';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  screen: string;
  setScreen?: any;
}

const Tabs = () => {

  const { theme } = useTheme()

  const { screens, navigate } = useNavigation()

  const [ selectedScreen, setSelectedScreen ] = useState('')

  function switchTo(screen: string) {

    if(!screen) return console.warn('no screen was selected in tabs');

    navigate.push(screen)

    setSelectedScreen(screen)

  }



  useEffect(()=>{

    switchTo('HomeScreen')

  },[])

  useEffect(()=>{

  },[theme])

  return (

    <View style={[tw`py-3 px-6 rounded-t-[35px] bottom-0 absolute flex flex-row justify-between items-center w-full bg-white dark:bg-slate-700`, {zIndex: 0}]}>



      <Button onPress={()=> switchTo('HomeScreen')}>
        <HouseSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'HomeScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'HomeScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('ListScreen')}>
        <ListSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'ListScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'ListScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('MapScreen')}>
        <LocationDotSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'MapScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'MapScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('UserScreen')}>
        <UserSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'UserScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'UserScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

    </View>

  )
}

export default Tabs