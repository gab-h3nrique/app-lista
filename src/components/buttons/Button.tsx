import { View, Text, TouchableWithoutFeedback, Pressable } from 'react-native'
import React from 'react'

const Button = (props: any) => {

  const { android_disableSound , ...rest } = props

  return (

    <Pressable android_disableSound={!android_disableSound ? true : false } {...props}>
      {props.children}
    </Pressable>

  )
}

export default Button