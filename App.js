import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeRouter from './src2/routers/HomeRouter'
import AudioProvider from './src2/context/AudioProvider';

export default function App() {
	return (
		<AudioProvider>
			<NavigationContainer>
				<HomeRouter />
			</NavigationContainer>
		</AudioProvider>
	);
}

// import { StatusBar } from 'expo-status-bar';
// import React, { createContext } from 'react';
// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import HomeRouter from './src/routers/HomeRouter'
// import { NavigationContainer } from '@react-navigation/native';
// import TestProvider from './abc/TestProvider'
// import Child from './abc/Child'

// First One with nothing
// export default function App() {
//   return (
// 		<NavigationContainer>
// 			<HomeRouter />
// 		</NavigationContainer>
// 	);
// }

// Testing context api
// export default function App() {
//   return (
// 		<View style={styles.container}>
// 			<TestProvider>
// 				<Child />
// 			</TestProvider>
// 		</View>
// 	);
// }
