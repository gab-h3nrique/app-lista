import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import CookieSvg from '../../../components/svg/icons/CookieSvg'
import { useNavigation } from '../../../context/NavigationProvider';
import ItemComponent from './ItemComponent';
import Button from '../../../components/buttons/Button';
import PenSvg from '../../../components/svg/icons/PenSvg';
import SearchSvg from '../../../components/svg/icons/SearchSvg';
import { useTheme } from '../../../context/ThemeProvider';
import tw from '../../../libs/tailwind';
import { Category } from '../../../providers/storage/functions/CategoryFunctions';
import { Product } from '../../../providers/storage/functions/ProductFunctions';
import Storage from '../../../providers/storage/storage';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
interface Props {

  category: Category | null;
  selectItem: any;

}



const ItensScreen = ({ category, selectItem }: Props) => {

  const { navigate, screens } = useNavigation()
  const { theme } = useTheme()

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

      <View style={tw`p-3 gap-5 w-full h-full bg-slate-200 dark:bg-slate-800`}>

        <View style={tw`items-center justify-center flex flex-row w-full relative`}>

        <Button onPress={()=> navigate.close('ItensScreen')} style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

          <Text  style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Itens</Text>

        </View>

        <FlatList data={itens} style={tw`gap-2 flex-1 w-full h-full`}
        renderItem={({item}) => <ItemComponent item={item} onPress={() => selectItem(item)} />}
        keyExtractor={(item, index) => String(index)}
        />

        {/* <View style={tw`gap-4 flex justify-start items-center`}>

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

  )
}

export default ItensScreen

