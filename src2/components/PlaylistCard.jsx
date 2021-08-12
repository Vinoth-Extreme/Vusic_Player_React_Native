import React, { useContext } from 'react'
import { StyleSheet, Text, Alert, Pressable, ToastAndroid } from 'react-native'
import { measures } from '../constants/Constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AudioContext } from '../context/AudioProvider'
import LottieView from 'lottie-react-native'

const PlaylistCard = (props) => {
    const { title, id, description, songsCount, createdAt, songs, navigation } = props;
    const { currentlyPlaylingPlaylist, soundObj } = useContext(AudioContext)

    let isPlayling = false

    if(currentlyPlaylingPlaylist !== null && soundObj !== null) {
        if(currentlyPlaylingPlaylist.id === id) {
            isPlayling = true
        }
    }    

    return (
        <Pressable 
            style={s.container} 
            android_ripple={{ color: '#000', borderless: false, radius: 500}}
            onPress={() => navigation.navigate("PlaylistDetails", {...{id, title, description, songsCount, songs, createdAt}})}
        >
            <Text numberOfLines={1} style={s.title}>{title}</Text>
            <Text numberOfLines={1} style={s.description}>{description}</Text>
            <Text style={s.songsCount}><Text style={s.count}>{songsCount}</Text> Songs</Text>
            
            {   isPlayling === false ? 
                (<MaterialCommunityIcons 
                    name="play-circle"
                    size={35}  
                    color="#fff"
                    style={s.icon}
                />) : (
                    <LottieView
                        source={require("../../assets/lotties/music-bar.json")}
                        autoPlay
                        loop
                        speed={soundObj.isPlaying === true ? 1 : 0}
                    />                  
                )
            }
        </Pressable>
    )
}

export default PlaylistCard

const s = StyleSheet.create({
    container: {
        width: measures.width - 50,
        height: measures.height / 3,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginTop: 5,
        borderRadius: 15, 
        padding: 20,
        position: 'relative'
    },

    title: {
        color: "#fff",
        fontSize: 30,
        letterSpacing: 2,
    },

    description: {
        fontSize: 16,
        color: 'darkgrey'
    },

    count: {
        color: '#fff',
        fontSize: 40,
    },

    songsCount: {
        color: "darkgrey",
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
        left: 20,
    },

    icon: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
})