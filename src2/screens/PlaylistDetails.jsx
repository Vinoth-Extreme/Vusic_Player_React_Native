import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, ToastAndroid } from 'react-native'
import { measures } from '../constants/Constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SongListItem from '../components/SongListItem'
import { AudioContext } from '../context/AudioProvider'

const PlaylistDetails = ({ route, navigation }) => {
    const { 
        LoadPlaylistToPlay, 
        currentlyPlaylingPlaylist,
        stopEveryThing,
        deletePlaylist
    } = useContext(AudioContext)
    const {id, title, songsCount, songs, createdAt, description} = route.params
    let icon = "play-circle"

    if(currentlyPlaylingPlaylist !== null) {
        if(currentlyPlaylingPlaylist.id === id) {
            icon = "stop-circle"
        }
    }    

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <ScrollView
                contentContainerStyle={s.container}
                scrollEnabled
            >
                <View style={s.headerContainer}>
                    <View style={s.headerLeftContainer}>
                        <View>
                            <Text style={s.playlistTitle}>{title}</Text>
                            <Text style={s.playlistDescription}>{description}</Text>
                        </View>
                        <Text style={s.songsCount}>{songsCount} Songs</Text>
                    </View>

                    <View style={s.headerRightContainer}>

                        {songs.length !== 0 && (
                            <MaterialCommunityIcons 
                                name={icon}
                                size={80} 
                                color="#fff" 
                                style={s.icon} 
                                onPress={icon === "stop-circle" ? () => stopEveryThing() : () => LoadPlaylistToPlay({...route.params})}
                            />
                        )}
                    </View>
                </View>

                <View style={s.bodyContainer}>
                    {songs.length !== 0 ? (
                        <FlatList
                            scrollEnabled={false}
                            data={songs}
                            renderItem={(song) => (
                                <SongListItem {...song.item} />
                            )}
                        />
                    ) : (
                        <View style={{ flex: 1, alignItems: 'center'}}>
                            <Text style={{ color: '#fff'}}>No songs are added to this playlist. Add songs from home screen.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>            
        </View>
    )
}

export default PlaylistDetails

const s = StyleSheet.create({
    container: {        
        position: 'relative',
    },

    headerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: measures.width,
        height: measures.height / 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    headerLeftContainer: {
        justifyContent: 'space-around',
        height: '100%'
    },

    headerRightContainer: {
        position: 'relative',
        height: '100%',
        width: 80,
        alignItems: 'center'
    },

    playlistTitle: {
        color: '#fff',
        fontSize: 30,
    },

    playlistDescription: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 17,
    },

    songsCount: {
        color: '#fff'
    },

    icon: {
        position: 'absolute',
        bottom: 0
    }
})