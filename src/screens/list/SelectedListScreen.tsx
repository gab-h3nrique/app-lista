// import { View, Text, TouchableWithoutFeedback, TextInput, Image, BackHandler, NativeModules, Animated } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import tw from 'twrnc';
// import { List, storage } from '../../libs/storage';
// import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';
// import PlusSvg from '../../components/svg/icons/PlusSvg';
// import CategoryScreen from './category/CategoryScreen';
// import ChevronSvg from '../../components/svg/icons/ChevronSvg';
// import ItensScreen from './itens/ItensScreen';
// import QuantityScreen from './quantity/QuantityScreen';
// import CookieSvg from '../../components/svg/icons/CookieSvg';
// import CheckSolidSvg from '../../components/svg/icons/CheckSolidSvg';
// import CheckOutSvg from '../../components/svg/icons/CheckOutSvg';
// import EditItemScreen from './editItem/EditItemScreen';
// import { useNavigation } from '../../context/NavigationProvider';

// const { UIManager } = NativeModules;

// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// interface Props {
//   selectedList: any
//   saveList: any
// }

// const SelectedListScreen = ({ selectedList, saveList}: Props) => {

//   const { navigate, screens } = useNavigation()

//   // ------------animation--------------//
//   const positionScreen = useRef(new Animated.Value(400)).current;
//   function changeScreen() {

//     if(navigate.isOpen('SelectedListScreen')) Animated.timing(positionScreen, { toValue: 0, duration: 300, useNativeDriver: false }).start();
//     if(!navigate.isOpen('SelectedListScreen')) Animated.timing(positionScreen, { toValue: 400, duration: 300, useNativeDriver: false}).start();
  
//   }
//   // ------------animation--------------//
//   const [ selectedItem, setSelectedItem ] = useState<any>()

//   const [ categoryScreenOpen, setCategoryScreenOpen ] = useState(false)
//   const [ itensScreenOpen, setItensScreenOpen ] = useState(false)
//   const [ quantityScreenOpen, setQuantityScreenOpen ] = useState(false)

//   const [ category, setCategory ] = useState<any>();

//   function openEditItemScreen(item: any) {

//     setSelectedItem(item)

//   }

//   function selectCategory(value: any) {

//     if(!value) return;

//     setCategory(value)
//     navigate.open('ItensScreen')

//   }

//   function selectItem(value: any) {

//     if(!value) return;

//     setSelectedItem(value)
//     navigate.open('QuantityScreen')

//   }

//   async function selectQuantity(value: any) {

//     if(!value) return;

//     navigate.close('CategoryScreen')
//     navigate.close('ItensScreen')
//     navigate.close('QuantityScreen')
//     addItem(value)

//   }

//   function addItem(item:any){

//     const newList = List.update({...selectedList, itens: [item, ...selectedList.itens] })

//     console.log('newList:', newList)

//     saveList(newList)

//     // setSelectedList((li:any)=> { return {...li, itens: [item, ...li.itens]}})
    
//   }

//   function editItem(newItem: any, index?: number) {

//     console.log('adding newItem', newItem, index)

//   }

//   function savingEditedItem(newItem: any) {

//     // editItem(newItem, indexSelectedItem)
//     // setEditScreenOpen(false)
//     // setSelectedItem({})

//   }

//   function removingEditedItem() {

//     // console.log('removing item: ', newItem)

//     // const newList = itens.filter((object, i)=> i !== indexSelectedItem)

//     // setItens(newList)
//     // setIndexSelectedItem(-1)
//     // setEditScreenOpen(false)
//     // setSelectedItem({})

//   }

//   useEffect(()=>{
    
//     changeScreen()

//   },[screens, selectedList])

//   return (

//     <Animated.View style={[tw`top-0 z-1 bg-slate-200 w-full h-full absolute`, { transform: [{translateX: positionScreen}], }]}>
//       <View style={tw`w-full h-full relative`}>

//         <View style={tw`p-3 justify-center items-center flex flex-row w-full relative`}>

//           <View style={tw`left-2 top-5 w-9 h-8 rounded-[.6rem] bg-slate-400 flex items-center justify-center absolute`} >
//             <TouchableWithoutFeedback onPress={()=> navigate.close('SelectedListScreen')}>
//               <ChevronSvg height={20} width={20} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
//             </TouchableWithoutFeedback>
//           </View>

