import { View, Text, TouchableWithoutFeedback, TextInput, Image, BackHandler, NativeModules, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc';
import { Category, EmptyItem, Item, List, Product, Storage } from '../../libs/storage';
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import CategoryScreen from './category/CategoryScreen';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import ItensScreen from './itens/ItensScreen';
import QuantityScreen from './quantity/QuantityScreen';
import CookieSvg from '../../components/svg/icons/CookieSvg';
import CheckSolidSvg from '../../components/svg/icons/CheckSolidSvg';
import CheckOutSvg from '../../components/svg/icons/CheckOutSvg';
import EditItemScreen from './editItem/EditItemScreen';
import { useNavigation } from '../../context/NavigationProvider';
import Button from '../../components/buttons/Button';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  selectedList: List | null
  loadLists: any
}

const EditListScreen = ({ selectedList, loadLists}: Props) => {

  const { navigate, screens } = useNavigation()

  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(400)).current;
  function changeScreen() {

    if(navigate.isOpen('EditListScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    if(!navigate.isOpen('EditListScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  }
  // ------------animation--------------//

  const [ selectedListItens, setSelectedListItens ] = useState<Item[]>();


  const [ selectedCategory, setSelectedCategory ] = useState<Category>();
  const [ selectedItem, setSelectedItem ] = useState<Item>(EmptyItem)

  function getListItens() {

    if(!selectedList) return;

    setSelectedListItens(()=> Storage.Item.getByListId(selectedList.id))

  }

  function editSelectedList(list: List) {

    if(!selectedList) return console.warn('this list is null')

    const updatedList = Storage.List.update(list.id, list)

    if(!updatedList) return console.warn('error updating list')

    loadLists()

  }

  function openEditItemScreen(item: Item) {

    setSelectedItem(()=> item)

    navigate.open('EditItemScreen')

  }

  function selectCategory(category: Category) {

    if(!category) return;

    setSelectedCategory(()=> category)

    navigate.open('ItensScreen')

  }

  function selectItem(product: Product) {

    if(!product) return;

    const newItem: Item = {
      id: -1,
      name: product.name,
      price: 0,
      quantity: 0,
      checked: false,
      image: product.image || '',
      productId: product.id || null,
    }

    setSelectedItem(()=> newItem)
    
    navigate.open('QuantityScreen')

  }

  function selectQuantity(quantity: number) {

    const editedItem: Item = {...selectedItem, quantity: quantity}

    addItem(editedItem)

  }

  function addItem(item: Item) {

    if(!selectedList) return console.warn('this list is null')

    const newItem = Storage.Item.create({...item, listId: selectedList.id})

    if(!newItem) return console.warn('error creating item')

    getListItens()

    loadLists()

    navigate.close('CategoryScreen')
    navigate.close('ItensScreen')
    navigate.close('QuantityScreen')

  }

  function editItem(item: Item) {

    const editedItem = Storage.Item.update(item.id, item)

    if(!editedItem) return console.warn('error editing item')

    getListItens()

    navigate.close('EditItemScreen')

  }

  function removeItem(id: number) {

    const isDeleted = Storage.Item.delete(id)

    if(!isDeleted) return console.warn('error removing item')

    getListItens()

    loadLists()

    navigate.close('EditItemScreen')

  }

  useEffect(()=>{
    
    changeScreen()
    if(navigate.isOpen('EditListScreen')) getListItens()

  },[navigate.isOpen('EditListScreen')])

  useEffect(()=>{
    
    console.debug('2--------------EditListScreen')

  },[])

  return (

    <Animated.View style={[tw`top-0 z-1 bg-slate-200 w-full h-full absolute`, { transform: [{translateX: positionScreen}], }]}>
      <View style={tw`w-full h-full relative`}>

        <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

          <Pressable  onPress={()=> navigate.close('EditListScreen')} style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
            <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Pressable>

          <TextInput onChangeText={(event)=> selectedList && editSelectedList({...selectedList, name: event})} value={selectedList?.name} style={tw`text-slate-500 text-center font-bold text-[1.2rem]`}/>

        </View>

        <View style={tw`px-4 gap-3 flex justify-start items-center`}>
          {
            selectedListItens && selectedListItens.length > 0 ? selectedListItens.map(( item, i: number) =>{

              return (

                <Button key={i} onLongPress={()=> console.log('ordenação')} onPress={() => openEditItemScreen(item)} style={tw`p-2 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white relative`}>

                  <View style={tw`p-2 flex bg-violet-100 rounded-[.7rem]`}>
                    {
                      item.image ? <Image style={tw`w-6 h-6`} source={{ uri: item.image }} />
                      : <CookieSvg height={25} width={25} fill={'#a78bfa'}/>
                    }
                  </View>

                  <View style={tw`gap-1 flex`}>
      
                    <Text style={tw`text-slate-400 text-[.8rem] font-bold`}>{item.name}</Text>

                    <View style={tw`gap-2 flex flex-row`}>

                      <Text style={tw`px-2 py-1 bg-slate-200 text-slate-500 text-[.51rem] font-bold text-center rounded-full`}>R${item.price || ' -'}</Text>

                    </View>

                  </View>

                  <Button onPress={() => editItem({...item, checked: !item.checked})} style={tw`ml-auto`}>
                    {
                      item.checked ? <CheckSolidSvg height={25} width={25} fill={'#a78bfa'}/>
                      : <CheckOutSvg height={25} width={25} fill={'#CBD5E1'} />
                    }
                  </Button>

                  <View style={tw`-top-2 -left-2 w-8 h-8 rounded-full flex justify-center items-center absolute z-40 ${item.checked ? 'bg-violet-400' : 'bg-slate-300'}`}>
                    <Text style={tw`text-white text-[1rem] font-bold`}>{ (item.quantity && item.quantity > 99 ? '+99' : item.quantity) || 0}</Text>
                  </View>
                  
                </Button>
                
              )

            })

            : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>

                <View style={tw`p-10 opacity-60 rounded-full bg-white`}>
                  <ShoppingSvg height={150} width={150} fill={'#CBD5E1'}/>
                </View>

                  <Pressable onPress={() => navigate.open('CategoryScreen')} style={tw`p-4 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white`} >
                    <PlusSvg height={28} width={28} fill={'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                    <Text style={tw`text-slate-400 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
                  </Pressable>

              </View>

          }
        </View>

        <Button onPress={() => navigate.open('CategoryScreen')} style={tw`bottom-6 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`} >
          <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <CategoryScreen selectCategory={selectCategory}/>
        <ItensScreen category={selectedCategory || null} selectItem={selectItem}/>
        <QuantityScreen item={selectedItem || null} selectQuantity={selectQuantity}/>
        <EditItemScreen selectedItem={selectedItem} editItem={editItem} removeItem={removeItem}/>
      
      </View>
    </Animated.View>

  )
}

export default EditListScreen