import { Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import tw from 'twrnc';
import { NavigationProvider } from '../context/NavigationProvider';

interface Props {
    children: React.ReactNode
}

const Layout = (props :Props) => {

    return (

        <NavigationProvider>
            <SafeAreaView style={[tw`bg-slate-200 flex-1 w-full h-full`, styles.safeArea]}>
                <StatusBar translucent={true} backgroundColor={'#a78bfa'} />
                <View style={tw`bg-slate-200 flex  w-full h-full relative`}>

                    {/* <Text style={tw`text-slate-400 text-[2rem] font-bold`}>aaaaaaaa</Text> */}
                    {props.children}

                </View>
            </SafeAreaView>
        </NavigationProvider>

    )

}


const styles = StyleSheet.create({
    safeArea:{
        paddingTop: Platform.OS === 'android' ? 20 : 0
     }
})

export default Layout