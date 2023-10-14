import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc';
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';
import { Storage, Category } from '../../../libs/storage';
import ShoppingSvg from '../../../components/svg/icons/ShoppingSvg';
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';
import { useNavigation } from '../../../context/NavigationProvider';
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import SearchSvg from '../../../components/svg/icons/SearchSvg';
import PenSvg from '../../../components/svg/icons/PenSvg';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
interface Props {

  selectCategory: any;

}


const CategoryScreen = ({ selectCategory }: Props) => {

  const { navigate, screens } = useNavigation()
  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(400)).current;

  function changeScreen() {

    if(navigate.isOpen('CategoryScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    if(!navigate.isOpen('CategoryScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  }
  // ------------animation--------------//

  const [ categories, setCategories ] = useState<Category[]>(Storage.Category.getMany())

  useEffect(()=>{

    changeScreen()

  },[screens])


  return (
    <>
      <Animated.View style={[tw`w-full h-full flex absolute`, { transform: [{translateX: positionScreen}], }]}>

        <View style={tw`p-3 gap-5 w-full h-full bg-slate-200`}>

          <View style={tw`items-center justify-center flex flex-row w-full relative`}>

            <View style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
              <TouchableWithoutFeedback onPress={()=> navigate.close('CategoryScreen')}>
                <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              </TouchableWithoutFeedback>
            </View>

            <Text  style={tw`text-slate-500 text-[2rem] text-center font-bold `}>Categorias</Text>
          </View>

          <View style={tw`gap-4 flex justify-start items-center`}>

            {
              categories.length > 0 ? 

                categories.map(( category, index: number) =>{

                  return (

                    <React.Fragment key={index}>
                      <TouchableWithoutFeedback onPress={() => selectCategory(category)}>

                        <View style={tw`p-3 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white`}>

                          <View style={tw`p-1 flex bg-violet-100 rounded-[.7rem]`}>
                            {category.image ? <Image style={tw`w-8 h-8`} source={{ uri: category.image || '' }} /> : null}
                          </View>
                  
                          <Text style={tw`text-slate-400 text-[1.2rem] font-bold`}>{category.name}</Text>
                  
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

        <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

          <Pressable  onPress={() => {navigate.open('CategoryScreen'), navigate.open('itensScreen')}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400`}>
            <PenSvg height={13} width={13} fill={'white'}/>
          </Pressable>

          <Pressable onPress={() => {navigate.open('CategoryScreen'), navigate.open('itensScreen')}} style={tw`w-16 h-16 rounded-full flex justify-center items-center bg-violet-400`} >
            <SearchSvg height={30} width={30} fill={'white'}/>
          </Pressable>
          
        </View>

      </Animated.View>
    </>
    

  )
}

export default CategoryScreen

