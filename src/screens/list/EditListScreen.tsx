import { View, Text, TextInput, Image, NativeModules, FlatList } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import PlusSvg from '../../components/svg/icons/PlusSvg';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import Button from '../../components/buttons/Button';
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import ItemListComponent from './ItemListComponent';
import PenSvg from '../../components/svg/icons/PenSvg';
import { Item, List } from '../../providers/storage/functions/UserStorageFunctions';
import Storage from '../../providers/storage/storage';
import { useNavigation } from '../../../Navigator';
import useList from '../../hooks/useList';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {

  list: List[],
  selectedList: List,
  saveList: (list: List[]) => void,

}




const EditListScreen = ({ list, selectedList, saveList}: Props) => {

  const { theme } = useTheme()
  const navigator = useNavigation()

  const [name, setName] = useState<string>(selectedList.name)
  const [itens, setItens] = useState<Item[]>(selectedList.itens)

  const changeName = (name: string) => {

    setName(()=>name)

    editSelectedList({...selectedList, name: name})
    
  }

  function editSelectedList(newList: List) {

    if(!selectedList) return console.warn('this list is null')

    const updatedList = Storage.List.update(selectedList.id, newList)
    
    if(!updatedList) return console.warn('error updating list')

    saveList(Storage.List.getMany())

  }

  function openEditItemScreen(item: Item) {

    navigator.open('EditItemScreen', { selectedItem: item })

  }

  function editCheckItem(item: Item) {

    const editedItem = Storage.Item.update(item.id, item)

    if(!selectedList) return console.warn('any list was selected')

    if(!editedItem) return console.warn('error editing item')

    const updatedList = Storage.List.get(selectedList.id)


    if(updatedList) setItens(updatedList.itens)

    // saveList(Storage.List.getMany())


    

  //   const editedItem = Storage.Item.update(item.id, item)

  //   if(!editedItem) return console.warn('error editing item')

  //   if(!selectedList) return console.warn('any list was selected')

  //   const updatedList = Storage.List.get(selectedList.id)

  //   if(!updatedList) return console.warn('error getting selectedlist') 

  //   saveSelectedList(updatedList)

  }

  function addNewItem() {

    navigator.open('CategoryScreen', { selectedList, saveList })

  }

  useEffect(() => {
  
    console.log('daleeee')

  }, [selectedList, list])
  

  console.log('------------------------------renderizando EditListScreen')

  return (
    
    <View style={tw`w-full h-full bg-slate-200 dark:bg-slate-800 relative z-0`}>

      <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

        <Button onPress={navigator.pop} style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <TextInput onChangeText={changeName} value={name} style={tw`text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/>
        {/* <TextInput onChangeText={(event)=> list && editSelectedList({...list, name: event})} value={list.name} style={tw`text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/> */}

      </View>

      <View style={tw`px-4 gap-3 flex justify-start items-center`}>

        {/* { selectedList && selectedList.itens.length > 0 ? (

            <FlatList data={selectedList.itens} style={tw`gap-2 flex-1 w-full h-full`}
              renderItem={({item}) => <ItemListComponent item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editCheckItem({...item, checked: !item.checked})}/>}
              keyExtractor={(item, index) => String(index)}
            />

          ) : (

            <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>

              <View style={tw`p-10 rounded-[2rem] bg-white dark:bg-slate-700`}>
                <Image height={130} width={130} source={require('../../assets/images/foods.png')} />
              </View>

              <Button onPress={() => navigator.open('CategoryScreen')} style={tw`p-4 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`} >
                <PlusSvg height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
              </Button>

            </View>

          )
        } */}

        {/* {
          selectedList && selectedList.itens.length > 0 ? (

            selectedList.itens.map(( item: Item, i: number) =>
              <React.Fragment key={i}>
                <ItemListComponent item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editCheckItem({...item, checked: !item.checked})}/>
              </React.Fragment>
            )

          ) : (

            <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>

              <View style={tw`p-10 rounded-[2rem] bg-white dark:bg-slate-700`}>
                <Image height={130} width={130} source={require('../../assets/images/foods.png')} />
              </View>

              <Button onPress={addNewItem} style={tw`p-4 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white dark:bg-slate-700`} >
                <PlusSvg height={28} width={28} fill={theme == 'dark' ? '#CBD5E1':'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
                <Text style={tw`text-slate-400 dark:text-slate-300 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
              </Button>

            </View>
            
          )
        } */}

        {
          itens.map(( item: Item, i: number) =>
            <React.Fragment key={i}>
              <ItemListComponent item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editCheckItem({...item, checked: !item.checked})}/>
            </React.Fragment>
          )
        }

      </View>

      <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

        <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
          <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
        </Button>

        <Button onPress={addNewItem} style={tw`w-16 h-16 rounded-full flex justify-center items-center bg-violet-400`} >
          <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

      </View>


    </View>

  )
}

export default memo(EditListScreen)