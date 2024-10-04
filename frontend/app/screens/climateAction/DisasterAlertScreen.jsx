import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import DisasterAllertCard from '../../components/DisasterAllertCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../components/NavigationBar';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure AsyncStorage is imported
import { firebase } from '../../../config'; // Make sure firebase is imported properly

const DisasterAlertScreen = ({ navigation }) => {
    const [userDistrict, setUserDistrict] = useState('');
    const [Locdistrict, setLocDistrict] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [disaster, setDisaster] = useState([]);

    const fetchUserDetails = async () => {
        const district = await AsyncStorage.getItem('District');
        setUserDistrict(district || ''); // Set user district or empty string
    };

    const getLiveLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false); // Stop loading if permission denied
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        const address = await Location.reverseGeocodeAsync({ latitude, longitude });

        if (address.length > 0) {
            const userDistrict = address[0].subregion || address[0].district || 'District not found';
            setLocDistrict(userDistrict);
        } else {
            setErrorMsg('No address found');
        }
        setLoading(false);
    };

    const getLoginDistrict = async () => {
        try {
            if (!userDistrict && !Locdistrict) {
                // console.error('Both user district and location district are not defined.');
                // Alert.alert('Error', 'Both user district and location district must be defined.');
                return;
            }

            let query = firebase.firestore().collection('Disaster');
            const conditions = [];

            if (userDistrict) {
                conditions.push(query.where('location', '==', userDistrict));
            }

            if (Locdistrict) {
                conditions.push(query.where('location', '==', Locdistrict));
            }

            let commentsData = [];
            for (const condition of conditions) {
                const snapshot = await condition.get();
                commentsData.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }

            const uniqueComments = Array.from(new Set(commentsData.map(a => a.id)))
                .map(id => commentsData.find(a => a.id === id));

            setDisaster(uniqueComments);

            if (uniqueComments.length === 0) {
                // console.warn('No comments found for the specified districts.');
                Alert.alert('You Safe', 'You are in safe area! ');
            }
        } catch (error) {
            // console.error('Error fetching comments:', error);
            Alert.alert('Error', 'Failed to fetch comments. Please try again.');
        }
    };

    useEffect(() => {
        getLiveLocation();
        fetchUserDetails();
    }, []);

    useEffect(() => {
        getLoginDistrict();
    }, [userDistrict, Locdistrict]);

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-center items-center px-6 py-4">
                        <Text className="text-3xl text-white font-bold">Disaster Alert</Text>
                    </View>
                </View>
                <View className="px-4 py-4">
                    <View className="flex-row items-center justify-center bg-[#E4F400] px-1 py-2 rounded-[10px]">
                        <FontAwesome name="warning" size={20} color="#E10000" />
                        <Text className="text-2xl text-[#E10000] font-bold ml-3">You are in dangerous zone!</Text>
                    </View>
                </View>

                <View className="flex px-6 py-4">
                    {/* Map over the disaster array and pass each item to the DisasterAllertCard */}
                    {disaster.length > 0 ? (
                        disaster.map((item) => (
                            <DisasterAllertCard key={item.id} data={item} /> // Pass individual data to DisasterAllertCard
                        ))
                    ) : (
                        <Text>No Disaster Alerts found for your location.</Text>
                    )}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
};

export default DisasterAlertScreen;
