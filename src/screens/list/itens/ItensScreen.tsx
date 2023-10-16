import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc';
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import CookieSvg from '../../../components/svg/icons/CookieSvg'
import { useNavigation } from '../../../context/NavigationProvider';
import { Category, Item, Product, Storage } from '../../../libs/storage';

interface Props {

  category: Category | null;
  selectItem: any;

}

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


const ItensScreen = ({ category, selectItem }: Props) => {

  const { navigate, screens } = useNavigation()
  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(0)).current;

  function changeScreen() {

    if(navigate.isOpen('ItensScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    if(!navigate.isOpen('ItensScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  }
  // ------------animation--------------//

  const [ itens, setItens ] = useState<Product[]>()

  function getItens() {

    if(category && category.id) setItens(()=> Storage.Product.getByCategory(category.id))

  }


  useEffect(()=>{

    changeScreen()
    getItens()

  },[navigate.isOpen('ItensScreen'), category])

  useEffect(()=>{
    
    console.debug('4--------------ItensScreen')

  },[])

  return (

    <Animated.View style={[tw`w-full h-full flex absolute`, { transform: [{translateX: positionScreen}], }]}>

      <View style={tw`p-3 gap-5 w-full h-full bg-slate-200`}>

        <View style={tw`items-center justify-center flex flex-row w-full relative`}>

          <View style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
            <TouchableWithoutFeedback onPress={()=> navigate.close('ItensScreen')}>
              <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </TouchableWithoutFeedback>
          </View>

          <Text  style={tw`text-slate-500 text-[2rem] text-center font-bold `}>Itens</Text>
        </View>

        <View style={tw`gap-4 flex justify-start items-center`}>

          {
            itens && itens.length > 0 ? 

              itens.map(( item, index: number) =>{

                return (

                  <React.Fragment key={index}>
                    <TouchableWithoutFeedback onPress={() => selectItem(item)}>

                      <View style={tw`p-3 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white`}>

                        <View style={tw`p-1 flex bg-violet-100 rounded-[.7rem]`}>
                          {
                            item.image ? <Image style={tw`w-8 h-8`} source={{ uri: item.image }} />
                            : <CookieSvg height={32} width={32} fill={'#a78bfa'}/>
                          }
                        </View>
                
                        <Text style={tw`text-slate-400 text-[1.2rem] font-bold`}>{item.name}</Text>
                
                        <ChevronSvg height={25} width={25} fill={'#a78bfa'} marginLeft={"auto"}/>
              
                      </View>
                      
                    </TouchableWithoutFeedback>
                  </React.Fragment>
                  
                )

              })

            : null

          }


        </View>

      </View>

    </Animated.View>

  )
}

export default ItensScreen

