import { View, Text } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import HomeScreen from './home/HomeScreen'
import ListScreen from './lists/ListScreen'
import { useNavigation } from '../context/NavigationProvider'
import Tabs from '../components/navigation/Tabs'
import UserScreen from './user/UserScreen'
import EditListScreen from './list/EditListScreen'
import CategoryScreen from './list/category/CategoryScreen'
import ItensScreen from './list/itens/ItensScreen'
import MapScreen from './map/MapScreen'

const Index = () => {

    const { navigate } = useNavigation()

    

    return (

        <Layout>

            { navigate.isOpen('HomeScreen') ? <HomeScreen/> : null }
            { navigate.isOpen('ListScreen') ? <ListScreen/> : null }
            { navigate.isOpen('UserScreen') ? <UserScreen/> : null }
            { navigate.isOpen('MapScreen') ? <MapScreen/> : null }

            <Tabs/>

            { navigate.isOpen('EditListScreen') ? <EditListScreen/> : null }
            {/* { navigate.isOpen('CategoryScreen') ? <CategoryScreen/> : null }
            { navigate.isOpen('ItensScreen') ? <ItensScreen/> : null } */}

        </Layout>

    )
}

export default Index