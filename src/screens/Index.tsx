import { View, Text } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import ListScreen from './lists/ListScreen'
import Tabs from '../components/navigation/Tabs'
import { Navigation } from '../context/navigation/NavigationProvider'
import UserScreen from './user/UserScreen'
import MapScreen from './map/MapScreen'
import EditListScreen from './list/EditListScreen'
import CategoryScreen from './list/category/CategoryScreen'
import ItensScreen from './list/itens/ItensScreen'
import QuantityScreen from './list/quantity/QuantityScreen'
import HomeScreen from './home/HomeScreen'

const Index = () => {

    return (

        <Layout>

            <Navigation.Context tab={Tabs}>

                <Navigation.Stack key={0} name='HomeScreen' component={HomeScreen} animate={false}/>

                <Navigation.Stack key={1} name='ListScreen' component={ListScreen} animate={false}/>

                <Navigation.Stack key={2} name='UserScreen' component={UserScreen} animate={false}/>

                <Navigation.Stack key={3} name='MapScreen' component={MapScreen} animate={false}/>

                <Navigation.Stack key={4} name='EditListScreen' component={EditListScreen} options={{style: {zIndex: 1} }}/>

                <Navigation.Stack key={5} name='CategoryScreen' component={CategoryScreen} options={{style: {zIndex: 1} }}/>

                <Navigation.Stack key={6} name='ItensScreen' component={ItensScreen} options={{style: {zIndex: 1} }}/>

                <Navigation.Stack key={7} name='QuantityScreen' component={QuantityScreen} options={{style: {zIndex: 1} }}/>

            </Navigation.Context>

        </Layout>
        

    )
}

export default Index
