
import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { Storage, storageProvider } from './src/libs/storage';
import Layout from './src/components/Layout';
import Tabs from './src/components/navigation/Tabs';
import ListScreen from './src/screens/lists/ListScreen';

function App(): JSX.Element {

  const [ screen, setScreen ] = useState("homeScreen")

  return (

    <Layout>

      {/* <HomeScreen open={screen == 'homeScreen' ? true : false }/>
      <ListScreen open={screen == 'listScreen' ? true : false }/> */}
      {
        screen == 'homeScreen' ? <HomeScreen/> :
        screen == 'listScreen' ? <ListScreen/>
        : null


      }

      <Tabs screen={screen} setScreen={setScreen}/>

    </Layout>

  );

}





export default App;
