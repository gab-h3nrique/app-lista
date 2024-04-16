import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, useWindowDimensions, FlatList } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import tw from '../../libs/tailwind'

import MapView, {Marker, enableLatestRenderer, PROVIDER_GOOGLE} from 'react-native-maps';
import { useTheme } from '../../context/ThemeProvider';
import Button from '../../components/buttons/Button';
import ArrowSvg from '../../components/svg/icons/ArrowSvg';
import { useNavigation } from '../../../Navigator';
import ChevronSvg from '../../components/svg/icons/ChevronSvg';
import MarketItem from './components/MarketItem';


const MapScreen = () => {

  const { theme } = useTheme()

  const navigator = useNavigation()

  
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  
  
  const sizeScreen = useRef(0)
  const [viewHeight, setViewHeight] = useState(40)
  // const initialHeight = useRef(0)

  const panResponder = useRef(
    PanResponder.create({

      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt, gestureState) => {

        const porcent = 100 - ((gestureState.y0 / sizeScreen.current) * 100)

        // initialHeight.current = porcent
        
      },

      
      onPanResponderMove: (evt, gestureState) => {

        const porcent = 100 - ((gestureState.moveY / sizeScreen.current) * 100)

        
        // disabled for now
        // setViewHeight((prev) => porcent + 10)
        
        
        // const diference = (100 - ((gestureState.moveY / sizeScreen.current) * 100)) - initialHeight.current
        // setViewHeight(initialHeight.current + diference)

      },
      onPanResponderRelease: () => {

        console.log('pan end')
 
      },

    }),
  ).current;

  const markets = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ]

  return (

    <View onLayout={({nativeEvent}) => sizeScreen.current = nativeEvent.layout.height } style={tw`flex w-full h-full bg-slate-200 dark:bg-slate-800 relative`}>

      <Button onPress={navigator.pop} style={tw`z-1 left-3 top-4 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center absolute`} >
        <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
      </Button>

      <View style={tw`flex w-full h-full z-0`}>

        <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
          <Marker coordinate={initialRegion} title='aa' description='bbb' image={{uri: 'https://cdn-icons-png.flaticon.com/512/3306/3306079.png'}}/>
        </MapView>
        
      </View>

      <Animated.View style={[tw`rounded-t-[30px] flex flex-col w-full bg-slate-200 dark:bg-slate-800 absolute bottom-0`, {height: `${viewHeight}%`} ]}>

        <View style={tw` flex flex-col items-center h-full w-full relative`}>

          <Button onPress={navigator.pop} style={tw`absolute -top-10 left-4 px-4 h-8 flex flex-row gap-2 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center`} >
            <Text style={tw`text-slate-400 dark:text-slate-300 text-[.8rem] font-bold`}>Distância</Text>
            <ChevronSvg height={15} width={15} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} marginLeft={"auto"} style={{ transform: [{ rotate: '90deg' }] }}/>
          </Button>

          <Button onPress={navigator.pop} style={tw`absolute -top-12 right-4 w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-700 flex items-center justify-center`} >
            <ArrowSvg height={20} width={20} fill={theme == 'dark' ? '#CBD5E1':'#ffffff'} style={{ transform: [{ rotateY: '180deg' }] }}/>
          </Button>

          <View style={tw`w-100 p-2`} {...panResponder.panHandlers}>
            <Button onPress={navigator.pop} style={tw`m-auto w-12 h-[.33rem] rounded-full bg-slate-400 dark:bg-slate-600`}/>
          </View>

          <Text style={tw`pb-2 text-slate-400 dark:text-slate-300 text-[.9rem] font-bold`}>Compare os preços</Text>


          <FlatList style={tw`flex w-full h-full `} 
          onScroll={()=> console.log('scrolling')}
          data={markets} 
          initialNumToRender={14} 
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => <MarketItem index={index} length={markets.length} onPress={() => console.log('pressed market')} />}
          />


        </View>

      </Animated.View>

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