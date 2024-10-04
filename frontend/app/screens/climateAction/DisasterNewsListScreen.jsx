import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import ClimateNewsListCard from '../../components/ClimateNewsListCard';
import { firebase } from '../../../config'; // Adjust the import path according to your project structure


const DisasterNewsListScreen = ({navigation}) => {
    const [dataArray, setDataArray] = useState([]);

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
                    <View className="flex-row justify-center items-center px-6 py-8">
                        <Text className="text-3xl text-center text-white font-bold">Disaster News Form</Text>
                    </View>
                </View>
                <View className="mt-8 px-4">
                    {dataArray.map((item) => (
                        <ClimateNewsListCard key={item._id} data={item} navigation={navigation} />
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
};

export default DisasterNewsListScreen;
