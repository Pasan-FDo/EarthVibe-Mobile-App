import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import ClimateNetworkCard from '../../components/CilmateNetworkCard';
import { firebase } from '../../../config'; // Adjust the import path according to your project structure

const ClimateNetworkScreen = ({ navigation }) => {
    const [dataArray, setDataArray] = useState([]);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchDisasters = async () => {
            try {
                const responce = firebase.firestore().collection('Disaster');
                const snapshot = await responce.get();
                const fetchedData = snapshot.docs.map(doc => ({
                    _id: doc.id, // Assign document ID as _id
                    ...doc.data(), // Spread document data
                }));
                setDataArray(fetchedData);
            } catch (error) {
                Alert.alert('Error', 'Could not fetch disaster data');
            }
        };

        fetchDisasters();
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-4">
                        <Text className="text-3xl text-center ml-36 text-white font-bold">Home</Text>
                        <Image
                            source={require('../../assets/images/profile.png')}
                            className="w-12 h-12 rounded-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View className="mt-8 px-4">
                    {dataArray.map((item) => (
                        <ClimateNetworkCard key={item._id} data={item} /> // Add key prop for each card
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
}

export default ClimateNetworkScreen;
