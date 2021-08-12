import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { colors, measures } from '../constants/Constants'
import { AudioContext } from '../context/AudioProvider'
import { AntDesign } from '@expo/vector-icons'

const CreatePlaylist = ({ navigation }) => {
    const { createPlaylist, playlists } = useContext(AudioContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [borderColor, setBorderColor] = useState("grey")

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: colors.primary_bg },
            headerTitle: "Create a new playlist",
            headerTitleStyle: { color: '#fff' },
            headerBackImage: () => (
                <AntDesign 
                    name="arrowleft" 
                    size={24} 
                    color="#fff" 
                    onPress={() => navigation.goBack()}
                />
            ),
        })
    }, [navigation])

    const callCreatePlaylist = async () => {
        if(title.length === 0 || description.length === 0) {
            alert("Both title as well as description for the new playist are required.")
        } else {
            await createPlaylist(title, description).then(() => {
                navigation.goBack()
            }).then(() => {
                setTitle("")
                setDescription("")
            })
        }
    }

    return (
        <View style={s.container}>
                <Text style={s.ques}>Create new Playlist ?</Text>
            <KeyboardAvoidingView behavior="padding">
                <View style={s.formContainer}>
                    <TextInput
                        placeholder="New name"
                        value={title}
                        onChangeText={txt => setTitle(txt)}
                        style={[s.input, { borderColor: borderColor, borderWidth: 1 }]}
                        autoFocus
                    />
                    <TextInput
                        placeholder="Description..."
                        value={description}
                        onChangeText={txt => setDescription(txt)}
                        style={[s.input, { borderColor: borderColor, borderWidth: 1 }]}
                    />
                    <Button
                        title="Create"
                        type="outline"
                        containerStyle={{ width: measures.width - 150 }}
                        titleStyle={{ color: '#000' }}
                        onPress={callCreatePlaylist}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default CreatePlaylist

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },

    formContainer: {
        width: measures.width - 50,
        height: measures.height / 3,
        backgroundColor: 'grey',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    ques: {
        color: '#fff',
        marginBottom: 20,
        fontSize: 20,
    },

    input: { 
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        width: '90%', 
        height: '20%',
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 20,        
    },
})