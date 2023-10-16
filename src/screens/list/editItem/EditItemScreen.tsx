import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, TextInput, BackHandler, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc';
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import CookieSvg from '../../../components/svg/icons/CookieSvg'
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import MinusSvg from '../../../components/svg/icons/MinusSvg';
import { Item } from '../../../libs/storage';
import { useNavigation } from '../../../context/NavigationProvider';
import Button from '../../../components/buttons/Button';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


interface Props {

  selectedItem: Item | null;
  editItem: any
  removeItem: any;

}



const EditItemScreen = ({ selectedItem, editItem, removeItem }: Props) => {

  const { navigate } = useNavigation()

  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(0)).current;

  function changeScreen() {

    if(navigate.isOpen('EditItemScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    if(!navigate.isOpen('EditItemScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  }
  // ------------animation--------------//
  const [ item, setItem ] = useState<Item>()

  function loadItem() {

    if(!selectedItem) return;

    setItem(()=> selectedItem)

  }
  function subtractQuantity() {

    if(!item) return;

    if(item.quantity == 0) return setItem(()=> {return {...item, quantity: 0}})

    setItem((e)=> {

      if(e && e.quantity) return {...e, quantity: e.quantity - 1}

    })

  }

  function sumQuantity() {

    setItem((e)=> {

      if(e && e.quantity) return {...e, quantity: e.quantity + 1}

    })

  }

  function editPrice(event: any) {
    console.log('event', event)
  }

  useEffect(()=>{
    
    changeScreen()
    loadItem()

  },[navigate.isOpen('EditItemScreen'), selectedItem])


  return (

    <Animated.View style={[tw`w-full h-full flex absolute`, { transform: [{translateX: positionScreen}], }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false}>

        <View style={tw`p-3 gap-2 w-full h-full bg-slate-200 flex justify-start`}>

          <View style={tw`items-center justify-center flex flex-row w-full relative`}>

            <Button  onPress={()=> navigate.close('EditItemScreen')} style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
              <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </Button>

            <Text  style={tw`text-slate-500 text-[2rem] text-center font-bold `}>Editar</Text>
          </View>

          <View style={tw`p-3 gap-5 w-full`}>

            <View style={tw`p-4 gap-3 rounded-[1.3rem] w-full flex flex-col justify-start items-center bg-white`}>

              <View style={tw`p-4 flex bg-violet-100 rounded-[.9rem]`}>
                {
                 item && item.image ? <Image style={tw`w-12 h-12`} source={{ uri: item.image }} />
                  : <CookieSvg height={40} width={40} fill={'#a78bfa'}/>
                }
              </View>

              <Text  style={tw`mb-3 text-slate-400 text-[1rem] text-center font-bold `}>{item?.name || 'produto sem nome'}</Text>

            </View>

            <Text  style={tw`text-slate-500 text-[1.8rem] text-center font-bold `}>Quantidade</Text>

            <View style={tw`px-3 flex flex-row w-full justify-between`}>
                
              <Button onPress={subtractQuantity}>
                <View style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`} >
                    <MinusSvg height={36} width={36} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                </View>
              </Button>

              <View style={tw`flex w-11/20 rounded-[1rem] items-center justify-center bg-white`}>

                <Text  style={tw`text-slate-400 text-[1.9rem] text-center font-bold `}>{item && item.quantity || 0}</Text>

              </View>

              <Button onPress={sumQuantity}>
                <View style={tw`w-14 h-14 rounded-[.9rem] flex justify-center items-center bg-violet-400`} >
                    <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                </View>
              </Button>


            </View>

            <Text  style={tw`text-slate-500 text-[1.8rem] text-center font-bold `}>{`Qual o preço\nunitário do item?`}</Text>

            <View style={tw`px-3 flex flex-row w-full justify-center`}>
    
              <View style={tw`flex py-2 px-12 rounded-[1rem] items-center justify-center bg-white`}>
  
                <TextInput onChangeText={editPrice} value={`R$${item?.price || '0.00'}`} keyboardType="numeric" style={tw`p-0 text-violet-400 text-[1.9rem] text-center font-bold relative`} />
  
              </View>
    
            </View>

          </View>
          
          <View style={tw`px-6 gap-5 justify-center items-center mt-auto w-full flex flex-row`}>

            <Button onPress={()=> item && removeItem(item.id)}  style={tw`p-3 w-1/2 rounded-[.9rem] flex justify-center items-center bg-slate-400 ${item && item.quantity ? 'opacity-100' : 'opacity-50'}`}>
              <Text style={tw`text-white text-[1.4rem] text-center font-bold `}>Remover</Text>
            </Button>

            <Button disabled={!item?.quantity} onPress={()=> item && editItem(item)} style={tw`p-3 w-1/2 rounded-[.9rem] flex justify-center items-center bg-violet-400 ${item && item.quantity ? 'opacity-100' : 'opacity-50'}`}>
              <Text style={tw`text-white text-[1.4rem] text-center font-bold `}>Salvar</Text>
            </Button>

          </View>

        </View>

      </KeyboardAvoidingView>
    </Animated.View>

  )
}

export default EditItemScreen

