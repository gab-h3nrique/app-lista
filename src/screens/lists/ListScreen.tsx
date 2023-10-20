import { Animated, FlatList, NativeModules, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
import PlusSvg from '../../components/svg/icons/PlusSvg';
import { useNavigation } from '../../context/NavigationProvider';
import EditListScreen from '../list/EditListScreen';
import Button from '../../components/buttons/Button';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import AnimatedScreen from '../../components/view/AnimatedScreen';
import tw from '../../libs/tailwind';
import { useTheme } from '../../context/ThemeProvider';
import ListItemComponent from './components/ListItemComponent';
import { List } from '../../providers/storage/functions/UserStorageFunctions';
import Storage from '../../providers/storage/storage';
import { User, useUser } from '../../context/UserProvider';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const ListScreen = () => {
  
  const { navigate } = useNavigation()
  const { theme } = useTheme()
  const { user, setUser } = useUser()

  // ------------animation--------------//
  // const positionScreen = useRef(new Animated.Value(400)).current;
  // function changeScreen() {

  //   if(navigate.isOpen('ListScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  //   if(!navigate.isOpen('ListScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
  // }
  // ------------animation--------------//

  function createNewList() {

    const newList = Storage.List.create({name: `Nova lista`, checked: false})

    if(!newList) return console.warn('list was not created')

    setUser((u: User)=>{
      return {...u, lists: [newList, ...u.lists], selectedList: newList}
    })

    navigate.open('EditListScreen')

  }

  function saveSelectedList(list: List) {

    // setSelectedList(()=> list)
    // setListState((e)=> e.map((e)=> e.id === list.id ? list : e))

    setUser((u: User)=>{
      return {...u, selectedList: list}
    })

  }

  async function openEditList(list: List) {

    // setSelectedList(()=> list)

    setUser((u: User)=>{
      return {...u, selectedList: list}
    })

    navigate.open('EditListScreen')

  }

  // useEffect(()=>{
    
  //   changeScreen()

  // },[navigate.isOpen('ListScreen')])

  return (
    <>
    
      <AnimatedScreen open={navigate.isOpen('ListScreen')} style={tw`top-0 bg-slate-200 dark:bg-slate-800 w-full h-full absolute`}>
        <View style={tw`w-full h-full relative`}>


          <View style={tw`flex justify-start items-center w-full h-full`}>

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
                  user.lists.length > 0 ? user.lists.map((e: List, i) => 
                    <React.Fragment key={i}>
                      <ListItemComponent item={e} onPress={() => openEditList(e)} /> 
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


          </View>

          <Button onPress={createNewList} style={tw`bottom-22 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`}>
            <PlusSvg height={38} width={38} fill={theme == 'dark' ? '#334155':'#FFFFFF'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>


        </View>


      </AnimatedScreen>

      <EditListScreen/>

    </>

  )
}

export default ListScreen
