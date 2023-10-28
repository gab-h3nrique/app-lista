import { FlatList, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import Button from '../../components/buttons/Button';
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import ListItemComponent from './components/ListItemComponent';
import { List } from '../../providers/storage/functions/UserStorageFunctions';
import Storage from '../../providers/storage/storage';
import { User, useUser } from '../../context/UserProvider';
import { useNavigation } from '../../../Navigator';
import useDataStorage from '../../hooks/useDataStorage';
import useList from '../../hooks/useList';
import { ListContext } from '../../context/ListProvider';
// import { useNavigation } from '../../context/navigation/NavigationProvider';

const ListScreen = () => {
  
  const { theme } = useTheme()
  const navigator = useNavigation()

  const { list, saveList, saveSelectedList } = useList()
  // const { list, saveList } = useContext(ListContext)

  function createNewList() {

    const newList = Storage.List.create({name: `Nova lista`, checked: false})

    if(!newList) return console.error('list was not created')

    navigator.open('EditListScreen')
    
    saveList(Storage.List.getMany())

  }

  // function saveSelectedList(list: List) {

  //   // setSelectedList(()=> list)
  //   // setListState((e)=> e.map((e)=> e.id === list.id ? list : e))

  //   setUser((u: User)=>{
  //     return {...u, selectedList: list}
  //   })

  // }

  async function openPressedList(list: List) {

    saveSelectedList(list)

    navigator.open('EditListScreen')

  }

  console.log('------------------------------renderizando ListScreen')

  return (

    <View style={tw`flex justify-start items-center w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`p-2 mt-2`}>
        <Text  style={tw`text-violet-400 text-[1.5rem] text-center font-bold `}>Minhas Listas</Text>
      </View>

      {/* <FlatList data={listState} style={tw`p-4 gap-2 flex w-full h-full`}
      renderItem={({item}) => <ListItemComponent item={item} onPress={() => openEditList(item)} />}
      keyExtractor={(item, index) => String(index)}
      />

      {
        listState.length === 0 ?

          <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>
              
            <View style={tw`p-14 rounded-full bg-white dark:bg-slate-700`}>
              <ShoppingSvg height={200} width={200} fill={theme == 'dark' ? '#cbd5e1':'#FFFFFF'} />
            </View>

            <Button onPress={createNewList} style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`}>

              <PlusSvg height={35} width={35} fill={'#cbd5e1'} style={{ transform: [{ rotateY: '180deg' }] }}/>
              <Text  style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Crie uma lista</Text>
              
            </Button>

          </View>

        : null
      } */}

      <ScrollView>

        <View style={tw`mb-[3.5rem] p-4 gap-3 flex justify-start items-center w-full h-full`}>

          {
            list && list.length > 0 ? list.map((e: List, i) => 
              <React.Fragment key={i}>
                <ListItemComponent item={e} onPress={() => openPressedList(e)} /> 
              </React.Fragment>
            )

            : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>
                
                <View style={tw`p-14 rounded-full bg-slate-300 dark:bg-slate-700`}>
                  <ShoppingSvg height={200} width={200} fill={theme == 'dark' ? '#cbd5e1':'#FFFFFF'} />
                </View>

                <Button onPress={createNewList} style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`}>

                  <PlusSvg height={35} width={35} fill={theme == 'dark' ? '#cbd5e1':'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                  <Text  style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Crie uma lista</Text>
                  
                </Button>

              </View>

          }

        </View>

      </ScrollView>


      <Button onPress={createNewList} style={tw`bottom-22 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`}>
        <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
      </Button>

    </View>

  )
}

export default memo(ListScreen)
