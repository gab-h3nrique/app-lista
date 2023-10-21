
import Layout from './src/components/Layout';
import { NavigationProvider } from './src/context/NavigationProvider';
import Index from './src/screens/Index';
import { ThemeProvider, useTheme } from './src/context/ThemeProvider';
import { NavigationProvider2, StackContainer, useNavigation2 } from './src/context/NavigationProvider2';
import { Text, View } from 'react-native';
import tw from './src/libs/tailwind';
import Button from './src/components/buttons/Button';
import { UserContext, UserProvider } from './src/context/UserProvider';
import { StorageDataProvider } from './src/context/StorageDataProvider';
import { memo, useState } from 'react';
import Stack from './src/context/Stack';
import Tabs from './src/components/navigation/Tabs';

function App(): JSX.Element {
  
  return (
    
    
    // <ThemeProvider>
    // <StorageDataProvider>
    // <UserProvider>

        
    //   <NavigationProvider>


    //     <Index/>


    //   </NavigationProvider>
      

    // </UserProvider>
    // </StorageDataProvider>
    // </ThemeProvider>



    <View style={tw`w-full h-full justify-center items-center relative`}>

      <NavigationProvider2>

        <Stack key={0} name='HomeScreen' component={<Teste1/>}/>

        <Stack key={1} name='ListScreen' component={<Teste2/>}/>
        
        <Stack key={2} name='Teste3' component={<Teste3/>}/>

      </NavigationProvider2>

    </View>

  );

}


export default App;

const Teste1 = (props?: any) => {


  return (

    <View style={tw`flex w-full h-full gap-2 justify-center items-center bg-blue-500`}>
      
      <Text style={tw`text-center text-white text-[2rem]`}>HomeScreen</Text>

    </View>

  )
}


const Teste2 = (props?: any) => {

  const { navigate } = useNavigation2()


  return (

    <View style={tw`flex w-full h-full gap-2 justify-center items-center bg-red-500`}>
      
      <Text style={tw`text-center text-white text-[2rem]`}>ListScreen</Text>
      <Button onPress={()=> navigate.open('Teste3')}>
        <Text style={tw`text-white`}>abrir teste 3</Text>
      </Button>



    </View>

  )
}

const Teste3 = (props?: any) => {

  return (

    <View style={tw`flex w-full h-full gap-2 justify-center items-center bg-green-500`}>
      
      <Text style={tw`text-center text-white text-[2rem]`}>teste3</Text>

    </View>

  )
}




