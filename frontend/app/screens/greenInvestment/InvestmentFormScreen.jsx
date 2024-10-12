import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Alert, 
    Modal, 
    Button, 
    Image,
    ActivityIndicator,
    Platform
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { firebase } from '../../../config'; // Import Firebase config
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';

const InvestmentFormScreen = ({ navigation }) => {
    // State Variables
    const [showDatePicker, setShowDatePicker] = useState(false); // Controls DatePicker visibility
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [pictures, setPictures] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [userDetails, setUserDetails] = useState(null); // To store user details from AsyncStorage
    const [showImagePicker, setShowImagePicker] = useState(false); // Optional: Control image picker modal if needed

    // Fetch user details from AsyncStorage on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await AsyncStorage.getItem('UserDetails');
                if (userDetails !== null) {
                    setUserDetails(JSON.parse(userDetails));
                    console.log('User Details:', JSON.parse(userDetails));
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    // Handle Image Picker
    const handleImagePicker = async () => {
        try {
            // Request media library permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access media library is required!');
                return;
            }

            // Launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true, // Allows selecting multiple images (only on supported platforms)
                quality: 1, // Highest quality
            });

            if (!result.canceled && result.assets) {
                console.log('Selected Images:', result.assets);
                uploadImagesToFirebase(result.assets);
            } else {
                console.log('Image selection canceled');
            }
        } catch (error) {
            console.error('Error picking images:', error);
            Alert.alert('Error', 'Something went wrong while picking images.');
        }
    };

    // Upload Images to Firebase Storage
    const uploadImagesToFirebase = async (images) => {
        setIsUploading(true);
        const storageRef = firebase.storage().ref();
        let uploadedUrls = [];

        try {
            for (let image of images) {
                const { uri, fileName } = image;
                const response = await fetch(uri);
                const blob = await response.blob();

                // Generate a unique filename if not provided
                const uniqueFileName = fileName || `image_${Date.now()}.jpg`;
                const imageRef = storageRef.child(`GreenInvestment/${uniqueFileName}`);

                // Upload the image
                await imageRef.put(blob);
                const downloadUrl = await imageRef.getDownloadURL();
                uploadedUrls.push(downloadUrl);
            }

            setPictures([...pictures, ...uploadedUrls]); // Append new URLs to existing ones
            Alert.alert('Success', 'Images uploaded successfully');
        } catch (error) {
            console.error('Error uploading images:', error);
            Alert.alert('Upload Error', 'There was an error uploading your images.');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle Date Change
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, keep the picker open
        setDate(currentDate);
    };

    // Handle Form Submission
    const handleSubmit = async () => {
        if (title.trim() && description.trim() && date && pictures.length > 0) {
            try {
                await firebase.firestore().collection('GreenInvestment').add({
                    title: title.trim(),
                    description: description.trim(),
                    date: date.toISOString(),
                    pictures,
                    like: 0,
                    disLike: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    user: userDetails ? userDetails.uid : 'unknown', 
                });
                Alert.alert('Success', 'Investment submitted successfully');
                navigation.navigate('InvestmentListScreen');
            } catch (error) {
                console.error('Error submitting investment:', error);
                Alert.alert('Submission Error', error.message);
            }
        } else {
            Alert.alert('Incomplete Form', 'Please fill out all fields and select at least one image.');
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Header title="Investments Form" image={require('../../assets/images/profile.png')} />

                <View className="bg-white flex-1">
                    <View className="mr-6 ml-6 mt-5 flex-1">
                        <Text className="py-4 text-[#1D78C3]">Fill This Form To Post Invest</Text>

                        {/* Main Title Input */}
                        <View>
                            <Text className="text-gray-500 mb-2">Main Title</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Title'
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Description Input */}
                        <View>
                            <Text className="text-gray-500 mb-2">Description</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-4 w-full h-[150px] border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Type Description'
                                multiline
                                numberOfLines={5}
                                style={{ paddingTop: 10, paddingLeft: 10 }} // Adjust padding to position placeholder
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        {/* Date Picker */}
                        <View>
                            <Text className="text-gray-500 mb-2">Date</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput
                                    className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                    placeholderTextColor="#a1a1aa"
                                    placeholder='dd/mm/yyyy'
                                    value={date.toLocaleDateString()} // Use locale string for better format
                                    editable={false} // Make the input non-editable, open date picker on press
                                />
                            </TouchableOpacity>
                        </View>

                        {/* DateTimePicker Component */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onChangeDate}
                                style={{ backgroundColor: 'white' }}
                            />
                        )}

                        {/* Image Picker */}
                        <View>
                            <Text style={{ color: 'gray', marginBottom: 8 }}>Picture</Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: 6,
                                    paddingLeft: 16,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    width: '100%',
                                    borderColor: '#d1d1d1',
                                    borderWidth: 1,
                                    marginBottom: 16,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={handleImagePicker}
                            >
                                <FontAwesome6 name="images" size={20} color="gray" style={{ marginRight: 10 }} />
                                <Text style={{ color: 'gray' }}>Select Images</Text>
                            </TouchableOpacity>

                            {/* Display Selected Images */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                                {pictures.map((uri, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri }}
                                        style={{ width: 100, height: 100, borderRadius: 8, marginRight: 10 }}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Uploading Indicator */}
                        {isUploading && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <ActivityIndicator size="small" color="#1D78C3" />
                                <Text style={{ marginLeft: 10, color: '#1D78C3' }}>Uploading images...</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white flex-row justify-between">
                <TouchableOpacity 
                    className="flex-1 mr-2"
                    onPress={() => navigation.goBack()} // Added functionality to cancel
                >
                    <View className="bg-gray-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Cancel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="flex-1 ml-2" 
                    onPress={handleSubmit}
                    disabled={isUploading} // Disable submit button while uploading
                >
                    <View className={`flex justify-center items-center h-12 rounded-[10px] ${isUploading ? 'bg-blue-300' : 'bg-blue-500'}`}>
                        <Text className="text-xl text-white">Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default InvestmentFormScreen;
