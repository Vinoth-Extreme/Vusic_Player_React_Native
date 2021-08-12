import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import CreatePlaylist from '../screens/CreatePlaylist'
import Playlists from '../screens/Playlists'
import PlaylistDetails from '../screens/PlaylistDetails'
import Settings from '../screens/Settings'

const Stack = createStackNavigator()

const HomeRouter = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Stack.Screen
                component={Home}
                name="Home"
            />
            
            <Stack.Screen
                component={CreatePlaylist}
                name="CreatePlaylist"
            />
            
            <Stack.Screen
                component={Playlists}
                name="Playlists"
            />
            
            <Stack.Screen
                component={PlaylistDetails}
                name="PlaylistDetails"
            />

            <Stack.Screen
                component={Settings}
                name="Settings"
            />

        </Stack.Navigator>
    )
}

export default HomeRouter