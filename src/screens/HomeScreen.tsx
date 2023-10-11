import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import Tabs from '../components/navigation/Tabs';
import ScreenLayout from '../components/ScreenLayout';
import SvgComponent from '../components/svg/SvgComponent';
import NewsScreen from './news/NewsScreen';
import ListScreen from './lists/ListScreen';

const HomeScreen = () => {

  const [screen, setScreen] = useState<string>("homeScreen")

  return (

    <>
      <ScreenLayout>

      { 
        screen == 'homeScreen' ? <NewsScreen/> :
        screen == 'listScreen' ? <ListScreen/> : 
        null

      }

      {/* <TouchableWithoutFeedback   onPress={()=> { }}>
        <View style={tw`flex justify-center items-center w-full h-full`}>

          <Text style={tw`bg-white py-8 px-16 rounded-full text-slate-300 font-bold`}>Em breve</Text>
          
        </View>

      </TouchableWithoutFeedback> */}

      </ScreenLayout>

      <Tabs screen={screen} setScreen={setScreen}/>
      
    </>

  )
}

export default HomeScreen
