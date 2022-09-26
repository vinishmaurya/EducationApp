import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform, Text, TouchableOpacity } from 'react-native';
export default function GalleryComponenet() {
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
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,
			allowsEditing: true,
		});
		console.log(result);
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	return (
		<View>
			<TouchableOpacity onPress={chooseImg} style={{ marginTop: 10, padding: 5, borderRadius: 10 }}	>
				<View style={{justifyContent:'center',alignSelf:'center'}}>
                    <Text style={{textAlign:'center',backgroundColor:'gray',padding:10,borderRadius:6}}>Choose Image</Text>
					  <Image source={{ uri: image }} style={{ width:100, height:100, borderRadius: 10,marginTop:10 }} />
				</View>
			</TouchableOpacity>

		</View>
	);
}