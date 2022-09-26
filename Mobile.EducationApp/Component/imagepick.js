import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

import { Button, Image, View, Platform, Text, TouchableOpacity } from 'react-native';

export default function GalleryComponenet({ onSetImage }) {
	const [image, setImage] = useState(null);
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, Camera roll permissions are required to make this work!');
				}
			}
		})();
	}, []);
	const chooseImg = async () => {
		//Expo.........
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [16, 16],
			quality: 1,
			allowsEditing: true,
		});
		// console.log(result);
		if (!result.cancelled) {
			console.log(result);
			setImage(result.uri);
			if(onSetImage){
				onSetImage(result)
				
			}
		}

		

	};
	return (
		<View>
			<TouchableOpacity onPress={chooseImg} style={{ marginTop: 10, backgroundColor: 'gray', padding: 5, borderRadius: 10 }}	>
				<View>
					{!image && <><Icon name='camera' size={60} color={'#cccccc'} /></>}
					{image && <Image source={{ uri: image }} style={{ width: 280, height: 280, borderRadius: 10 }} />}
				</View>
			</TouchableOpacity>

		</View>
	);
}