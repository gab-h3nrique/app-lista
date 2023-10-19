import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ArrowSvg from '../../../components/svg/icons/ArrowSvg';
import ShoppingSvg from '../../../components/svg/icons/ShoppingSvg';
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';
import { useNavigation } from '../../../context/NavigationProvider';
import PlusSvg from '../../../components/svg/icons/PlusSvg';
import SearchSvg from '../../../components/svg/icons/SearchSvg';
import PenSvg from '../../../components/svg/icons/PenSvg';
import { useTheme } from '../../../context/ThemeProvider';
import tw from '../../../libs/tailwind';
import ItemComponent from './ItemComponent';
import Button from '../../../components/buttons/Button';
import { Category } from '../../../providers/storage/functions/CategoryFunctions';
import Storage from '../../../providers/storage/storage';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
interface Props {

  selectCategory: any;

}


const CategoryScreen = ({ selectCategory }: Props) => {

  const { navigate, screens } = useNavigation()
  const { theme } = useTheme()

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

  },[navigate.isOpen('CategoryScreen')])

  useEffect(()=>{
    
    console.debug('3--------------CategoryScreen')

  },[])


  return (
    <>
      <Animated.View style={[tw`w-full h-full flex absolute`, { transform: [{translateX: positionScreen}], }]}>

        <View style={tw`p-3 gap-5 w-full h-full bg-slate-200 dark:bg-slate-800`}>

          <View style={tw`items-center justify-center flex flex-row w-full relative`}>

            <Button onPress={()=> navigate.close('CategoryScreen')} style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
              <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </Button>

            <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Categorias</Text>

          </View>

          <FlatList data={categories} style={tw`gap-2 flex-1 w-full h-full`}
          renderItem={({item}) => <ItemComponent item={item} onPress={() => selectCategory(item)} />}
          keyExtractor={(item, index) => String(index)}
          />

          {/* <View style={tw`gap-4 flex justify-start items-center`}>

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


          </View> */}

        </View>

        <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

          <Button onPress={() => {navigate.open('CategoryScreen'), navigate.open('itensScreen')}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
            <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
          </Button>

          <Button onPress={() => {navigate.open('CategoryScreen'), navigate.open('itensScreen')}} style={tw`w-16 h-16 rounded-full flex justify-center items-center bg-violet-400`} >
            <SearchSvg height={30} width={30} fill={theme == 'dark' ? '#334155':'#FFFFFF'}/>
          </Button>
          
        </View>

      </Animated.View>
    </>
    

  )
}

export default CategoryScreen

