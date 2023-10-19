import { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
// import tw from 'twrnc';


import { useAppColorScheme, useDeviceContext } from 'twrnc';
import Storage from '../providers/storage/storage';
import { useTheme } from '../context/ThemeProvider';
import tw from '../libs/tailwind';

interface Props {
    children: React.ReactNode
}

const Layout = (props :Props) => {

    const { theme, setAppTheme } = useTheme()

    function setTheme() {
  
      setAppTheme(Storage.storage.getItem('THEME'))
  
    }
  
    useEffect(()=>{
  
      setTheme()
      
    }, [])

    return (

        <SafeAreaView style={[tw`flex-1 w-full h-full`, styles.safeArea]}>
            <StatusBar translucent={true} backgroundColor={theme == 'dark' ? '#334155' : '#FFFFFF'} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
            <View style={tw`flex bg-slate-200 dark:bg-slate-800 w-full h-full relative`}>

                {props.children}

            </View>
        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    safeArea:{
        paddingTop: Platform.OS === 'android' ? 15 : 0
     }
})

export default Layout