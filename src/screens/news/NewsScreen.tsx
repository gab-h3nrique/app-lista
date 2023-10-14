import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenLayout from '../../components/AnimatedScreen'
import Tabs from '../../components/navigation/Tabs'
import tw from 'twrnc';

const NewsScreen = () => {
  return (

    <View style={tw`flex justify-center items-center w-full h-full`}>

      <Text style={tw`bg-white py-8 px-16 rounded-full text-slate-300 font-bold`}>Em breve</Text>

    </View>

  )
}

export default NewsScreen

const styles = StyleSheet.create({})