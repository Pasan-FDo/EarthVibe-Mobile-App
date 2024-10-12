// EventFormScreen.js

import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet, 
    Image, 
    Alert, 
    ActivityIndicator, 
    Platform,
    Dimensions, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '../../../config';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width } = Dimensions.get('window');

const EventFormScreen = () => {
    const navigation = useNavigation();

    // State variables for form inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState('');
    const [image, setImage] = useState(null); // URI of selected image
    const [uploading, setUploading] = useState(false);
    const [location, setLocation] = useState(null); // { description: '', latitude: ..., longitude: ... }
    const [userDetails, setUserDetails] = useState(null); // User details from AsyncStorage

    // Fetch user details from AsyncStorage on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetailsString = await AsyncStorage.getItem('UserDetails');
                if (userDetailsString !== null) {
                    const parsedUserDetails = JSON.parse(userDetailsString);
                    setUserDetails(parsedUserDetails);
                    console.log('User Details:', parsedUserDetails);
                } else {
                    console.log('No user details found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                Alert.alert('Error', 'Failed to fetch user details.');
            }
        };
        fetchUserDetails();
    }, []);

    // Function to handle image selection
    const pickImage = async () => {
        try {
            // Ask for permission to access media library
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access media library is required!');
                return;
            }

            // Launch image picker
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image.');
        }
    };

    // Function to handle date selection
    const onDateChange = (event, selectedDate) => {
        if (event.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    // Function to handle location fetching via Google Places Autocomplete
    // and using current location
    const getCurrentLocation = async () => {
        try {
            // Ask for location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location is required!');
                return;
            }

            // Get current location
            let loc = await Location.getCurrentPositionAsync({});
            setLocation({
                description: 'Current Location',
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        } catch (error) {
            console.error('Error fetching location:', error);
            Alert.alert('Error', 'Failed to fetch current location.');
        }
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        // Validate inputs
        if (!title.trim() || !description.trim() || !date || !time.trim() || !location) {
            Alert.alert('Incomplete Form', 'Please fill out all required fields.');
            return;
        }

        setUploading(true);

        try {
            // Upload image if selected
            let imageUrl = '';
            if (image) {
                const response = await fetch(image);
                const blob = await response.blob();
                const filename = image.substring(image.lastIndexOf('/') + 1);
                const ref = firebase.storage().ref().child(`events/${filename}`);
                await ref.put(blob);
                imageUrl = await ref.getDownloadURL();
            }

            // Prepare event data
            const eventData = {
                title: title.trim(),
                description: description.trim(),
                date: date.toISOString(),
                time: time.trim(),
                location: location, // { description: '', latitude: ..., longitude: ... }
                imageUrl: imageUrl,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                user: userDetails ? userDetails.uid : 'unknown',
            };

            // Save to Firestore
            await firebase.firestore().collection('Events').add(eventData);
            console.log('Event Data:', eventData);

            Alert.alert('Success', 'Event created successfully!');
            navigation.navigate('EventScreen');
        } catch (error) {
            console.error('Error creating event:', error);
            Alert.alert('Error', 'There was an error creating the event.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Header title="Register the Event" image={require('../../assets/images/profile.png')} />

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>Fill This Form To Post Event</Text>

                    {/* Main Title */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Main Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Add Title'
                            placeholderTextColor="#a1a1aa"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Description */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder='Type Description'
                            placeholderTextColor="#a1a1aa"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={5}
                        />
                    </View>

                    {/* Date Picker */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                            <Text style={styles.dateText}>{date.toDateString()}</Text>
                            <FontAwesome6 name="calendar" size={20} color="#1D78C3" />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                    </View>

                    {/* Time Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Time</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='10:00'
                            placeholderTextColor="#a1a1aa"
                            value={time}
                            onChangeText={setTime}
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Location Picker */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Location</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search for location'
                            onPress={(data, details = null) => {
                                if (details) {
                                    setLocation({
                                        description: data.description,
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng,
                                    });
                                }
                            }}
                            query={{
                                key: 'YOUR_GOOGLE_PLACES_API_KEY', // Replace with your actual API key
                                language: 'en',
                            }}
                            styles={{
                                textInputContainer: styles.placesInputContainer,
                                textInput: styles.placesInput,
                                listView: styles.placesListView,
                            }}
                            fetchDetails={true}
                            enablePoweredByContainer={false}
                        />
                        <TouchableOpacity onPress={getCurrentLocation} style={styles.currentLocationButton}>
                            <FontAwesome6 name="location-arrow" size={20} color="#1D78C3" />
                            <Text style={styles.currentLocationText}>Use Current Location</Text>
                        </TouchableOpacity>
                        {location && (
                            <Text style={styles.selectedLocation}>Selected Location: {location.description}</Text>
                        )}
                    </View>

                    {/* Image Picker */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Picture</Text>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.selectedImage} />
                            ) : (
                                <FontAwesome6 name="camera" size={30} color="#1D78C3" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Submit and Cancel Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} disabled={uploading}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={uploading}>
                    {uploading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F5F5F5',
        },
        scrollContent: {
            padding: 20,
            paddingBottom: 100, // Ensure content is above the buttons
        },
        formContainer: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: '#1D78C3',
            marginBottom: 20,
            textAlign: 'center',
        },
        inputGroup: {
            marginBottom: 15,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 5,
        },
        input: {
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            color: '#333',
            borderWidth: 1,
            borderColor: '#ddd',
        },
        textArea: {
            height: 100,
            textAlignVertical: 'top',
        },
        datePicker: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
        },
        dateText: {
            fontSize: 16,
            color: '#333',
        },
        placesInputContainer: {
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
        },
        placesInput: {
            height: 40,
            color: '#333',
            fontSize: 16,
        },
        placesListView: {
            backgroundColor: '#fff',
            borderRadius: 8,
        },
        currentLocationButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        currentLocationText: {
            marginLeft: 10,
            color: '#1D78C3',
            fontSize: 16,
        },
        selectedLocation: {
            marginTop: 10,
            color: '#555',
            fontSize: 14,
        },
        imagePicker: {
            width: '100%',
            height: 200,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
        },
        selectedImage: {
            width: '100%',
            height: '100%',
            borderRadius: 8,
        },
        buttonContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            padding: 20,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ddd',
        },
        cancelButton: {
            flex: 1,
            marginRight: 10,
            backgroundColor: '#aaa',
            paddingVertical: 15,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        cancelButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
        submitButton: {
            flex: 1,
            marginLeft: 10,
            backgroundColor: '#1D78C3',
            paddingVertical: 15,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        submitButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
    });

    export default EventFormScreen;
