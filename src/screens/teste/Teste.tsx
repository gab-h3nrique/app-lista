import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import AnimatedScreen from '../../components/view/AnimatedScreen'
import { useNavigation } from '../../context/NavigationProvider'

export const ComponentA = () => {

  const { open, transition } = useNavigation()

  const [ teste, setTeste ] = useState(true)

  useEffect(()=>{

    // console.log('renderizando componente A')

    // return () => console.log('fechando componente A')

  },[])


  return (

    <AnimatedScreen open={teste} style={tw`z-1 bg-red-200 relative`}>
      <TouchableWithoutFeedback onPress={()=> {open('ComponentB'), setTeste(false)} }>
      <View>
        <Text style={tw`text-slate-400 text-[2rem] font-bold`}>A component: go B</Text>
      </View>
      </TouchableWithoutFeedback>
    </AnimatedScreen>

  )
}

export const ComponentB = () => {

  const navigate = useNavigation()

  const [ teste, setTeste ] = useState(true)

  useEffect(()=>{

    // console.log('renderizando componente A')

    // return () => console.log('fechando componente A')

  },[])


  return (

    <AnimatedScreen open={teste} style={tw`z-1 bg-red-200 relative`}>
      <TouchableWithoutFeedback onPress={()=> {navigate.open('ComponentB'), setTeste(false)} }>
      <View>
        <Text style={tw`text-slate-400 text-[2rem] font-bold`}>A component: go B</Text>
      </View>
      </TouchableWithoutFeedback>
    </AnimatedScreen>

  )
}

export const ComponentC = () => {

  const { open, transition } = useNavigation()

  const [ teste, setTeste ] = useState(true)

  useEffect(()=>{

    // console.log('renderizando componente A')

    // return () => console.log('fechando componente A')

  },[])


  return (

    <AnimatedScreen open={teste} style={tw`z-1 bg-red-200 relative`}>
      <TouchableWithoutFeedback onPress={()=> {open('ComponentB'), setTeste(false)} }>
      <View>
        <Text style={tw`text-slate-400 text-[2rem] font-bold`}>A component: go B</Text>
      </View>
      </TouchableWithoutFeedback>
    </AnimatedScreen>

  )
}

export const ComponentD = () => {

  const { open, transition } = useNavigation()

  const [ teste, setTeste ] = useState(true)

  useEffect(()=>{

    // console.log('renderizando componente A')

    // return () => console.log('fechando componente A')

  },[])


  return (

    <AnimatedScreen open={teste} style={tw`z-1 bg-red-200 relative`}>
      <TouchableWithoutFeedback onPress={()=> {open('ComponentB'), setTeste(false)} }>
      <View>
        <Text style={tw`text-slate-400 text-[2rem] font-bold`}>A component: go B</Text>
      </View>
      </TouchableWithoutFeedback>
    </AnimatedScreen>

  )
}

