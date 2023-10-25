
import { ThemeProvider } from './src/context/ThemeProvider';
import { StorageDataProvider } from './src/context/StorageDataProvider';
import { UserProvider } from './src/context/UserProvider';
import Index from './src/screens/Index';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navigator, { NavigationContext, Stack, useNavigation } from './Navigator';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Layout from './src/components/Layout';

function App(): JSX.Element {
  
  return (
    
    // <ThemeProvider>
    //   <StorageDataProvider>
    //     <UserProvider>

            
    //       <Index/>


    //     </UserProvider>
    //   </StorageDataProvider>
    // </ThemeProvider>

    <ThemeProvider>
      <Layout>

        <Navigator>
          <Stack name="Screen1" component={Screen1} />
          <Stack name="Screen2" component={Screen2} />
          <Stack name="Screen3" component={Screen3} />
          <Stack name="Screen4" component={Screen4} />
        </Navigator>

      </Layout>
    </ThemeProvider>

  );

}


export default App;

const Screen1 = memo(() => {

  const navigator = useNavigation()

  console.log('--------------------Screen1')

  return (

    <View style={[styles.screen, { backgroundColor: 'blue' }]}>
      <Text>screen 1</Text>
      <Button title="abrir proxima tela" onPress={() => navigator.push('Screen2')} />
      <Button title="fechar" onPress={() => navigator.pop()} />
    </View>

  )
})

const Screen2 = memo(() => {
  
  const navigator = useNavigation()
  console.log('renderizando--------------------Screen2')
  
  return (
    <View style={[styles.screen, { backgroundColor: 'green' }]}>
      <Text>screen 2</Text>
      <Button title="abrir proxima tela" onPress={() => navigator.push('Screen3')} />
      <Button title="fechar" onPress={() => navigator.pop()} />
    </View>
)})

const Screen3 = memo((props) => {
  
  const navigator = useNavigation()
  console.log('renderizando--------------------Screen3', props)
  
  return (
    <View style={[styles.screen, { backgroundColor: 'yellow' }]}>
      <Text>screen 3</Text>
      <Button title="abrir proxima tela" onPress={() => navigator.push('Screen4', { item: 'a'})} />
      <Button title="fechar" onPress={() => navigator.pop()} />
    </View>
)})

const Screen4 = memo((props) =>{ 
  

  const navigator = useNavigation()

  console.log('renderizando--------------------Screen4', props)
  
  return (
    <View style={[styles.screen, { backgroundColor: 'red' }]}>
      <Text>screen 4</Text>
      <Button title="fechar" onPress={() => navigator.pop()} />
    </View>
)})

// export default Screen1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
