import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native'
import React, { memo } from 'react'
import tw from '../../libs/tailwind'
import { useTheme } from '../../context/ThemeProvider';
import Button from '../../components/buttons/Button';

const requestCameraPermission = async () => {

  // const message = {
  //   title: 'Cool Photo App Camera Permission',
  //   message:
  //     'Cool Photo App needs access to your camera ' +
  //     'so you can take awesome pictures.',
  //   buttonNeutral: 'Ask Me Later',
  //   buttonNegative: 'Cancel',
  //   buttonPositive: 'OK',
  // }

  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {title: 'aaaaaaaa', message: 'bbb', buttonPositive: 'dd', })

  console.log('permissions', granted)
  // try {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'Cool Photo App Camera Permission',
  //       message:
  //         'Cool Photo App needs access to your camera ' +
  //         'so you can take awesome pictures.',
  //       buttonNeutral: 'Ask Me Later',
  //       buttonNegative: 'Cancel',
  //       buttonPositive: 'OK',
  //     },
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     console.log('You can use the camera');
  //   } else {
  //     console.log('Camera permission denied');
  //   }
  // } catch (err) {
  //   console.warn(err);
  // }
};


const SelectListTopMap = () => {

  const { theme } = useTheme()


  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }




  return (

    <View style={tw`flex justify-center items-center w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <View style={tw`flex bg-white p-4 rounded-full`}>
        <Button onPress={requestCameraPermission}><Text>Abrir mapa</Text></Button>
      </View>

    </View>


  )

}

export default memo(SelectListTopMap)

