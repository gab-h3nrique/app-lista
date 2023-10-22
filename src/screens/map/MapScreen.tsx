import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import tw from '../../libs/tailwind'

import MapView, {Marker, enableLatestRenderer} from 'react-native-maps';
import { useTheme } from '../../context/ThemeProvider';


const MapScreen = () => {

  const { theme } = useTheme()


  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }




  return (

    <View style={tw`flex w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`flex w-full h-1/2`}>
        <MapView provider={'google'} style={styles.map} initialRegion={initialRegion}>
          <Marker coordinate={initialRegion} title='aa' description='bbb' image={{uri: 'https://cdn-icons-png.flaticon.com/512/3306/3306079.png'}}/>
        </MapView>
      </View>

    </View>

  )

}

export default MapScreen

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