import { View, Text, TouchableWithoutFeedback, NativeModules, Animated, Image, FlatList, VirtualizedList, SectionList } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState, useTransition } from 'react'
import ChevronSvg from '../../../components/svg/icons/ChevronSvg';

import ItemComponent from './components/ItemComponent';
import Button from '../../../components/buttons/Button';
import PenSvg from '../../../components/svg/icons/PenSvg';
import SearchSvg from '../../../components/svg/icons/SearchSvg';
import { useTheme } from '../../../context/ThemeProvider';
import tw from '../../../libs/tailwind';
import { Category } from '../../../providers/storage/functions/CategoryFunctions';
import { Product } from '../../../providers/storage/functions/ProductFunctions';
import Storage from '../../../providers/storage/storage';
import { useUser } from '../../../context/UserProvider';
import { useDataStorage } from '../../../context/StorageDataProvider';
import { useNavigation } from '../../../context/navigation/NavigationProvider';
import { Item } from '../../../providers/storage/functions/UserStorageFunctions';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
interface Props {

  category: Category | null;
  selectItem: any;

}

const ItensScreen = (props: any) => {

  const { theme } = useTheme()
  const { dataStorage } = useDataStorage()

  const { navigate } = useNavigation()

  const [ itens, setItens ] = useState<Product[]>([])

  // let itens: Product[] = []
  // let itens: Product[] = dataStorage.product.filter((e)=> props.category ? e.categoryId === props.category.id : e );

  const setItensList = useCallback(()=>{
    setTimeout(()=>{

      setItens(()=>  dataStorage.product.filter((e)=> props.category ? e.categoryId === props.category.id : e ))

    }, 800)

  },[])

  const selectItem = useCallback((product: Product) => {

    const item: Item = {
      id: -1,
      name: product.name,
      price: 0,
      quantity: 0,
      checked: false,
      image: product.image || '',
      productId: product.id || null,
    }

    navigate.open('QuantityScreen', { item })

  }, [])

  useEffect(()=>{
    setItensList()
  },[])

  return (

    <View style={tw`flex p-3 gap-5 w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`items-center justify-center flex flex-row w-full relative`}>

        <Button onPress={navigate.closeLast} style={tw`left-0 top-2 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <Text style={tw`text-slate-500 dark:text-slate-300 text-[2rem] text-center font-bold `}>Itens</Text>

      </View>

      <FlatList data={itens} style={tw`gap-2 flex-1 w-full h-full`}
        renderItem={({item}) => <ItemComponent item={item} onPress={() => selectItem(item)} />}
        keyExtractor={(item, index) => String(index)}
      />

      {/* <VirtualizedList
        initialNumToRender={10}
        renderItem={(item) => <ItemComponent item={item} onPress={() => {}}/>}
        keyExtractor={(item, index) => String(index)}
        getItemCount={()=> itens.length}
        getItem={()=> itens}
      /> */}

      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.name + index}
        renderItem={(item) => (<Text>aaa</Text>)}
      /> */}

      <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

        <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
          <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
        </Button>

        <Button onPress={() => {}} style={tw`w-16 h-16 rounded-full flex justify-center items-center bg-violet-400`} >
          <SearchSvg height={30} width={30} fill={theme == 'dark' ? '#334155':'#FFFFFF'}/>
        </Button>
        
      </View>

    </View>

  )
}

export default memo(ItensScreen)

