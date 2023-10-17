import { View, Text } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import HomeScreen from './HomeScreen'
import ListScreen from './lists/ListScreen'
import { useNavigation } from '../context/NavigationProvider'
import Tabs from '../components/navigation/Tabs'
import UserScreen from './user/UserScreen'

const Index = () => {

    const { navigate } = useNavigation()

    

    return (

        <Layout>

            { navigate.isOpen('HomeScreen') ? <HomeScreen/> : null }
            { navigate.isOpen('ListScreen') ? <ListScreen/> : null }
            { navigate.isOpen('UserScreen') ? <UserScreen/> : null }

            <Tabs/>

        </Layout>

    )
}

export default Index