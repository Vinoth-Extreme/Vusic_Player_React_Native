import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, ToastAndroid } from 'react-native'
import { ListItem, Avatar, BottomSheet, Button } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { HumanizeMillis, getThumbnail } from '../constants/Methods'
import { AudioContext } from '../context/AudioProvider'
import { colors, measures } from '../constants/Constants'
import LottieView from 'lottie-react-native'

const SongListItem = (props) => {
    const [isBottomSheetVisible, setIsBottomSheetVIsible] = useState(false)
    const {
        filename,
        duration,
        uri,
        id,
        albumId,
    } = props;
    const { 
        PlayPause ,
        playbackObj,
        soundObj,
        currentLoadedSong,
        playlists,
        addSongToPlaylist
    } = useContext(AudioContext)
    let iconRight = "play"
    let bg = 'rgba(255, 255, 255, 0.1)'
    let hasAvatar = false

    if(playbackObj !== null) {
        if(currentLoadedSong !== null) {
            if(currentLoadedSong.id === id && soundObj.isPlaying === true) {
                iconRight = "pause"
            }

            if(currentLoadedSong.id === id) {
                bg = "rgba(1, 239, 232, 0.5)"
                hasAvatar = true
            }
        }
    }

    return (
        <>
            <ListItem 
                bottomDivider 
                containerStyle={{ backgroundColor: bg, marginVertical: 5 }}
                onPress={() => PlayPause({id, filename, duration, uri, albumId})}
                onLongPress={() => setIsBottomSheetVIsible(!isBottomSheetVisible)}
                >
                {
                    hasAvatar && (<Avatar
                            title={getThumbnail(filename)}
                            rounded
                            size="small"
                            containerStyle={{
                                backgroundColor: colors.primary_bg
                            }}
                        >
                            <LottieView
                                source={require("../../assets/lotties/music-bar.json")}
                                autoPlay
                                speed={soundObj.isPlaying ? 1 : 0}
                                loop
                            />
                        </Avatar>)
                }
                <ListItem.Content>
                    <ListItem.Title style={{ color: "#fff" }} numberOfLines={1}>{filename}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: "#fff" }} numberOfLines={1}>{ HumanizeMillis(duration * 1000) }</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    Component={() => (
                        <MaterialCommunityIcons 
                            name={iconRight}
                            size={24} 
                            color="#fff"
                        />
                    )} 
                    />
            </ListItem>
            <BottomSheet
                isVisible={isBottomSheetVisible}
            >
                {playlists !== [] ? (
                    <FlatList                        
                        scrollEnabled={false}
                        data={playlists}
                        renderItem={(pl) => {
                            return (
                                <Pressable 
                                    style={ss.bottomSheetListItem}
                                    android_ripple={{ color: 'rgba(0, 0, 0, 0.5)', borderless: false, radius: 300 }}
                                    onPress={() => {
                                        addSongToPlaylist(pl.item, {...props}).then(() => {
                                            setIsBottomSheetVIsible(!isBottomSheetVisible)
                                            ToastAndroid.show(
                                                "Song Added.",
                                                ToastAndroid.LONG,
                                                ToastAndroid.BOTTOM
                                            )
                                        })
                                    }}
                                >
                                    <Text>{pl.item.title}</Text>
                                    <MaterialCommunityIcons name="plus" size={24} color="#000" />
                                </Pressable>
                            )
                        }}
                    />
                ) : (
                    <Text style={{ color: '#fff', fontSize: 30 }}>No Playlist is available.</Text>
                )}
                <Button 
                    title="cancel"
                    buttonStyle={{ backgroundColor: 'red' }}
                    onPress={() => setIsBottomSheetVIsible(!isBottomSheetVisible)}
                />
            </BottomSheet>
        </>
    )
}

export default SongListItem

const ss = StyleSheet.create({
    bottomSheetListItem: {
        width: measures.width,
        height: 50,
        backgroundColor: colors.primary_bg,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
})