import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import { firebase } from '../config'; // Import Firebase config
import AsyncStorage from '@react-native-async-storage/async-storage';

function InvestmentForm() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [pictures, setPictures] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImagePicker = async () => {
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access media library is required!');
            return;
        }
        useEffect(()=>{
            console.log(AsyncStorage.getItem('UserDetails'));
        },[])

        // Launch image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true, // Allows selecting multiple images
            quality: 1, // Highest quality
        });

        if (!result.canceled && result.assets) {
            uploadImagesToFirebase(result.assets);
        }
    };

    const uploadImagesToFirebase = async (images) => {
        setIsUploading(true);
        const storageRef = firebase.storage().ref();
        let uploadedUrls = [];

        for (let image of images) {
            const { uri, fileName } = image;
            const response = await fetch(uri);
            const blob = await response.blob();

            const imageRef = storageRef.child(`GreenInvestment/${fileName || Date.now()}`);
            await imageRef.put(blob);
            const downloadUrl = await imageRef.getDownloadURL();
            uploadedUrls.push(downloadUrl);
        }

        setPictures(uploadedUrls);
        setIsUploading(false);
        Alert.alert('Success', 'Images uploaded successfully');
    };

    const handleSubmit = async () => {
        if (title && description && date && pictures.length > 0) {
            try {
                console.log(pictures);
                await firebase.firestore().collection('GreenInvestment').add({
                    title,
                    description,
                    date: date.toDateString(),
                    pictures,
                    like:0,
                    disLike:0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                Alert.alert('Success', 'Investment submitted successfully');
                router.back();
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'Please fill out all fields');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={{ backgroundColor: '#1D78C3' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 32, paddingBottom: 12 }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, textAlign: 'center', marginLeft: 80, color: 'white', fontWeight: 'bold' }}>Investments Form</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ marginHorizontal: 16, marginTop: 20, flex: 1 }}>
                        <Text style={{ paddingVertical: 16, color: '#1D78C3' }}>Fill This Form To Post Invest</Text>

                        <View>
                            <Text style={{ color: 'gray', marginBottom: 8 }}>Main Title</Text>
                            <TextInput
                                style={{ backgroundColor: '#f0f0f0', borderRadius: 6, paddingLeft: 16, paddingTop: 8, paddingBottom: 8, width: '100%', borderColor: '#d1d1d1', borderWidth: 1, marginBottom: 16, color: '#333' }}
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Title'
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View>
                            <Text style={{ color: 'gray', marginBottom: 8 }}>Description</Text>
                            <TextInput
                                style={{ backgroundColor: '#f0f0f0', borderRadius: 6, paddingLeft: 16, paddingTop: 8, paddingBottom: 8, width: '100%', height: 150, borderColor: '#d1d1d1', borderWidth: 1, marginBottom: 16, color: '#333' }}
                                placeholderTextColor="#a1a1aa"
                                placeholder='Type Description'
                                multiline
                                numberOfLines={5}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <View>
                            <Text style={{ color: 'gray', marginBottom: 8 }}>Date</Text>
                            <TextInput
                                style={{ backgroundColor: '#f0f0f0', borderRadius: 6, paddingLeft: 16, paddingTop: 8, paddingBottom: 8, width: '100%', borderColor: '#d1d1d1', borderWidth: 1, marginBottom: 16, color: '#333' }}
                                placeholderTextColor="#a1a1aa"
                                placeholder='dd/mm/yyyy'
                                value={date.toDateString()}
                            />
                        </View>

                        <View>
                            <Text style={{ color: 'gray', marginBottom: 8 }}>Picture</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: '#f0f0f0', borderRadius: 6, paddingLeft: 16, paddingTop: 8, paddingBottom: 8, width: '100%', borderColor: '#d1d1d1', borderWidth: 1, marginBottom: 16 }}
                                onPress={handleImagePicker}
                            >
                                <Text style={{ color: 'gray' }}>Select Images</Text>
                            </TouchableOpacity>
                        </View>

                        {isUploading && <Text>Uploading images...</Text>}
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ flex: 1, marginRight: 8 }}>
                    <View style={{ backgroundColor: '#7d7d7d', justifyContent: 'center', alignItems: 'center', height: 48, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Cancel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1, marginLeft: 8 }} onPress={handleSubmit}>
                    <View style={{ backgroundColor: '#1D78C3', justifyContent: 'center', alignItems: 'center', height: 48, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default InvestmentForm;
