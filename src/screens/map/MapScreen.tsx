import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import tw from '../../libs/tailwind'

import MapView, {Marker, enableLatestRenderer, PROVIDER_GOOGLE} from 'react-native-maps';
import { useTheme } from '../../context/ThemeProvider';
import Button from '../../components/buttons/Button';
import ArrowSvg from '../../components/svg/icons/ArrowSvg';
import { useNavigation } from '../../../Navigator';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';


const MapScreen = () => {

  const { theme } = useTheme()

  const navigator = useNavigation()


  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }




  return (

    <View style={tw`flex w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <Button onPress={navigator.pop} style={tw`z-1 left-3 top-4 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
        <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
      </Button>

      <View style={tw`flex w-full h-full z-0`}>
        {/* <MapView provider={'google'} style={styles.map} initialRegion={initialRegion}>
          <Marker coordinate={initialRegion} title='aa' description='bbb' image={{uri: 'https://cdn-icons-png.flaticon.com/512/3306/3306079.png'}}/>
        </MapView> */}
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
        </MapView>
      </View>

      <View style={tw`gap-2 flex flex-col w-full h-full absolute top-[40%]`}>

        <View style={tw`px-3 flex flex-row w-full items-center justify-between`}>
          <Button onPress={navigator.pop} style={tw`px-4 h-8 flex flex-row gap-2 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center`} >
            <Text style={tw`text-slate-400 dark:text-slate-300 text-[.8rem] font-bold`}>Distância</Text>
            <ChevronSvg height={15} width={15} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} marginLeft={"auto"} style={{ transform: [{ rotate: '90deg' }] }}/>
          </Button>

          <Button onPress={navigator.pop} style={tw` w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center`} >
            <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>
        </View>

        <View style={tw`py-2 rounded-t-[30px] flex flex-col items-center h-full w-full bg-slate-200 dark:bg-slate-800`}>

          <Button onPress={navigator.pop} style={tw`w-18 h-[.33rem] rounded-full bg-slate-400 dark:bg-slate-600`}/>

        </View>

      </View>

    </View>

  )

}

export default memo(MapScreen)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });