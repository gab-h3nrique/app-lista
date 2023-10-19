import { Animated, NativeModules, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HouseSvg from '../svg/icons/HouseSvg';
import ListSvg from '../svg/icons/ListSvg';
import HeartSvg from '../svg/icons/HeartSvg';
import UserSvg from '../svg/icons/UserSvg';
import Button from '../buttons/Button';
import { useNavigation } from '../../context/NavigationProvider';
import { useTheme } from '../../context/ThemeProvider';
import tw from '../../libs/tailwind';
import LocationDotSvg from '../svg/icons/LocationDotSvg';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  screen: string;
  setScreen: any;
}

const Tabs = () => {

  const { theme } = useTheme()

  const { navigate } = useNavigation()

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

    <View style={tw`py-3 px-6  rounded-t-[35px] bottom-0 absolute flex flex-row justify-between items-center w-full bg-white dark:bg-slate-700`}>



      <Button onPress={()=> switchTo('HomeScreen')}>
        <HouseSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'HomeScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'HomeScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('ListScreen')}>
        <ListSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'ListScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'ListScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('HomeScreen')}>
        <LocationDotSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'MapScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'MapScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>

      <Button onPress={()=> switchTo('UserScreen')}>
        <UserSvg height={38} width={38} fill={theme == 'dark' ? ( selectedScreen == 'UserScreen' ? '#8B5CF6' : '#94A3B8') : ( selectedScreen  == 'UserScreen' ? '#A78BFA' : '#D1D5DB') }/>
      </Button>



    </View>

    // <View style={tw`bottom-0 p-4 flex flex-row items-center justify-between gap-2 w-full bg-white dark:bg-black rounded-t-[35px] absolute`}>
      


    //   <View style={tw`gap-5 flex flex-row`}>

    //     {/* home button */}
    //     <Button onPress={()=> switchTo('HomeScreen')}>
    //       <Animated.View style={[tw``,{opacity: homeOpacity, transform:[{scale: homeScale}] }]}>
    //         <HouseSvg height={30} fill={'#a78bfa'}/>
    //       </Animated.View>
    //     </Button>
    //     {/* home button */}

    //     {/* list button */}
    //     <Button onPress={()=> switchTo('ListScreen')}>
    //       <Animated.View style={{opacity: listOpacity, transform:[{scale: listScale}] }}>
    //         <ListSvg height={30} fill={'#a78bfa'}/>
    //       </Animated.View>
    //     </Button>
    //     {/* list button */}

    //   </View>
      
    //   <View style={tw`gap-5 flex flex-row`}>
          
    //     {/* favorite button */}
    //     <Button onPress={()=>{}}>
    //       <Animated.View style={{opacity: favoriteOpacity, transform:[{scale: favoriteScale}] }}>
    //         <HeartSvg height={30} fill={'#a78bfa'}/>
    //       </Animated.View>
    //     </Button>
    //     {/* favorite button */}

    //     {/* user button */}
    //     <Button onPress={()=> switchTo('UserScreen')}>
    //       <Animated.View style={{opacity: userOpacity, transform:[{scale: userScale}] }}>
    //         <UserSvg height={30} fill={'#a78bfa'}/>
    //       </Animated.View>
    //     </Button>
    //      {/* user button */}

    //   </View>

    // </View>

  )
}

export default Tabs