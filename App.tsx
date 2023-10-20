
import Layout from './src/components/Layout';
import { NavigationProvider } from './src/context/NavigationProvider';
import Index from './src/screens/Index';
import { ThemeProvider, useTheme } from './src/context/ThemeProvider';
import { NavigationProvider2, Stack, useNavigation2 } from './src/context/NavigationProvider2';
import { Text, View } from 'react-native';
import tw from './src/libs/tailwind';
import Button from './src/components/buttons/Button';
import { UserContext, UserProvider } from './src/context/UserProvider';
import { StorageDataProvider } from './src/context/StorageDataProvider';

function App(): JSX.Element {
  
  return (
    
    
    <ThemeProvider>
    <StorageDataProvider>
    <UserProvider>

        
      <NavigationProvider>


        <Layout>

          <Index/>

        </Layout>


      </NavigationProvider>
      

    </UserProvider>
    </StorageDataProvider>
    </ThemeProvider>



    // <View style={tw`flex w-full h-full bg-white`}>

    //   <NavigationProvider2>

    //     <Stack name='teste1' component={<Teste1/>}/>

    //     <Stack name='teste2' component={<Teste2/>}/>


    //   </NavigationProvider2>

    // </View>

  );

}


export default App;



// const Teste1 = (props?: any) => {

//   console.log('props', props)
//   const { navigate, screens } = useNavigation2()



//   return (
//     <View style={tw`flex flex-row`}>
//       <Button onPress={()=> navigate.open('teste2')} style={tw`flex w-1/2 bg-red-500`}>
//         <Text>open</Text>
//       </Button>
//       <Button onPress={()=> console.log('stacks: ', screens)} style={tw`flex w-1/2 bg-blue-500`}>
//         <Text>console</Text>
//       </Button>
//     </View>
    
//   )
// }

// const Teste2 = (props?: any) => {

//   console.log('props', props)


//   return (
//     <View style={tw`flex w-full bg-red-500`}>
//       <Text>Teste2</Text>
//     </View>
//   )
// }

