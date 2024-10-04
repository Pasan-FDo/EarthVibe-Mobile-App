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
        setUserDistrict(district || '');
    };

    const getLiveLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false);
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

    // Fetch all disaster alerts
    const fetchAllDisasters = async () => {
        try {
            const snapshot = await firebase.firestore().collection('Disaster').get();
            const allDisasters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // Update the state with the retrieved disaster data
            setDisaster(allDisasters);
    
            // Handle the case where no comments are found
            if (allDisasters.length === 0) {
                console.warn('No disaster alerts found.');
                Alert.alert('No Alerts', 'No disaster alerts found.');
            }
        } catch (error) {
            console.error('Error fetching disaster alerts:', error);
            Alert.alert('Error', 'Failed to fetch disaster alerts. Please try again.');
        }
    };

    useEffect(() => {
        getLiveLocation(); // Fetch live location
        fetchUserDetails(); // Fetch user details
    }, []);

    useEffect(() => {
        fetchAllDisasters(); // Fetch all disaster alerts when the component mounts
    }, []);

    console.log(Locdistrict, userDistrict);

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
                    {disaster.map((item) => (
                        <DisasterAllertCard key={item.id} data={item} /> // Render DisasterAllertCard for each disaster alert
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
}

export default DisasterAlertScreen;
