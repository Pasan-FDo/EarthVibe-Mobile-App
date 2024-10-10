import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { firebase } from '../../../config';
import GreenInvetmentCard from '../../components/GreenInvetmentCard';
import EventCard from '../../components/EventCard';
import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';

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
                <Header title="Green Investment" image={require('../../assets/images/profile.png')}/>
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
                            <EventCard data={item}/>
                            {/* <GreenInvetmentCard data={item} /> */}
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