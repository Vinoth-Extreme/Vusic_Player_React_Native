import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors, measures } from '../constants/Constants'

const Settings = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
            },
            headerTitleStyle: {
                color: '#fff'
            },
            headerTitle: 'Settings',
            headerBackImage: () => (<MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary_bg} />),
        })
    }, [navigation])

    return (
        <ScrollView contentContainerStyle={ss.container} scrollEnabled>

            <View style={ss.settingContainer}>
                <Text style={ss.settingLabel} numberOfLines={1}>Instructions and Procedures: {'\n'}</Text>
                <Text style={ss.helper} numberOfLines={1}>Please Read the instructions below.</Text>

                <View style={ss.instructionsContainer}>

                    <View style={ss.instruction}>                        
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            You'll be asked to grant storage permission to read your local audio. If you don't grant, App can't read your audio files.
                        </Text>
                    </View>
                    
                    <View style={ss.instruction}>                        
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            So, There may be Some issues. If you Given like Don't as again, Then Permission will not be asked again.
                        </Text>
                    </View>
                    <View style={ss.instruction}>                        

                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            In this case, you need to enable "Storage Permission" from "mobile settings/apps/vusic/permissions/" only.
                            After giving permission, Restart the app.
                        </Text>
                    </View>

                </View>
            </View>

            <View style={ss.myLogo}>
                <Text style={ss.myLogoTxt}>From {'\n'} Vinoth V</Text>
            </View>

            <View style={ss.settingContainer}>
                <Text style={ss.settingLabel} numberOfLines={1}>Instructions and Procedures: {'\n'}</Text>
                <Text style={ss.helper} numberOfLines={1}>Please Read the instructions below.</Text>

                <View style={ss.instructionsContainer}>

                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="#fff" />
                        <Text style={ss.instructionText}>First, You can click any song item to play.</Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="#fff" />
                        <Text style={ss.instructionText}>Click the same while playing to pause and vice versa.</Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="#fff" />
                        <Text style={ss.instructionText}>You can create a playlist by clicking the "create playlist" icon at right bottom button</Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="#fff" />
                        <Text style={ss.instructionText}>After creating playlist, come back to home page and press and hold at any song to add to a playlist</Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="#fff" />
                        <Text style={ss.instructionText}>To play a playlist, Goto playlists screen, and click the playlist you want and click the play icon at the top right.</Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            If you want to stop a playlist, Please don't click at any other song while a playlist is being played. 
                            Instead, Click the stop button at the top right of playlist datils screen.
                        </Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            You can't delete any specific playlist. If you want, then delete all playlists and then start creating new playlists.
                        </Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            There are still some componetnts which are slow to update their states. So, If you feel like lagging, Not a problem. Just give it a few seconds.
                        </Text>
                    </View>
                    
                    <View style={ss.instruction}>
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            Just close and reopen the app, if you feel anything problem.
                        </Text>
                    </View>
                    
                    <View style={ss.instruction}>                        
                        <MaterialCommunityIcons name="star" size={20} color="gold" />
                        <Text style={ss.instructionText}>
                            Please, leave a comment to vvinothtvijay@gmail.com.
                        </Text>
                    </View>

                </View>
            </View>
                    
        </ScrollView>
    )
}

export default Settings

const ss = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        paddingVertical: 10,
    },

    settingContainer: {
        width: measures.width - 100,
        minHeight: measures.height / 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 10,
        marginVertical: 20,
    },

    settingLabel: {
        color: '#fff',
        fontSize: 20,
    },

    helper: {
        color: 'rgba(255, 255, 255, 0.5)'
    },

    instructionsContainer: {
        marginTop: 10,
    },

    instruction: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
        width: '90%'
    },

    instructionText: {
        marginLeft: 20,
        color: '#fff',
    },

    myLogo: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        borderTopColor: 'grey',
        borderTopWidth: 0.5,
        width: '50%',
    },

    myLogoTxt: {
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        fontSize: 25,
    }
})