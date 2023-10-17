import { Animated, NativeModules, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedScreen from '../../components/view/AnimatedScreen';
import { useNavigation } from '../../context/NavigationProvider';
import Button from '../../components/buttons/Button';


import tw, { useDeviceContext, useAppColorScheme } from 'twrnc';
import Storage from '../../providers/storage/storage';
import { useTheme } from '../../context/ThemeProvider';


const UserScreen = () => {

  const { theme, setAppTheme } = useTheme()
  
  const { navigate } = useNavigation()

  useDeviceContext(tw, { withDeviceColorScheme: false });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw, theme as any);


  useEffect(()=>{
    

  },[colorScheme])

  return (

    <>
      <AnimatedScreen open={navigate.isOpen('UserScreen')} style={tw`top-0 w-full h-full absolute`}>
          <View style={tw`flex justify-center items-center w-full h-full absolute`}>

            <Button onPress={()=> setAppTheme('dark')} style={tw`p-3 rounded-[.9rem] bg-violet-500 dark:bg-black`}>
              <Text style={tw`text-white font-bold text-[1.2rem]`}>Dark</Text>
            </Button>

            <Button onPress={()=> setAppTheme('light')} style={tw`p-3 rounded-[.9rem] bg-violet-500 dark:bg-black`}>
              <Text style={tw`text-white font-bold text-[1.2rem]`}>Light</Text>
            </Button>

          </View>
      </AnimatedScreen>
    </>


  )
}

export default UserScreen
