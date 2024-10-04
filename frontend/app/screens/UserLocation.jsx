import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const UserLocation = () => {
    const [district, setDistrict] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        (async () => {
            // Request location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setLoading(false); // Stop loading if permission denied
                return;
            }

            // Get current location
            let currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;

            // Reverse geocoding to get district
            const address = await Location.reverseGeocodeAsync({ latitude, longitude });

            if (address.length > 0) {
                // Assuming the district is in the address[0] object
                const userDistrict = address[0].subregion || address[0].district || 'District not found';
                setDistrict(userDistrict);
            } else {
                setErrorMsg('No address found');
            }
            setLoading(false); // Stop loading after getting the district
        })();
    }, []);

    // Display loading indicator while fetching location
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1D78C3" />
                <Text>Locating your district...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {errorMsg ? (
                <Text style={{ color: 'red' }}>{errorMsg}</Text>
            ) : (
                <Text style={{ fontSize: 18 }}>Your District: {district}</Text>
            )}
        </View>
    );
};

export default UserLocation;
