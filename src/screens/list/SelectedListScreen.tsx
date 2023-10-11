import { View, Text, TouchableWithoutFeedback, TextInput, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import { storage } from '../../libs/storage';
import { useSelectedList } from '../../context/SelectedListProvider';
import ArrowSvg from '../../components/svg/icons/ArrowSvg';
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


const SelectedListScreen = () => {

  const { selectedList, setSelectedList } = useSelectedList()

  function goBack() {

    console.log('closing selectedListScreen')
    setSelectedList({...selectedList, screenOpen: false})

  }

  // storage.getBoolean('openSelectedListScreen')

  const [ step, setStep ] = useState(0)
  const [ categoryScreenOpen, setCategoryScreenOpen ] = useState(false)
  const [ itensScreenOpen, setItensScreenOpen ] = useState(false)
  const [ quantityScreenOpen, setQuantityScreenOpen ] = useState(false)

  const [ editScreenOpen, setEditScreenOpen ] = useState(false)
  
  
  const [ itens, setItens ] = useState<any[]>([])
  const [ category, setCategory ] = useState<any>()

  const [ selectedItem, setSelectedItem ] = useState<any>()
  const [ indexSelectedItem, setIndexSelectedItem ] = useState(-1)

  function openEditItemScreen(item: any, index: number = -1) {

    setStep(4)
    setSelectedItem(item)
    setIndexSelectedItem(index)
    setEditScreenOpen(true)

  }

  function selectCategory(value: any) {

    if(!value) return;

    setStep(2)
    setCategory(value)
    setItensScreenOpen(true)

  }

  function selectItem(value: any) {

    if(!value) return;

    setStep(3)
    setSelectedItem(value)
    setQuantityScreenOpen(true)

  }

  function addItem(){

    setStep(1)
    setCategoryScreenOpen(false)
    setItensScreenOpen(false)
    setQuantityScreenOpen(false)

    setItens([...itens, selectedItem])
    
    console.log('itens:', itens)
    console.log('adding item:', selectedItem)

  }

  function editItem(newItem: any, index?: number) {

    console.log('newItem', newItem, index)

    const newList = itens.map((object, i)=> i === index ? newItem : object)

    setItens(newList)
    setIndexSelectedItem(-1)

  }

  function savingEditedItem(newItem: any) {

    setStep(0)
    editItem(newItem, indexSelectedItem)
    setEditScreenOpen(false)
    setSelectedItem({})

  }

  function removingEditedItem() {

    const newList = itens.filter((object, i)=> i !== indexSelectedItem)

    setStep(0)
    setItens(newList)
    setIndexSelectedItem(-1)
    setEditScreenOpen(false)
    setSelectedItem({})

  }

  function onBackPress() {

    console.debug('############### back button pressed ###############')

    /// close first screen after open a list
    if(step === 0) {
      goBack()
    } 

    /// close categories screen
    if(step == 1) {
      setCategoryScreenOpen(false)
      setStep(0)
    } 

    /// close 'choose itens' screen
    if(step == 2) {
      setStep(1)
      setItensScreenOpen(false)
    } 

    /// close quantity screen
    if(step == 3) {
      setStep(2)
      setQuantityScreenOpen(false)
    }

    /// close editItem screen 
    if(step == 4) {
      setStep(0)
      setEditScreenOpen(false)
    }

    return true;

  };

  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  useEffect(()=>{

    if(!selectedList.screenOpen) BackHandler.removeEventListener('hardwareBackPress', onBackPress);

  },[selectedList.screenOpen])

  return (

    <View style={tw`top-0 ${selectedList.screenOpen ? 'flex' : 'hidden'} bg-slate-200 w-full h-full absolute`}>
      <View style={tw`w-full h-full relative`}>

        <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

          <View style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
            <TouchableWithoutFeedback onPress={goBack}>
              <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
            </TouchableWithoutFeedback>
          </View>

          <TextInput
          style={tw`text-slate-500 text-center font-bold text-[1.2rem] mt-1`}
          onChangeText={(event)=> setSelectedList({...selectedList, list: {...selectedList.list, name: event} })}
          value={selectedList.list.name}
          placeholder="Minha nova lista"
          />

        </View>

        <View style={tw`px-4 gap-3 flex justify-start items-center`}>
          {
            itens.length > 0 ? itens.map(( item: any, index: number) =>{

              return (

                <React.Fragment key={index}>
                  <TouchableWithoutFeedback  onLongPress={()=> console.log('ordenação')} onPress={() => openEditItemScreen(item, index)}>

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

                <TouchableWithoutFeedback onPress={() => setCategoryScreenOpen(true)} style={tw`flex w-full`}>
                  <View style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white`} >

                    <PlusSvg height={35} width={35} fill={'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                    <Text  style={tw`text-slate-400 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
                  
                  </View>
                </TouchableWithoutFeedback>

              </View>

          }
        </View>

        <View style={tw`bottom-6 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`} >
          <TouchableWithoutFeedback onPress={() => setCategoryScreenOpen(true)}>
                <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </TouchableWithoutFeedback>
        </View>

        <CategoryScreen open={categoryScreenOpen} onClose={()=> {setCategoryScreenOpen(false), setCategory(null)}} selectCategory={selectCategory}/>
        <ItensScreen open={itensScreenOpen} onClose={()=> {setItensScreenOpen(false), selectItem(null)}} itens={category?.itens || []} setItem={selectItem}/>
        <QuantityScreen open={quantityScreenOpen} onClose={()=> {setQuantityScreenOpen(false), selectItem(null)}} item={selectedItem || {}} setItem={selectItem} onConfirm={addItem}/>
        <EditItemScreen open={editScreenOpen} onClose={()=> {setEditScreenOpen(false), selectItem(null)}} item={selectedItem || {}} onSave={savingEditedItem} onRemove={removingEditedItem}/>
      
      </View>
    </View>

  )
}

export default SelectedListScreen