import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import Draggable from 'react-native-draggable'
import { colors, measures } from '../constants/Constants'
import { HumanizeMillis } from '../constants/Methods'
import LottieView from 'lottie-react-native'
import { AudioContext } from '../context/AudioProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CurrentSongWidget = () => {
    const [isDetailsVisible, setisDetailsVisible] = useState(true)
    const [progression, setProgression] = useState("")
    const { 
        soundObj, 
        currentLoadedSong,
        PlayPause,
        playbackObj,
        stopEveryThing,
        PlayNext,
        isPlayingPlaylist,
    } = useContext(AudioContext)

    const _onPlaybackStatusUpdate = async playbackObj => {
        // Object {
        //     "androidImplementation": "SimpleExoPlayer",
        //     "didJustFinish": false,
        //     "durationMillis": 321854,
        //     "isBuffering": false,
        //     "isLoaded": true,
        //     "isLooping": true,
        //     "isMuted": false,
        //     "isPlaying": true,
        //     "playableDurationMillis": 307408,
        //     "positionMillis": 244214,
        //     "progressUpdateIntervalMillis": 500,
        //     "rate": 1,
        //     "shouldCorrectPitch": false,
        //     "shouldPlay": true,
        //     "uri": "/storage/emulated/0/snaptube/download/SnapTube Audio/Arabu-Naade.mp3",
        //     "volume": 1,
        //     }
        if(playbackObj.didJustFinish) {
            if(isPlayingPlaylist === true) {
                PlayNext(currentLoadedSong.filename)
            } else {
                stopEveryThing()
            }
        } else {
            setProgression(HumanizeMillis(playbackObj.positionMillis))
        }
    }

    if(playbackObj !== null) {
        playbackObj.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
    }

    return (
        <Draggable x={20} y={measures.height - 150}>
            <View style={ss.contaienr}>
                <View style={ss.bubbleContainer}>
                    <Avatar
                        rounded
                        containerStyle={{
                            width: '100%',
                            height: '100%',
                        }}
                        onPress={() => setisDetailsVisible(!isDetailsVisible)}
                    >
                        <LottieView
                            source={require("../../assets/lotties/music-bar.json")}
                            autoPlay
                            loop
                            speed={soundObj.isPlaying ? 1 : 0}
                            
                        />                        
                    </Avatar>
                </View>

                {isDetailsVisible && (
                    <View style={ss.detailsContainer}>
                        <View style={ss.leftDetail}>
                            <Text numberOfLines={1}>{ currentLoadedSong && currentLoadedSong.filename }</Text>
                            <Text numberOfLines={1}>{ progression && progression }</Text>
                        </View>
                        <View style={ss.rightDetail}>
                            <MaterialCommunityIcons 
                                name="stop-circle"
                                size={24} 
                                color="#000" 
                                onPress={() => stopEveryThing()}
                                style={{ margin: 5 }}
                            />
                            <MaterialCommunityIcons 
                                name={soundObj.isPlaying ? "pause" : "play"}
                                size={24} 
                                color="#000" 
                                onPress={() => PlayPause(currentLoadedSong)}
                                style={{ margin: 5, }}
                            />
                        </View>
                    </View>
                )}
            </View>
        </Draggable>
    );
}

export default CurrentSongWidget;

const ss = StyleSheet.create({
    contaienr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    
    bubbleContainer: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: colors.primary_bg
    },

    detailsContainer: {
        width: 290,
        height: 70,
        backgroundColor: colors.primary_bg,
        marginLeft: 10,
        borderRadius: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    leftDetail: {
        width: '60%'
    },

    rightDetail: {
        flexDirection: 'row',
    },
})