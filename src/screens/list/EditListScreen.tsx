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

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  selectedList: any
  saveList: any
}

const EditListScreen = ({ selectedList, saveList}: Props) => {

  const { navigate, screens } = useNavigation()

  // ------------animation--------------//
  const positionScreen = useRef(new Animated.Value(400)).current;
  function changeScreen() {

    if(navigate.isOpen('EditListScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    if(!navigate.isOpen('EditListScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  }
  // ------------animation--------------//

  const [ list, setList ] = useState<List>(selectedList);


  const [ selectedCategory, setSelectedCategory ] = useState<Category>();
  const [ selectedItem, setSelectedItem ] = useState<Item>(EmptyItem)

  function openEditItemScreen(item: Item) {

    navigate.open('EditItemScreen')

    setSelectedItem(()=> item)

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

    navigate.close('CategoryScreen')
    navigate.close('ItensScreen')
    navigate.close('QuantityScreen')

  }

  function addItem(item: Item) {

    const newItem = Storage.List.createItem(selectedList.id, item)

    if(!newItem) return console.warn('error creating item')

    if(list && list.itens) setList((e)=>{ return {...e, itens:[newItem, ...e.itens] } })
    else setList((e)=>{ return {...e, itens:[newItem] } })

    saveList(()=>{ return {...selectedList, itens: [newItem, ...selectedList.itens]} })
    
  }

  function editItem(newItem: any, index?: number) {

    console.log('adding newItem', newItem, index)

  }

  function savingEditedItem(newItem: any) {

    // editItem(newItem, indexSelectedItem)
    // setEditScreenOpen(false)
    // setSelectedItem({})

  }

  function removingEditedItem() {

    // console.log('removing item: ', newItem)

    // const newList = itens.filter((object, i)=> i !== indexSelectedItem)

    // setItens(newList)
    // setIndexSelectedItem(-1)
    // setEditScreenOpen(false)
    // setSelectedItem({})

  }

  useEffect(()=>{
    
    changeScreen()

  },[screens, list])

  return (

    <Animated.View style={[tw`top-0 z-1 bg-slate-200 w-full h-full absolute`, { transform: [{translateX: positionScreen}], }]}>
      <View style={tw`w-full h-full relative`}>

        <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

          <View style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
            <TouchableWithoutFeedback onPress={()=> navigate.close('EditListScreen')}>
              <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </TouchableWithoutFeedback>
          </View>

          <TextInput
          style={tw`text-slate-500 text-center font-bold text-[1.2rem]`}
          onChangeText={(event)=> {}}
          value={selectedList?.name}
          placeholder="Minha nova lista"
          />

        </View>

        <View style={tw`px-4 gap-3 flex justify-start items-center`}>
          {
            list && list.itens.length > 0 ? list.itens.map(( item: any, index: number) =>{

              return (

                <React.Fragment key={index}>
                  <TouchableWithoutFeedback  onLongPress={()=> console.log('ordenação')} onPress={() => openEditItemScreen(item)}>

                    <View style={tw`p-3 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white relative`}>



                      <View style={tw`p-2 flex bg-violet-100 rounded-[.7rem]`}>
                        {
                          item.image ? <Image style={tw`w-8 h-8`} source={{ uri: item.image }} />
                          : <CookieSvg height={32} width={32} fill={'#a78bfa'}/>
                        }
                      </View>

                      <View style={tw`gap-2 flex`}>
          
                        <Text style={tw`text-slate-400 text-[.8rem] font-bold`}>{item.name}</Text>

                        <View style={tw`gap-2 flex flex-row`}>

                          <Text style={tw`px-2 py-1 bg-slate-200 text-slate-600 text-[.6rem] font-bold text-center rounded-full`}>R${item.price || ' -'}</Text>

                        </View>

                      </View>

                      <TouchableWithoutFeedback onPress={() => editItem({...item, checked: !item.checked}, index)}>
                        {
                          item.checked ? <CheckSolidSvg height={30} width={30} fill={'#a78bfa'} marginLeft={"auto"}/>
                          : <CheckOutSvg height={30} width={30} fill={'#CBD5E1'} marginLeft={"auto"} />
                        }
                      </TouchableWithoutFeedback>

                      <View style={tw`-top-2 -left-2 w-8 h-8 rounded-full flex justify-center items-center absolute z-40 ${item.checked ? 'bg-violet-400' : 'bg-slate-300'}`}>
                        <Text style={tw`text-white text-[1rem] font-bold`}>{ (item.quantity && item.quantity > 99 ? '+99' : item.quantity) || 0}</Text>
                      </View>
              
                    </View>
                    
                  </TouchableWithoutFeedback>
                </React.Fragment>
                
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

        <Pressable onPress={() => navigate.open('CategoryScreen')} style={tw`bottom-6 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`} >
          <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Pressable>

        <CategoryScreen selectCategory={selectCategory}/>
        <ItensScreen category={selectedCategory || null} selectItem={selectItem}/>
        <QuantityScreen item={selectedItem || null} selectQuantity={selectQuantity}/>
        {/* <EditItemScreen open={editScreenOpen} onClose={()=> {setEditScreenOpen(false), selectItem(null)}} item={selectedItem || {}} onSave={savingEditedItem} onRemove={removingEditedItem}/> */}
      
      </View>
    </Animated.View>

  )
}

export default EditListScreen