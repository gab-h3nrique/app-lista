import { View, Text, TextInput, Image, NativeModules, FlatList } from 'react-native'
import React, { memo } from 'react'
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


const EditListScreen = () => {

  const { theme } = useTheme()
  const navigator = useNavigation()

  const { selectedList, saveSelectedList } = useList()

  function editSelectedList(list: List) {

    if(!selectedList) return console.warn('this list is null')

    const updatedList = Storage.List.update(list.id, list)

    if(!updatedList) return console.warn('error updating list')

    saveSelectedList(updatedList)

  }

  function openEditItemScreen(item: Item) {

    navigator.open('EditItemScreen', { selectedItem: item })

  }

  function editCheckItem(item: Item) {

    const editedItem = Storage.Item.update(item.id, item)

    if(!editedItem) return console.warn('error editing item')

    if(!selectedList) return console.warn('any list was selected')

    const updatedList = Storage.List.get(selectedList.id)

    if(!updatedList) return console.warn('error getting selectedlist') 

    saveSelectedList(updatedList)

  }

  console.log('------------------------------renderizando EditListScreen')

  return (
    
    <View style={tw`w-full h-full bg-slate-200 dark:bg-slate-800 relative z-0`}>

      <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

        <Button onPress={navigator.pop} style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
          <ChevronSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

        <TextInput onChangeText={(event)=> selectedList && editSelectedList({...selectedList, name: event})} value={selectedList?.name} style={tw`text-slate-400 dark:text-slate-300 text-center font-bold text-[1.2rem]`}/>

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

        {
          selectedList && selectedList.itens.length > 0 ? (

            selectedList.itens.map(( item, i) =>
              <React.Fragment key={i}>
                <ItemListComponent item={item} onPress={() => openEditItemScreen(item)} onPressCheck={() => editCheckItem({...item, checked: !item.checked})}/>
              </React.Fragment>
            )

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
        }

      </View>

      <View style={tw`gap-2 flex items-center bottom-6 right-3 absolute`}>

        <Button onPress={() => {}} style={tw`w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 dark:bg-slate-700`}>
          <PenSvg height={13} width={13} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'}/>
        </Button>

        <Button onPress={() => navigator.open('CategoryScreen')} style={tw`w-16 h-16 rounded-full flex justify-center items-center bg-violet-400`} >
          <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
        </Button>

      </View>


    </View>

  )
}

export default memo(EditListScreen)