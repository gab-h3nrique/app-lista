import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import Tabs from '../components/navigation/Tabs';
import ScreenLayout from '../components/ScreenLayout';
import SvgComponent from '../components/svg/SvgComponent';

const HomeScreen = () => {

  const [screen, setScreen] = useState<string>("")

  const [ teste, setTeste ] = useState<string>("s")

  return (

    <>
      <ScreenLayout>

      <TouchableWithoutFeedback   onPress={()=> { setTeste('aaaaaaaaaaaaaaaaaaa')}}>
        <View>

          <Text>Inicio abc {teste}</Text>
          
        </View>

      </TouchableWithoutFeedback>

      </ScreenLayout>

      <Tabs screen={"initial"}/>
    </>

  )
}

export default HomeScreen
