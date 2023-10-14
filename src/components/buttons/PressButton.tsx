import { View, Text, TouchableWithoutFeedback, Pressable } from 'react-native'
import React from 'react'

interface Props {
  onPress: any;
  style: string;
}

const Touchable = (props: any) => {
  return (

    <View>
        {/* <Pressable onPress={}>
            <View>
                {props.children}
            </View>
        </Pressable> */}
    </View>

  )
}

export default Touchable