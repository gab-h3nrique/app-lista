
import { TouchableOpacity, View } from 'react-native';
import Layout from './src/components/Layout';
import { NavigationProvider } from './src/context/NavigationProvider';
import Index from './src/screens/Index';
import { useAppColorScheme, useDeviceContext } from 'twrnc';
import { ThemeProvider, useTheme } from './src/context/ThemeProvider';
import tw from './src/libs/tailwind';
import Storage from './src/providers/storage/storage';
import { useEffect } from 'react';

function App(): JSX.Element {

  // const { theme, setAppTheme } = useTheme()
  
  // // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw, Storage.storage.getItem('THEME'));

  // function setTheme() {

  //   setAppTheme(Storage.storage.getItem('THEME'))

  // }

  // useEffect(()=>{

  //   setTheme()
    

  // }, [])

  return (
    
    <NavigationProvider>
      <ThemeProvider>

        <Layout>

          <Index/>

        </Layout>

      </ThemeProvider>
    </NavigationProvider>

  );

}





export default App;