//           <TextInput
//           style={tw`text-slate-500 text-center font-bold text-[1.2rem]`}
//           onChangeText={(event)=> {}}
//           value={selectedList?.name}
//           placeholder="Minha nova lista"
//           />

//         </View>

//         <View style={tw`px-4 gap-3 flex justify-start items-center`}>
//           {
//             selectedList?.itens.length > 0 ? selectedList.itens.map(( item: any, index: number) =>{

//               return (

//                 <React.Fragment key={index}>
//                   <TouchableWithoutFeedback  onLongPress={()=> console.log('ordenação')} onPress={() => openEditItemScreen(item)}>

//                     <View style={tw`p-3 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white relative`}>



//                       <View style={tw`p-2 flex bg-violet-100 rounded-[.7rem]`}>
//                         {
//                           item.image ? <Image style={tw`w-8 h-8`} source={{ uri: item.image }} />
//                           : <CookieSvg height={32} width={32} fill={'#a78bfa'}/>
//                         }
//                       </View>

//                       <View style={tw`gap-2 flex`}>
          
//                         <Text style={tw`text-slate-400 text-[.8rem] font-bold`}>{item.name}</Text>

//                         <View style={tw`gap-2 flex flex-row`}>

//                           <Text style={tw`px-2 py-1 bg-slate-200 text-slate-600 text-[.6rem] font-bold text-center rounded-full`}>R${item.price || ' -'}</Text>

//                         </View>

//                       </View>

//                       <TouchableWithoutFeedback onPress={() => editItem({...item, checked: !item.checked}, index)}>
//                         {
//                           item.checked ? <CheckSolidSvg height={30} width={30} fill={'#a78bfa'} marginLeft={"auto"}/>
//                           : <CheckOutSvg height={30} width={30} fill={'#CBD5E1'} marginLeft={"auto"} />
//                         }
//                       </TouchableWithoutFeedback>

//                       <View style={tw`-top-2 -left-2 w-8 h-8 rounded-full flex justify-center items-center absolute z-40 ${item.checked ? 'bg-violet-400' : 'bg-slate-300'}`}>
//                         <Text style={tw`text-white text-[1rem] font-bold`}>{ (item.quantity && item.quantity > 99 ? '+99' : item.quantity) || 0}</Text>
//                       </View>
              
//                     </View>
                    
//                   </TouchableWithoutFeedback>
//                 </React.Fragment>
                
//               )

//             })

//             : <View style={tw`p-5 gap-8 justify-center items-center flex w-full`}>
//                 <View style={tw`p-10 opacity-60 rounded-full bg-white`}>
//                   <ShoppingSvg height={150} width={150} fill={'#CBD5E1'}/>
//                 </View>

//                 <TouchableWithoutFeedback onPress={() => navigate.open('CategoryScreen')} style={tw`flex w-full`}>
//                   <View style={tw`p-3 gap-4 rounded-[1.2rem] w-full flex flex-row justify-center items-center bg-white`} >

//                     <PlusSvg height={35} width={35} fill={'#94A3B8'} style={{ transform: [{ rotateY: '180deg' }] }}/>
//                     <Text  style={tw`text-slate-400 text-[1.15rem] text-center font-bold `}>Adicione um item</Text>
                  
//                   </View>
//                 </TouchableWithoutFeedback>

//               </View>

//           }
//         </View>

//         <View style={tw`bottom-6 right-3 w-16 h-16 rounded-full flex justify-center items-center bg-violet-400 absolute`} >
//           <TouchableWithoutFeedback onPress={() => {navigate.open('CategoryScreen'), navigate.open('itensScreen')}}>
//                 <PlusSvg height={38} width={38} fill={'white'} style={{ transform: [{ rotateY: '180deg' }] }}/>
//           </TouchableWithoutFeedback>
//         </View>

//         <CategoryScreen selectCategory={selectCategory}/>
//         <ItensScreen itens={category?.itens || []} selectItem={selectItem}/>
//         <QuantityScreen item={selectedItem || {name: '', image: '', quantity: 0}} selectQuantity={selectQuantity}/>
//         {/* <EditItemScreen open={editScreenOpen} onClose={()=> {setEditScreenOpen(false), selectItem(null)}} item={selectedItem || {}} onSave={savingEditedItem} onRemove={removingEditedItem}/> */}
      
//       </View>
//     </Animated.View>

//   )
// }

// export default SelectedListScreen