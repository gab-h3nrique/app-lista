import { Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import tw from 'twrnc';

interface Props {
    children: React.ReactNode
}

const Layout = (props :Props) => {

    return (

        <SafeAreaView style={[tw`bg-slate-200 flex-1 w-full h-full`, styles.safeArea]}>
            <StatusBar translucent={true} backgroundColor={'#a78bfa'} />
            <View style={tw`bg-slate-200 flex  w-full h-full relative`}>

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