import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../components/ScreenLayout'
import Tabs from '../../components/navigation/Tabs'
import tw from 'twrnc';
import ShoppingSvg from '../../components/svg/icons/ShoppingSvg';

const ListScreen = () => {

  // const [ listArray, setListArray ] = useState<any[]>([{name: "lista para academia", price: 15.85, itens: 7}])

  const listArray = [
    {name: "lista para academia", price: 15.85, itens: 7},
    {name: "lista para academia", price: 15.85, itens: 7},
  ]

  return (

    <View style={tw`gap-4 p-4 flex justify-start items-center w-full h-full`}>


      {
        listArray.length > 0 ? 
      
          listArray.map(({name, price, itens}, index) =>{

            return (

              <React.Fragment key={index}>
                <View style={tw`p-3 gap-4 justify-start items-center rounded-[1.2rem] flex flex-row w-full bg-white`}>

                  <ShoppingSvg height={35} width={35} fill={'#CBD5E1'}/>
          
                  <View style={tw`gap-2 flex`}>
          
                    <Text style={tw`text-slate-400 text-[.8rem] font-bold`}>{name}</Text>
          
                    <View style={tw`gap-2 flex flex-row`}>
          
                      <Text style={tw`px-2 py-1 bg-slate-200 text-slate-600 text-[.6rem] font-bold text-center rounded-full`}>{itens} itens</Text>
                      <Text style={tw`px-2 py-1 bg-slate-200 text-slate-600 text-[.6rem] font-bold text-center rounded-full`}>R${price}1</Text>
          
                    </View>
          
                  </View>
          
                  <ShoppingSvg height={25} width={25} fill={'#CBD5E1'} marginLeft={"auto"}/>
        
                </View>
              </React.Fragment>
              
            )

          })

        : <View style={tw`flex w-full h-full justify-center items-center`}>
            <Text style={tw`bg-white py-8 px-16 rounded-3xl text-slate-300 font-bold`}>Crie uma nova lista</Text>
          </View>

      }


    </View>

  )
}

export default ListScreen

const styles = StyleSheet.create({})