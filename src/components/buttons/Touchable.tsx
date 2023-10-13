import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const Touchable = (props: any) => {
  return (

    <View>
        <TouchableWithoutFeedback { ...props }>
            <View>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    </View>

  )
}

export default Touchable