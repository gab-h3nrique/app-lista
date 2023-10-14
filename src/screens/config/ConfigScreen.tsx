import { View, Text } from 'react-native'
import React from 'react'
import ScreenLayout from '../../components/AnimatedScreen'
import Tabs from '../../components/navigation/Tabs'

const ConfigScreen = () => {
  return (

    <>
      <ScreenLayout>

          <View>
            <Text>configurações</Text>
            
          </View>

      </ScreenLayout>

      <Tabs screen={"settings"}/>
    </>

  )
}

export default ConfigScreen