
import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SelectedListScreen from './src/screens/list/SelectedListScreen';
import { SelectedListProvider } from './src/context/SelectedListProvider';
import { storage } from './src/libs/storage';



function App(): JSX.Element {

  storage.set('categories', JSON.stringify([
    {id: null, name:'Pão', image: "https://cdn-icons-png.flaticon.com/512/3014/3014538.png", itens: [
      {id: null, name: 'Pão Francês Tradicional 400g', quantity: 0, image: null},
      {id: null, name: 'Pão de Queijo Congelado', quantity: 0, image: "https://cdn-icons-png.flaticon.com/512/5411/5411390.png"},
    ]},
  ]))

  const teste = JSON.parse(storage.getString('categories') as any)

  console.log('storage:', teste[0].itens[0])























  return (

    <SelectedListProvider>

      <View style={tw`bg-slate-200`}>
        <SafeAreaView style={tw`bg-slate-200 flex relative`}>

            <HomeScreen/>

            <SelectedListScreen/>

        </SafeAreaView>
      </View>
      
    </SelectedListProvider>


  );

}



export default App;
