import React, { useState, useContext } from 'react'
import { SpeedDial } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../constants/Constants'
import { AudioContext } from '../context/AudioProvider'


const HomeSpeedDial = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { playlists } = useContext(AudioContext)
    const { navigation } = props;
    const btnStyle = {
        backgroundColor: colors.primary_bg,
        borderRadius: 50,
    }

    return (
        <SpeedDial
            isOpen={isOpen}
            onOpen={() => setIsOpen(!isOpen)}
            onClose={() => setIsOpen(!isOpen)}
            buttonStyle={btnStyle}
            icon={() => <MaterialCommunityIcons name="playlist-music-outline" size={24} color="#fff" />}
            openIcon={() => <MaterialCommunityIcons name="playlist-star" size={28} color="#fff" />}
            style={{ zIndex: 999 }}
        >
            <SpeedDial.Action 
                icon={() => <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />}
                title="Settings"
                buttonStyle={btnStyle}
                titleStyle={{ backgroundColor: colors.primary_bg, color: '#fff' }}
                onPress={() => navigation.navigate("Settings")}
            />

            <SpeedDial.Action 
                icon={() => <MaterialCommunityIcons name="playlist-check" size={24} color="#fff" />}
                title="Playlist"
                buttonStyle={btnStyle}
                titleStyle={{ backgroundColor: colors.primary_bg, color: '#fff' }}
                onPress={() => navigation.navigate("Playlists")}
                disabled={playlists === null ? true : false}
                disabledStyle={{ backgroundColor: 'grey' }}
            />

            <SpeedDial.Action 
                icon={() => <MaterialCommunityIcons name="playlist-plus" size={24} color="#fff" />}
                title="Create Playlist"
                buttonStyle={btnStyle}
                titleStyle={{ backgroundColor: colors.primary_bg, color: '#fff' }}
                onPress={() => navigation.navigate("CreatePlaylist")}
                disabled={playlists === null ? true : false}
                disabledStyle={{ backgroundColor: 'grey' }}
            />
        </SpeedDial>
    )
}

export default HomeSpeedDial