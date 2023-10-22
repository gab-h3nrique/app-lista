import { View, Text, TouchableWithoutFeedback, TextInput, Image, BackHandler, NativeModules, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PlusSvg from '../../components/svg/icons/PlusSvg';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import Button from '../../components/buttons/Button';
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import ItemListComponent from './ItemListComponent';
import PenSvg from '../../components/svg/icons/PenSvg';
import { Category } from '../../providers/storage/functions/CategoryFunctions';
import { Item, List } from '../../providers/storage/functions/UserStorageFunctions';
import { Product } from '../../providers/storage/functions/ProductFunctions';
import Storage from '../../providers/storage/storage';
import { User, useUser } from '../../context/UserProvider';
import { useNavigation } from '../../context/navigation/NavigationProvider';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


const EditListScreen = (props: any) => {

  const { theme } = useTheme()
  const { user, setUser } = useUser()
  const { navigate } = useNavigation()

  const [ selectedCategory, setSelectedCategory ] = useState<Category>();
  const [ selectedItem, setSelectedItem ] = useState<Item>({name: '', checked: false, id: -1, price: 0, quantity: 0})

  function editSelectedList(list: List) {

    if(!user.selectedList) return console.warn('this list is null')

    const updatedList = Storage.List.update(list.id, list)

    if(!updatedList) return console.warn('error updating list')

    setUser((u: User)=>{

      return {
        ...u, 
        // lists: u.lists.map((e)=> e.id === updatedList.id ? updatedList : e), 
        selectedList: updatedList
      }

    })

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

    if(!user.selectedList) return console.warn('this list is null')

    const newItem = Storage.Item.create({...item, listId: user.selectedList.id})

    if(!newItem) return console.warn('error creating item')

    let newItemArray: Item[] = []

    if(user.selectedList.itens) newItemArray = [newItem, ...user.selectedList.itens]
    else newItemArray = [newItem]

    setUser((u: User)=>{

      return {
        ...u, 
        // lists: Storage.List.getMany(),
        selectedList: {...u.selectedList, itens: newItemArray}
      }

    })

    // getListItens()

    navigate.close('CategoryScreen')
    navigate.close('ItensScreen')
    navigate.close('QuantityScreen')

  }

  function editItem(item: Item) {

    const editedItem = Storage.Item.update(item.id, item)

    if(!editedItem) return console.warn('error editing item')

    if(!user.selectedList) return console.warn('any list was selected')

    const updatedList = Storage.List.get(user.selectedList.id)

    setUser((e: User)=>{
      return {
        ...e, 
        lists:  Storage.List.getMany(),
        selectedList: updatedList
      } as User
    })

    navigate.close('EditItemScreen')

  }

  function removeItem(id: number) {

    const isDeleted = Storage.Item.delete(id)

    if(!isDeleted) return console.warn('error removing item')

    setUser((u: User)=>{

      return {
        ...u, 
        // lists: Storage.List.getMany(),
        selectedList: {
          ...u.selectedList, 
          itens:  u.selectedList && u.selectedList.itens ? u.selectedList?.itens.filter((e)=> e.id !== id) : [],
        }
      }

    })

    navigate.close('EditItemScreen')

  }



  return (
    
      <View style={tw`w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

        <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

          <Button  onPress={()=> navigate.close('EditListScreen')} style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
            <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>

          <TextInput onChangeText={(event)=> user.selectedList && editSelectedList({...user.selectedList, name: event})} value={user.selectedList?.name} style={tw`text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/>

        </View>

        <View style={tw`px-4 gap-3 flex justify-start items-center`}>

          {

            user.selectedList && user.selectedList.itens.length > 0 ? user.selectedList.itens.map(( item, i) =>
              <React.Fragment key={i}>
                <ItemListComponent item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editItem({...item, checked: !item.checked})}/>
              </React.Fragment>
            )

            : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>

                <View style={tw`p-10 rounded-[2rem] bg-white dark:bg-slate-700`}>
                  <Image height={130} width={130} source={require('../../assets/images/foods.png')} />
                </View>

                <Button onPress={() => navigate.open('CategoryScreen')} style={tw`p-4 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`} >
                  <PlusSvg height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                  <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
                </Button>

              </View>

          }

        </View>

        <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

          <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
            <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
          </Button>

          <Button onPress={() => { navigate.open('CategoryScreen') }} style={tw`w-16 h-16 rounded-full flex justify-center items-center bg-violet-400`} >
            <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>

        </View>


      </View>

  )
}

export default EditListScreen