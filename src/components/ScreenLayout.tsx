import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

export interface Props {
  page: string;
  children: React.ReactNode
}

const ScreenLayout = ({children}: Props) => {
  return (

    <View style={tw`w-full h-[92%]`}>
        
        {children}

    </View>

  )
}

export default ScreenLayout