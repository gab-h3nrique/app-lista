import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc';
import { useNavigation } from '../context/NavigationProvider';
import NewsScreen from './news/NewsScreen';
import AnimatedScreen from '../components/view/AnimatedScreen';

const ListScreen = () => {
  
  const { navigate } = useNavigation()



  useEffect(()=>{
    

  },[])

  return (

    <>
      <AnimatedScreen open={navigate.isOpen('HomeScreen')} style={tw`top-0 bg-slate-200 w-full h-full absolute`}>
        <View style={tw`w-full h-full relative`}>


        <NewsScreen/>




        </View>
      </AnimatedScreen>
    </>

  )
}

export default ListScreen
