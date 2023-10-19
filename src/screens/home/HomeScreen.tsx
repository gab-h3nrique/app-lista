import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '../../context/NavigationProvider';
import AnimatedScreen from '../../components/view/AnimatedScreen';
import tw from '../../libs/tailwind';

const ListScreen = () => {
  
  const { navigate } = useNavigation()



  useEffect(()=>{
    

  },[])

  return (

    <>
      <AnimatedScreen open={navigate.isOpen('HomeScreen')} style={tw`top-0 bg-slate-200 dark:bg-slate-800 w-full h-full absolute`}>
        <View style={tw`w-full h-full relative`}>

          <View style={tw`flex justify-center items-center w-full h-full `}>

            <Text style={tw`bg-white dark:bg-slate-700 py-8 px-16 rounded-full text-slate-400 dark:text-slate-300 font-bold`}>Em breve</Text>

          </View>

        </View>
      </AnimatedScreen>
    </>

  )
}

export default ListScreen
