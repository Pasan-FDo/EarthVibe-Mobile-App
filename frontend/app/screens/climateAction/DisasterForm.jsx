import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { firebase } from '../../../config';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importing DateTimePicker

const DisasterForm = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false); // State for showing the date picker
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            const selectedImages = result.assets;

            // Filter out already uploaded images
            const newImageUris = selectedImages
                .map(image => image.uri)
                .filter(uri => !images.includes(uri)); // Check if the image already exists

            if (newImageUris.length > 0) {
                setImages(prevImages => [...prevImages, ...newImageUris]);
                uploadImagesToFirebase(selectedImages);
            } else {
                Alert.alert('Warning', 'Selected images are already uploaded');
            }
        }
    };

    const uploadImagesToFirebase = async (selectedImages) => {
        setIsUploading(true);
        const storageRef = firebase.storage().ref();
        let uploadedUrls = [];

        for (let image of selectedImages) {
            const { uri } = image;
            const response = await fetch(uri);
            const blob = await response.blob();
            const fileName = uri.substring(uri.lastIndexOf('/') + 1);
            const imageRef = storageRef.child(`Disaster/${fileName || Date.now()}`);

            await imageRef.put(blob);
            const downloadUrl = await imageRef.getDownloadURL();
            uploadedUrls.push(downloadUrl);
        }

        setImages(prevImages => [...prevImages, ...uploadedUrls]);
        setIsUploading(false);
        Alert.alert('Success', 'Images uploaded successfully');
    };

    const handleSubmit = async () => {
        if (title && description && location && images.length > 0) {
            try {
                await firebase.firestore().collection('Disaster').add({
                    title,
                    description,
                    location,
                    date: date.toDateString(),
                    images,
                    emergencyContact,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                Alert.alert('Success', 'Investment submitted successfully');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'Please fill out all fields');
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row items-center px-4 pt-8 pb-3">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-2xl text-center ml-20 text-white font-bold">Disaster Form</Text>
                    </View>
                </View>
                <View className="bg-white flex-1">
                    <View className="mx-4 mt-5 flex-1">
                        <Text className="py-4 text-[#1D78C3]">Fill This Form To Post Disaster Information</Text>

                        {/* Image Picker */}
                        <View>
                            <Text className="text-gray-500 mb-2">Picture</Text>
                            <TouchableOpacity
                                className="bg-[#f0f0f0] rounded-lg pl-4 py-2 w-full border border-gray-300 mb-4 text-gray-800"
                                onPress={handleImagePicker}
                            >
                                <Text style={{ color: 'gray' }}>Select Images</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Show Selected Images */}
                        <ScrollView horizontal>
                            {images.map((imageUri, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: imageUri }}
                                    style={{ width: 100, height: 100, marginRight: 10 }}
                                />
                            ))}
                        </ScrollView>

                        {isUploading && <Text>Uploading images...</Text>}

                        {/* Main Title */}
                        <View>
                            <Text className="text-gray-500 mb-2">Main Title</Text>
                            <TextInput
                                className="bg-[#f0f0f0] rounded-lg pl-4 py-2 w-full border border-gray-300 mb-4 text-gray-800"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Title'
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Date and Location */}
                        <View className="flex-row">
                            <View className="flex-1 mr-2">
                                <Text className="text-gray-500 mb-2">Date</Text>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <TextInput
                                        className="bg-[#f0f0f0] rounded-lg pl-4 py-2 border border-gray-300 mb-4 text-gray-800"
                                        placeholderTextColor="#a1a1aa"
                                        value={date.toDateString()}
                                        editable={false} // Prevent direct editing
                                    />
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) setDate(selectedDate);
                                        }}
                                    />
                                )}
                            </View>

                            <View className="flex-1 ml-2">
                                <Text className="text-gray-500 mb-2">Location</Text>
                                <TextInput
                                    className="bg-[#f0f0f0] rounded-lg pl-4 py-2 border border-gray-300 mb-4 text-gray-800"
                                    placeholderTextColor="#a1a1aa"
                                    placeholder='Location'
                                    value={location}
                                    onChangeText={setLocation}
                                />
                            </View>
                        </View>

                        {/* Description */}
                        <View>
                            <Text className="text-gray-500 mb-2">Description</Text>
                            <TextInput
                                className="bg-[#f0f0f0] rounded-lg pl-4 py-2 w-full h-40 border border-gray-300 mb-4 text-gray-800"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Type Description'
                                multiline
                                numberOfLines={5}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        {/* Emergency Contact */}
                        <View>
                            <Text className="text-gray-500 mb-2">Emergency Contact Numbers</Text>
                            <TextInput
                                className="bg-[#f0f0f0] rounded-lg pl-4 py-2 w-full border border-gray-300 mb-4 text-gray-800"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Emergency Contacts'
                                value={emergencyContact}
                                onChangeText={setEmergencyContact}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-white flex-row justify-between">
                <TouchableOpacity className="flex-1 mr-2" onPress={() => navigation.goBack()}>
                    <View className="bg-red-500 rounded-lg p-3">
                        <Text className="text-center text-white">Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 ml-2" onPress={handleSubmit}>
                    <View className="bg-[#1D78C3] rounded-lg p-3">
                        <Text className="text-center text-white">Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DisasterForm;
