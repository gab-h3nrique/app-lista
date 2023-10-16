import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../components/AnimatedScreen'
import Tabs from '../../components/navigation/Tabs'
import tw from 'twrnc';
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import PlusButton from './components/PlusButton';
import { List, Storage } from '../../libs/storage';
import { useNavigation } from '../../context/NavigationProvider';
import EditItemScreen from '../list/editItem/EditItemScreen';
import EditListScreen from '../list/EditListScreen';
import Button from '../../components/buttons/Button';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';

interface Props {
  open: boolean
}

const ListScreen = () => {
  
  const { navigate, screens} = useNavigation()

  const [ listState, setListState ] = useState<List[]>(Storage.List.getMany())
  const [ selectedList, setSelectedList ] = useState<List>()

  function loadLists() {

    setListState(()=> Storage.List.getMany())

  }

  async function createNewList() {


    // const data = `${new Date().getUTCDate()}/${new Date().getUTCMonth()+1}/${new Date().getUTCFullYear()}`

    const newList = Storage.List.create({name: `Nova lista`, checked: false})

    if(!newList) return console.warn('list was not created')

    setListState((li)=>[newList, ...li])

    setSelectedList(newList)

    navigate.open('EditListScreen')

  }

  async function saveSelectedList(list: List) {

    setSelectedList(()=> list)
    setListState((e)=> e.map((e)=> e.id === list.id ? list : e))

  }

  async function openEditList(list: List) {

    setSelectedList(()=> list)

    navigate.open('EditListScreen')

  }



  useEffect(()=>{

    console.debug('2--------------EditListScreen')
    loadLists()

  },[])

  return (

    <View style={tw`relative w-full h-full`}>



        <View style={tw`flex justify-start items-center w-full h-full`}>

          <View style={tw`p-2 mt-2`}>
            <Text  style={tw`text-violet-400 text-[1.2rem] text-center font-bold `}>Minhas Listas</Text>
          </View>

          <ScrollView>
            <View style={tw`mb-[3.5rem] p-4 gap-2 flex justify-start items-center w-full h-full`}>

              {
                listState.length > 0 ? listState.map((e: List, index) =>{

                  return (

                    <Button key={index} onPress={() => openEditList(e)} style={tw`p-2 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white`}>

                      <View style={tw`p-2 flex bg-violet-100 rounded-[.7rem]`}>
                        <ShoppingSvg height={25} width={25} fill={"#a78bfa"}/>
                      </View>
              
                      <View style={tw`gap-1 flex`}>
              
                        <Text style={tw`text-slate-400 text-[.8rem] font-bold`}>{e.name}</Text>
              
                        <View style={tw`gap-2 flex flex-row`}>
              
                          <Text style={tw`px-2 py-1 bg-slate-200 text-slate-500 text-[.51rem] font-bold text-center rounded-full`}>{e.itens && e.itens.length || 0} itens</Text>
                          <Text style={tw`px-2 py-1 bg-slate-200 text-slate-500 text-[.51rem] font-bold text-center rounded-full`}>R${0.0}</Text>
              
                        </View>
              
                      </View>
              
                      <ChevronSvg height={25} width={25} fill={'#a78bfa'} marginLeft={"auto"}/>

                    </Button>
                    
                  )

                })

                : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>
                    
                    <View style={tw`p-10 opacity-60 rounded-full bg-white`}>
                      <ShoppingSvg height={150} width={150} fill={'#CBD5E1'}/>
                    </View>

                    <TouchableWithoutFeedback onPress={createNewList} style={tw`flex w-full`}>
                      <View style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white`} >

                        <PlusSvg height={35} width={35} fill={'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                        <Text  style={tw`text-slate-400 text-[1.15rem] text-center font-bold `}>Crie uma lista</Text>
                      
                      </View>
                    </TouchableWithoutFeedback>

                  </View>

              }

            </View>


          </ScrollView>


        </View>

      <Button onPress={createNewList} style={tw`bottom-22 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`}>
        <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
      </Button>

      <EditListScreen selectedList={selectedList || null} loadLists={loadLists}/>

    </View>

  )
}

export default ListScreen
