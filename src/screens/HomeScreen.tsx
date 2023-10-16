import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import Tabs from '../components/navigation/Tabs';
import ScreenLayout from '../components/AnimatedScreen';
import SvgComponent from '../components/svg/SvgComponent';
import NewsScreen from './news/NewsScreen';
import ListScreen from './lists/ListScreen';
import Layout from '../components/Layout';


interface Props {
  open: boolean
}

const HomeScreen = () => {

  console.log('################################################')

   return (

    <View>
      <NewsScreen/>
    </View>

  )
  
}

export default HomeScreen
