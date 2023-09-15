import { Animated, NativeModules, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'twrnc';
import SvgComponent from '../svg/SvgComponent';
import HouseSvg from '../svg/icons/houseSvg';
import ListSvg from '../svg/icons/ListSvg';
import HeartSvg from '../svg/icons/HeartSvg';
import UserSvg from '../svg/icons/UserSvg';
import PlusSvg from '../svg/icons/PlusSvg';
import HomeScreen from '../../screens/HomeScreen';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const Tabs = ({screen}:{screen?: string}) => {

  // const [ background, setBackground ] = useState<string>("bg-violet-400")

  const homeOpacity = useRef(new Animated.Value(0.80)).current;
  const homeScale = useRef(new Animated.Value(1)).current;

  const listOpacity = useRef(new Animated.Value(0.80)).current;
  const listScale = useRef(new Animated.Value(1)).current;

  const favoriteOpacity = useRef(new Animated.Value(0.80)).current;
  const favoriteScale = useRef(new Animated.Value(1)).current;

  const userOpacity = useRef(new Animated.Value(0.80)).current;
  const userScale = useRef(new Animated.Value(1)).current;

  const [ addScale ] = useState(new Animated.Value(0.95))  // Initial value for scale: 0

  const addscreen = () => {

    Animated.spring(addScale, { toValue: 1.1, friction: 3, useNativeDriver: false }).start();


  }



  function pushToHome() {

    Animated.timing(homeOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
    Animated.spring(homeScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();

    Animated.timing(listOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(favoriteOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(userOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    console.log('homeScreen')

  }

  function pushToList() {

    Animated.timing(homeOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(listOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
    Animated.spring(listScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();

    Animated.timing(favoriteOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(userOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    console.log('homeScreen')

  }

  function pushToFavorite() {

    Animated.timing(homeOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(listOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(favoriteOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
    Animated.spring(favoriteScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();

    Animated.timing(userOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    console.log('homeScreen')

  }

  function pushToUser() {

    Animated.timing(homeOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(listOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(favoriteOpacity, { toValue: 0.80, duration: 160, useNativeDriver: false}).start();
    Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    Animated.timing(userOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
    Animated.spring(userScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();

    Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    console.log('homeScreen')

  }



  return (

    <View style={tw` p-4 flex flex-row items-center justify-between gap-2 w-full h-[8%] bg-white rounded-t-[35px]`}>
      


      <View style={tw`gap-5 flex flex-row`}>

        {/* home button */}
        <TouchableWithoutFeedback onPress={pushToHome}>
          <Animated.View style={{opacity: homeOpacity, transform:[{scale: homeScale}] }}>
            <HouseSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* home button */}

        {/* list button */}
        <TouchableWithoutFeedback onPress={pushToList}>
          <Animated.View style={{opacity: listOpacity, transform:[{scale: listScale}] }}>
            <ListSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* list button */}

      </View>

      {/* add button */}
      <TouchableWithoutFeedback onPress={addscreen}>

        <Animated.View style={{
          position: 'relative',
          height: 85,
          width: 85,
          borderRadius: 999999,
          bottom: 27,
          transform: [{scale: addScale}], 
          backgroundColor: '#a78bfa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
            <PlusSvg  height={49} fill={'white'}/>
        </Animated.View>


      </TouchableWithoutFeedback>
      {/* add button */}

      
      <View style={tw`gap-5 flex flex-row`}>
          
        {/* favorite button */}
        <TouchableWithoutFeedback onPress={pushToFavorite}>
          <Animated.View style={{opacity: favoriteOpacity, transform:[{scale: favoriteScale}] }}>
            <HeartSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* favorite button */}

        {/* user button */}
        <TouchableWithoutFeedback onPress={pushToUser}>
          <Animated.View style={{opacity: userOpacity, transform:[{scale: userScale}] }}>
            <UserSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </TouchableWithoutFeedback>
         {/* user button */}

      </View>

      

    </View>

  )
}

export default Tabs