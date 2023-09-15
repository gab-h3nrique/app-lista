import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenLayout from '../../components/ScreenLayout'
import Tabs from '../../components/navigation/Tabs'

const NewsScreen = () => {
  return (
    <>
      <ScreenLayout>

          <View>

            <Text>novatela</Text>
            
          </View>

      </ScreenLayout>

      <Tabs screen={"settings"}/>
    </>
  )
}

export default NewsScreen

const styles = StyleSheet.create({})