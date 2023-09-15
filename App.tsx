
import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';



function App(): JSX.Element {


  return (
    <SafeAreaView style={tw`bg-slate-200 flex`}>
      <View style={tw`bg-slate-200`}>

      <HomeScreen/>

      </View>
    </SafeAreaView>
  );
}



export default App;
