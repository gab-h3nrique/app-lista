import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, TextInput, BackHandler, Alert } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc';
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';
import { storage } from '../../../libs/storage';
import ShoppingSvg from '../../../components/svg/icons/ShoppingSvg';
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import CookieSvg from '../../../components/svg/icons/CookieSvg'
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import MinusSvg from '../../../components/svg/icons/MinusSvg';

interface Props {

  open: boolean;
  onClose: any;
  item: any
  setItem: any;
  onConfirm: any

}

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


const QuantityScreen = ({ open, onClose, item, setItem, onConfirm }: Props) => {

  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(0)).current;

  function changeScreen() {

    if(open) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    if(!open) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  }
  // ------------animation--------------//

  


  function subtractQuantity() {

    if(!item.quantity) setItem({ ...item, quantity: 0 })

    setItem({ ...item, quantity: item.quantity > 0 ? Number(item.quantity) - 1 : 0 })

  }

  function sumQuantity() {

    if(!item.quantity) setItem({ ...item, quantity: 0 })

    setItem({ ...item, quantity: Number(item.quantity) + 1 })

  }

  useEffect(()=>{

    if(open) console.log('opening quantityScreen')
    if(!open) console.log('closing quantityScreen')

    changeScreen()

  },[open])


  return (

    <Animated.View style={[tw`w-full h-full flex absolute`, { transform: [{translateX: positionScreen}], }]}>

      <View style={tw`p-3 gap-30 w-full h-full bg-slate-200 flex justify-start`}>

        <View style={tw`items-center justify-center flex flex-row w-full relative`}>

          <View style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
            <TouchableWithoutFeedback onPress={onClose}>
              <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </TouchableWithoutFeedback>
          </View>

          <Text  style={tw`text-slate-500 text-[2rem] text-center font-bold `}>Quantidade</Text>
        </View>

        <View style={tw`p-3 gap-5 w-full`}>

          <View style={tw`p-4 gap-3 rounded-[1.3rem] w-full flex flex-col justify-start items-center bg-white`}>

            <View style={tw`p-4 flex bg-violet-100 rounded-[.9rem]`}>
              {
                item.image ? <Image style={tw`w-12 h-12`} source={{ uri: item.image }} />
                : <CookieSvg height={40} width={40} fill={'#a78bfa'}/>
              }
            </View>

            <Text  style={tw`mb-3 text-slate-400 text-[1rem] text-center font-bold `}>{item.name || 'produto sem nome'}</Text>

          </View>

          <View style={tw`px-3 flex flex-row w-full justify-between`}>
              
            <TouchableWithoutFeedback onPress={subtractQuantity}>
              <View style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`} >
                  <MinusSvg height={36} width={36} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              </View>
            </TouchableWithoutFeedback>

            <View style={tw`flex w-11/20 rounded-[1rem] items-center justify-center bg-white`}>

              {/* <TextInput
              style={tw`text-slate-500 text-center font-bold text-[1.2rem]`}
              onChangeText={(event)=> setItem({...item, quantity: Number(event) })}
              value={item.quantity}
              keyboardType="numeric"
              /> */}
              <Text  style={tw`text-slate-400 text-[1.9rem] text-center font-bold `}>{item.quantity}</Text>

            </View>

            <TouchableWithoutFeedback onPress={sumQuantity}>
              <View style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`} >
                  <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              </View>
            </TouchableWithoutFeedback>


          </View>

        </View>

        <View style={tw`px-6 gap-5 mt-auto w-full flex`}>

          <TouchableWithoutFeedback disabled={!item.quantity} onPress={onConfirm}>
            <View style={tw`p-3 rounded-[.9rem] flex justify-center items-center bg-violet-400 ${item.quantity ? 'opacity-100' : 'opacity-50'}`} >
              <Text style={tw`text-white text-[1.4rem] text-center font-bold `}>Confirmar</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>

      </View>

    </Animated.View>

  )
}

export default QuantityScreen

