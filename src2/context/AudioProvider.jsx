import React, { useState, useEffect, createContext } from 'react'
import { Alert } from 'react-native'
import * as MeidaLibrary from 'expo-media-library'
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AudioContext = createContext()

const AudioProvider = (props) => {
    const [songs, setSongs] = useState(null)
    const [playbackObj, setPlaybackObj] = useState(null)
    const [soundObj, setSoundObj] = useState(null)
    const [currentLoadedSong, setCurrentLoadedSong] = useState(null)
    const [playlists, setPlaylists] = useState(null)

    const [currentlyPlaylingPlaylist, setCurrentlyPlaylingPlaylist] = useState(null)
    const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(false)
    const [currentSelectedPlaylistSongs, setCurrentSelectedPlaylistSongs] = useState(null)

    

    useEffect(() => {
        getPermission();
    }, [])

    const getPermission = async () => {
        const permission = await MeidaLibrary.getPermissionsAsync();
        if(permission.granted === true) {
            //get All songs
            getAllSongs()
        }

        if(permission.granted === false && permission.canAskAgain === true) {
            const { status, canAskAgain } = await MeidaLibrary.requestPermissionsAsync()

            if(status === 'granted') {
                // get all songs
                getAllSongs()
            }

            if(status === 'denied' && canAskAgain === true) {
                // ask again
                permissionAlert()
            }

            if(status === 'denied' && canAskAgain === false) {
                // error alert                
            }
        }
    }

    const getAllSongs = async () => {
        // id, filename, duration, uri, albumId
        const { totalCount } = await MeidaLibrary.getAssetsAsync({ mediaType: 'audio' })
        const { assets } = await MeidaLibrary.getAssetsAsync({ mediaType: 'audio', first: totalCount })
        setSongs(assets)
        const ls = JSON.parse(await AsyncStorage.getItem('playlists'))
        if(ls === null) {
            await AsyncStorage.setItem('playlists', JSON.stringify([]))
        } else {
            setPlaylists(ls)
        }
    }

    const permissionAlert = () => {
        Alert.alert(
            "Permission Required",
            "Permission to read local audio is required",
            [
                {
                    text: "Grant Perission",
                    onPress: getPermission
                },
                {
                    text: "Cancel",
                    onPress: permissionAlert
                }
            ]
        )
    }

    const PlayPause = async (props) => {
        const {id, filename, uri, duration, albumId} = props
        if(playbackObj === null) {
            const playback = new Audio.Sound()
            await playback.loadAsync({ uri }, { shouldPlay: true }).then((status) => {
                setSoundObj(status)
                setPlaybackObj(playback)
                setCurrentLoadedSong({ id, filename, uri, duration, albumId })
            })
        } else {
            if(soundObj.isLoaded && soundObj.isPlaying && currentLoadedSong.id === id) {
                await playbackObj.pauseAsync().then(st => {
                    setSoundObj(st)
                })
            }
            
            if(soundObj.isLoaded && !soundObj.isPlaying && currentLoadedSong.id === id) {
                await playbackObj.playAsync().then(st => {
                    setSoundObj(st)
                })
            }
            
            if(soundObj.isLoaded && currentLoadedSong.id !== id) {
                await playbackObj.stopAsync()
                await playbackObj.unloadAsync()
                await playbackObj.loadAsync({ uri }, { shouldPlay: true }).then(s => {
                    setSoundObj(s)
                    setCurrentLoadedSong({ id, filename, uri, duration, albumId })
                })
            }
        }
    }

    const LoadPlaylistToPlay = (obj) => {
        setCurrentlyPlaylingPlaylist(obj)
        setCurrentSelectedPlaylistSongs(obj.songs)
        setIsPlayingPlaylist(true)
        PlayPause(obj.songs[0])
    }

    const PlayNext = (name) => {
        const index = currentSelectedPlaylistSongs.findIndex((song) => {
            return song.filename === name
        })
        if(index === currentSelectedPlaylistSongs.length - 1) {
            // End of the playlist
            stopEveryThing()
        } else {
            // play next
            PlayPause(currentSelectedPlaylistSongs[index+1])
        }
    }    
    
    const createPlaylist = async (title, description) => {
        const new_playlist = {
            id: new Date(),
            createdAt: new Date(),
            title,
            description,
            songsCount: 0,
            songs: []
        }
        let alreadyExists = false;

        const pl = JSON.parse(await AsyncStorage.getItem('playlists'))
        if(pl.length === 0) {
            pl.push(new_playlist)
            await AsyncStorage.setItem('playlists', JSON.stringify(pl)).then(async () => {
                setPlaylists(JSON.parse(await AsyncStorage.getItem('playlists')))
            })
        } else {
            pl.map((playlist) => {
                if(playlist.title.toLowerCase() === title.toLowerCase()) {
                    alreadyExists = true
                }
            })

            if(alreadyExists) {
                return
            } else {
                pl.push(new_playlist)
                await AsyncStorage.setItem('playlists', JSON.stringify(pl))
                setPlaylists(JSON.parse(await AsyncStorage.getItem('playlists')))
            }
        }
    }

    const DeleteAllPlaylists = async () => {
        stopEveryThing()
        await AsyncStorage.setItem("playlists", JSON.stringify([])).then(() => setPlaylists([]))
    }

    const addSongToPlaylist = async (playlist, song) => {
        playlists.forEach((pl) => {
            if(pl.title == playlist.title) {
                pl.songs.push({...song})
                pl.songsCount = pl.songsCount + 1
            }
        })
        await AsyncStorage.setItem('playlists', JSON.stringify(playlists))
        setPlaylists(JSON.parse(await AsyncStorage.getItem('playlists')))
    }

    const stopEveryThing = async () => {
        if(playbackObj === null) {
            setPlaybackObj(null)
            setSoundObj(null)
            setCurrentSelectedPlaylistSongs(null)
            setIsPlayingPlaylist(false)
            setCurrentlyPlaylingPlaylist(null)
            return
        }
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync().then(() => {
            setPlaybackObj(null)
            setSoundObj(null)
            setCurrentSelectedPlaylistSongs(null)
            setIsPlayingPlaylist(false)
            setCurrentlyPlaylingPlaylist(null)
        })
    }

    return (
        <AudioContext.Provider value={{
            songs,
            playbackObj,
            soundObj,
            currentLoadedSong,
            playbackObj,
            playlists,
            isPlayingPlaylist,            
            currentlyPlaylingPlaylist,
            PlayPause,
            stopEveryThing,
            createPlaylist,
            addSongToPlaylist,
            LoadPlaylistToPlay,
            PlayNext,
            DeleteAllPlaylists
        }}>
            {props.children}
        </AudioContext.Provider>
    )
}

export default AudioProvider