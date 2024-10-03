import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { firebase } from '../config'; // Ensure this import is correct

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const SelectGreenInvestment = () => {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [investmentData, setInvestmentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvestmentData = async () => {
            try {
                const docRef = firebase.firestore().collection('GreenInvestment').doc(item._id); // Fetch the specific document by ID
                const doc = await docRef.get();
                if (doc.exists) {
                    setInvestmentData({ id: doc.id, ...doc.data() }); // Set the state with the document data
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching investment data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestmentData();
    }, [item._id]); // Depend on item._id to refetch if it changes

    const images = investmentData?.pictures || []; // Use pictures from the investment data

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#1D78C3" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row items-center px-6 py-8">
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-2xl text-center ml-12 text-white font-bold">Green Investments</Text>
                    </View>
                </View>

                <View className="w-full">
                    <Carousel
                        width={screenWidth}  // Set carousel width to full screen width
                        height={screenWidth * 0.6} // Adjust height (60% of the width for a good aspect ratio)
                        data={images}
                        autoPlay
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={{ width: screenWidth, height: screenWidth * 0.6, borderRadius: 10 }} />
                        )}
                    />
                </View>

                <View className="mt-[-15px] p-4 bg-white rounded-t-[10px]">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-2xl font-bold">{investmentData.title}</Text>

                        <View className="flex-row items-center">
                            <View className="flex-row items-center mr-4">
                                <AntDesign name="like1" size={15} color="gray" />
                                <Text className="font-semibold text-gray-500 text-sm ml-2">10.2K</Text>
                            </View>
                            <View className="flex-row items-center">
                                <AntDesign name="dislike1" size={15} color="gray" />
                                <Text className="font-semibold text-gray-500 text-sm ml-2">3.2K</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 pt-3">{investmentData.date}</Text>
                    <Text className="text-sm text-gray-700 mt-5">{investmentData.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SelectGreenInvestment;
