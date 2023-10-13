import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../components/ScreenLayout'
import Tabs from '../../components/navigation/Tabs'
import tw from 'twrnc';
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import SelectedListScreen from '../list/SelectedListScreen';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import PlusButton from './components/PlusButton';
import { storage } from '../../libs/storage';

interface Props {
  open: boolean
}

const ListScreen = ({ open }: Props) => {

  // const [ listArray, setListArray ] = useState<any[]>([{name: "lista para academia", price: 15.85, itens: 7}])
  const [selectedListScreenOpen, setSelectedListScreenOpen] = useState(false)

  
  const [ list, setList ] = useState<any[]>([])
  const [ selectedList, setSelectedList ] = useState<any>()

  function getAllList() {

    try{

      setList(JSON.parse(storage.getString('userList') || "[]"))

    } catch(error) { console.log('erro in get list on storage', error) }

  }

  async function createNewList() {

    const newList = { id: null, name:"Minha nova lista 3", itens:[] }

    storage.set('userList', JSON.stringify([newList, ...list]))

    setList([newList, ...list])

    setSelectedList(newList)

    setSelectedListScreenOpen(true)

  }

  useEffect(()=>{

    if(open) getAllList()

  },[open])

  return (
    <>
      <ScrollView>

        <View style={tw`gap-3 p-4 ${open ? 'flex' : 'hidden'} justify-start items-center w-full h-full`}>

          <View>
          <Text  style={tw`text-slate-500 text-[1.2rem] text-center font-bold `}>Lista de compras</Text>
          </View>

          {
            list.length > 0 ? list.map((element: any, index) =>{

              return (

                <React.Fragment key={index}>
                  <TouchableWithoutFeedback onPress={() => {setSelectedListScreenOpen(true), setSelectedList(element)}}>

                    <View style={tw`p-3 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white`}>

                      <ShoppingSvg height={35} width={35} fill={'#CBD5E1'}/>
              
                      <View style={tw`gap-2 flex`}>
              
                        <Text style={tw`text-slate-400 text-[.8rem] font-bold`}>{element.name}</Text>
              
                        <View style={tw`gap-2 flex flex-row`}>
              
                          <Text style={tw`px-2 py-1 bg-slate-200 text-slate-600 text-[.6rem] font-bold text-center rounded-full`}>{element?.itens.lenght || 0} itens</Text>
                          <Text style={tw`px-2 py-1 bg-slate-200 text-slate-600 text-[.6rem] font-bold text-center rounded-full`}>R${0.0}</Text>
              
                        </View>
              
                      </View>
              
                      <ShoppingSvg height={25} width={25} fill={'#CBD5E1'} marginLeft={"auto"}/>
            
                    </View>

                  </TouchableWithoutFeedback>
                </React.Fragment>
                
              )

            })

            : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>
                
                <View style={tw`p-10 opacity-60 rounded-full bg-white`}>
                  <ShoppingSvg height={150} width={150} fill={'#CBD5E1'}/>
                </View>

                <TouchableWithoutFeedback onPress={createNewList} style={tw`flex w-full`}>
                  <View style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white`} >

                    <PlusSvg height={35} width={35} fill={'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                    <Text  style={tw`text-slate-400 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
                  
                  </View>
                </TouchableWithoutFeedback>

              </View>

          }

        </View>
      </ScrollView>

      <TouchableWithoutFeedback onPress={createNewList}>
        <View style={tw`bottom-22 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`} >
          <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </View>
      </TouchableWithoutFeedback>

      <SelectedListScreen open={selectedListScreenOpen} onClose={()=> setSelectedListScreenOpen(false)} selectedList={selectedList} setSelectedList={setSelectedList}/>

    </>
  )
}

export default ListScreen

const styles = StyleSheet.create({})