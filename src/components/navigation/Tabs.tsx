import { Animated, NativeModules, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc';
import SvgComponent from '../svg/SvgComponent';
import HouseSvg from '../svg/icons/HouseSvg';
import ListSvg from '../svg/icons/ListSvg';
import HeartSvg from '../svg/icons/HeartSvg';
import UserSvg from '../svg/icons/UserSvg';
import PlusSvg from '../svg/icons/PlusSvg';
import { storage } from '../../libs/storage';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  screen: string;
  setScreen: any;
}

const Tabs = ({screen, setScreen}: Props) => {

  // const [ screen, setScreen ] = useState(props.screen || '')  // Initial screen

  // const [ background, setBackground ] = useState<string>("bg-violet-400")
  const [ addScale ] = useState(new Animated.Value(0.95))  // Initial value for scale: 0
  

  const homeOpacity = useRef(new Animated.Value(0.40)).current;
  const homeScale = useRef(new Animated.Value(1)).current;

  const listOpacity = useRef(new Animated.Value(0.40)).current;
  const listScale = useRef(new Animated.Value(1)).current;

  const favoriteOpacity = useRef(new Animated.Value(0.40)).current;
  const favoriteScale = useRef(new Animated.Value(1)).current;

  const userOpacity = useRef(new Animated.Value(0.40)).current;
  const userScale = useRef(new Animated.Value(1)).current;



  function pushToHome() {

    ativatedButtonAnimate('homeScreen')
    setScreen('homeScreen')

  }

  function pushToList() {

    ativatedButtonAnimate('listScreen')
    setScreen('listScreen')

  }

  const pushToAdd = () => {

    ativatedButtonAnimate('addScreen')
    storage.clearAll()

  }

  function pushToFavorite() {

    ativatedButtonAnimate('favoriteScreen')
    setScreen('')

  }

  function pushToUser() {

    ativatedButtonAnimate('userScreen')
    setScreen('')

  }

  function ativatedButtonAnimate(screen: string) {

    if(!screen) return;

    if(screen == 'homeScreen') {

      Animated.timing(homeOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(favoriteOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(userOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }

    if(screen == 'listScreen') {

      Animated.timing(homeOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(favoriteOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(userOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }

    if(screen == 'addScreen') {

      Animated.spring(addScale, { toValue: 1.1, friction: 3, useNativeDriver: false }).start();

      Animated.timing(listOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(favoriteOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(userOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }

    if(screen == 'favoriteScreen') {

      Animated.timing(homeOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(favoriteOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(favoriteScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(userOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }

    if(screen == 'userScreen') {

      Animated.timing(homeOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(favoriteOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(favoriteScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(userOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  
      Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }

    return;

  }



  useEffect(()=>{

    ativatedButtonAnimate(screen)

  },[])

  return (

    <View style={tw`bottom-0 p-4 flex flex-row items-center justify-between gap-2 w-full bg-white rounded-t-[35px] absolute`}>
      


      <View style={tw`gap-5 flex flex-row`}>

        {/* home button */}
        <TouchableWithoutFeedback onPress={pushToHome}>
          <Animated.View style={[tw``,{opacity: homeOpacity, transform:[{scale: homeScale}] }]}>
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
      {/* <TouchableWithoutFeedback onPress={pushToAdd}>

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


      </TouchableWithoutFeedback> */}
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