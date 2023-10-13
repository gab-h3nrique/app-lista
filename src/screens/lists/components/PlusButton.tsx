import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import PlusSvg from '../../../components/svg/icons/PlusSvg'
import tailwind from 'twrnc'



const PlusButton = (props: any) => {

    const { style, onEvents } = props;

  return (

    <TouchableWithoutFeedback {...onEvents}>
        <View style={style} >
            {props.children}
        </View>
    </TouchableWithoutFeedback>
  )
}

export default PlusButton