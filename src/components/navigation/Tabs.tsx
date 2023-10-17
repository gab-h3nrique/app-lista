import { Animated, NativeModules, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HouseSvg from '../svg/icons/HouseSvg';
import ListSvg from '../svg/icons/ListSvg';
import HeartSvg from '../svg/icons/HeartSvg';
import UserSvg from '../svg/icons/UserSvg';
import Button from '../buttons/Button';
import { useNavigation } from '../../context/NavigationProvider';
import { useTheme } from '../../context/ThemeProvider';
import tw from '../../libs/tailwind';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface Props {
  screen: string;
  setScreen: any;
}

const Tabs = () => {

  const { theme } = useTheme()

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

  const { navigate, screens} = useNavigation()

  function switchTo(screen: string) {

    if(!screen) return console.warn('no screen was selected in tabs');

    navigate.push(screen)

    ativatedButtonAnimate(screen)

  }

  function ativatedButtonAnimate(screen: string) {

    if(!screen) return;

    if(screen == 'HomeScreen') {

      Animated.timing(homeOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();


  
      Animated.timing(userOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }

    if(screen == 'ListScreen') {

      Animated.timing(homeOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  

  
      Animated.timing(userOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.spring(addScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();

    }


    if(screen == 'UserScreen') {

      Animated.timing(homeOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(homeScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
      Animated.timing(listOpacity, { toValue: 0.40, duration: 160, useNativeDriver: false}).start();
      Animated.spring(listScale, { toValue: 1, friction: 3, useNativeDriver: false }).start();
  
  
      Animated.timing(userOpacity, { toValue: 1, duration: 160, useNativeDriver: false}).start();
      Animated.spring(userScale, { toValue: 1.2, friction: 3, useNativeDriver: false }).start();
  

    }

    return;

  }

  useEffect(()=>{

    switchTo('HomeScreen')

  },[])

  useEffect(()=>{

  },[theme])

  return (

    <View style={tw`bottom-0 p-4 flex flex-row items-center justify-between gap-2 w-full bg-white dark:bg-black rounded-t-[35px] absolute`}>
      


      <View style={tw`gap-5 flex flex-row`}>

        {/* home button */}
        <Button onPress={()=> switchTo('HomeScreen')}>
          <Animated.View style={[tw``,{opacity: homeOpacity, transform:[{scale: homeScale}] }]}>
            <HouseSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </Button>
        {/* home button */}

        {/* list button */}
        <Button onPress={()=> switchTo('ListScreen')}>
          <Animated.View style={{opacity: listOpacity, transform:[{scale: listScale}] }}>
            <ListSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </Button>
        {/* list button */}

      </View>
      
      <View style={tw`gap-5 flex flex-row`}>
          
        {/* favorite button */}
        <Button onPress={()=>{}}>
          <Animated.View style={{opacity: favoriteOpacity, transform:[{scale: favoriteScale}] }}>
            <HeartSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </Button>
        {/* favorite button */}

        {/* user button */}
        <Button onPress={()=> switchTo('UserScreen')}>
          <Animated.View style={{opacity: userOpacity, transform:[{scale: userScale}] }}>
            <UserSvg height={30} fill={'#a78bfa'}/>
          </Animated.View>
        </Button>
         {/* user button */}

      </View>

    </View>

  )
}

export default Tabs