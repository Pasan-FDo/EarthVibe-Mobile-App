import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { firebase } from '../../../config';
import GreenInvetmentCard from '../../components/GreenInvetmentCard';
import NavigationBar from '../../components/NavigationBar';


const GreenInvestment = ({navigation}) => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetching data from Firestore
    const fetchData = async () => {
        try {
            const truckRef = firebase.firestore().collection('GreenInvestment');
            const snapshot = await truckRef.get();
            const fetchedData = snapshot.docs.map(doc => ({
                _id: doc.id, // Assign document ID as _id
                ...doc.data(), // Spread document data
            }));
            console.log(fetchedData);
            setInvestments(fetchedData);

        } catch (error) {
            console.error('Error fetching GreenInvestment data: ', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-8">
                        <Text className="text-3xl text-center ml-6 text-white font-bold">Green Investment</Text>
                        <Image
                            source={require('../../assets/images/profile.png')}
                            className="w-14 h-14 rounded-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>

                <View className="mt-8 px-4">
                    {/* Show loading spinner while data is being fetched */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#1D78C3" />
                    ) : (
                        investments.map((item) => (
                            <TouchableOpacity
                            key={item._id}
                            onPress={() => navigation.navigate('SelectGreenInvestmentScreen', { _id: item._id })}  // Pass the _id to the next screen
                        >
                            <GreenInvetmentCard data={item} />
                        </TouchableOpacity>
                        
                        ))
                    )}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
};

export default GreenInvestment;