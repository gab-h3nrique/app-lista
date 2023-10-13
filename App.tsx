
import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
// import { SelectedListProvider } from './src/context/NavigationProvider';
import { storage } from './src/libs/storage';
import Layout from './src/components/Layout';
import Tabs from './src/components/navigation/Tabs';
import ListScreen from './src/screens/lists/ListScreen';
import Stack, { NavigationProvider } from './src/context/NavigationProvider';
import { View } from 'react-native';
import { Text } from 'react-native-svg';



function App(): JSX.Element {


  storage.set('categories', JSON.stringify([
    {id: null, name:'Pão', image: "https://cdn-icons-png.flaticon.com/512/3014/3014538.png", itens: [
      {id: null, name: 'Pão Francês Tradicional 400g', quantity: 0, image: null},
      {id: null, name: 'Pão de Queijo Congelado', quantity: 0, image: "https://cdn-icons-png.flaticon.com/512/5411/5411390.png"},
    ]},
  ]))




  const [screen, setScreen] = useState<string>('homeScreen')

  return (

    <Layout>

      <NavigationProvider>
        <Stack name="A" component={<Text>a</Text>} />
        <Stack name="B" component={<Text>b</Text>} />
      </NavigationProvider>

      {/* <SelectedListProvider>

        <HomeScreen open={screen == 'homeScreen' ? true : false }/>
        <ListScreen open={screen == 'listScreen' ? true : false }/>

        <Tabs screen={screen} setScreen={setScreen}/>

      </SelectedListProvider> */}

    </Layout>

  );

}

// export const Teste = ({ name, component }:{ name:"string", component: React.FC}) => {
//   return <Text>a</Text>
// }

export default App;
