import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const ScreenLayout = ({children}:any) => {
  return (

    <View style={tw`w-full h-[92%]`}>
        
        {children}

    </View>

  )
}

export default ScreenLayout