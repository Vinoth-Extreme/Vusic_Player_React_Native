import React, { useContext } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import HomeSpeedDial from '../components/HomeSpeedDial'
import SongListItem from '../components/SongListItem'
import { colors } from '../constants/Constants'
import CurrentSongWidget from '../components/CurrentSongWidget'

const Home = ({ navigation }) => {
    const { songs, soundObj } = useContext(AudioContext)

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={ss.headerContainer}>
                <Text style={ss.logoText}>V</Text>
                <Text style={ss.logoText}>U</Text>
                <Text style={ss.logoText}>S</Text>
                <Text style={ss.logoText}>I</Text>
                <Text style={ss.logoText}>C</Text>
            </View>
            <FlatList
                data={songs}
                key={(item, index) => item.id}
                renderItem={(song) => {
                    const songProps = {
                        filename: song.item.filename,
                        duration: song.item.duration,
                        uri: song.item.uri,
                        id: song.item.id,
                        albumId: song.item.albumId,
                    }
                    return <SongListItem {...songProps} />
                }}
            />
            {soundObj && (
                <CurrentSongWidget />
            )}
            <HomeSpeedDial {...{navigation}} />            
        </View>
    )
}

export default Home

const ss = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },

    logoText: {
        color: colors.primary_bg,
        fontSize: 20,
        fontWeight: 'bold',        
    },    
})