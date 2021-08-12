import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native'
import { colors } from '../constants/Constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AudioContext } from '../context/AudioProvider'
import PlaylistCard from '../components/PlaylistCard';

const Playlists = ({ navigation }) => {            
    const { 
        playlists,
        DeleteAllPlaylists
    } = useContext(AudioContext)
    
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: colors.primary_bg },
            headerTitle: "Your Playlists",
            headerTitleStyle: { color: '#fff' },
            headerBackImage: () => (
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={24}
                    color="#fff"
                />
            ),
            headerRight: () => (<View style={{ paddingHorizontal: 20, }}>
                {playlists.length === 0 ?
                    (<MaterialCommunityIcons 
                        name="plus-box"
                        color="#fff" 
                        size={24}
                        onPress={() => navigation.navigate("CreatePlaylist")}
                    />) : (<MaterialCommunityIcons 
                        name="trash-can" 
                        color="#fff" 
                        size={24}
                        onPress={HandlePlaylistRemoval}
                    />)
                }
            </View>)
        })
    }, [navigation]);

    const HandlePlaylistRemoval = () => {
        Alert.alert(
            "Delete all playlists?",
            `You are attempting to delete all playlists. Are you sure to continue?`,
            [
                {
                    text: "Delete",
                    onPress: DeleteAllPlaylists
                },
                {
                    text: 'Cancel',        
                }
            ]
        )
    }

    return (
        <View style={s.container}>
            {playlists.length !== 0 ? (
            <FlatList
                scrollEnabled={true}
                data={playlists}
                renderItem={(playlist) => {
                    const pl = playlist.item                    
                    return <PlaylistCard {...{...pl, navigation}} />
                }}
            />) : (
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable style={{ color: 'blue' }} onPress={() => navigation.navigate("CreatePlaylist")}>
                        <Text style={{ color: 'grey' }}>No Playlists found. Press here to create playlits here...</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default Playlists

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center'
    },
})
