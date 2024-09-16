import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';


const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const SelectEvent = () => {
    const item = useLocalSearchParams();
    const router = useRouter()


    const images = [
        require('../assets/images/greenInvest.png'),  // Add more images if you have
        require('../assets/images/greenInvest.png'),
    ];

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row items-center px-6 py-8">
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-2xl text-center ml-12 text-white font-bold">Event</Text>
                    </View>
                </View>

                <View className="w-full">
                    <Carousel
                        width={screenWidth}  // Set carousel width to full screen width
                        height={screenWidth * 0.6} // Adjust height (60% of the width for a good aspect ratio)
                        data={images}
                        renderItem={({ item }) => (
                            <Image source={item} style={{ width: screenWidth, height: screenWidth * 0.6, borderRadius: 10 }} />
                        )}
                    />
                </View>

                <View className="mt-[-15px] p-4 bg-white rounded-t-[10px]">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-2xl font-bold">{item.title}</Text>

                        <View className="flex-row items-center">
                            <View className="flex-row items-center mr-4">
                                <Entypo name="share" size={18} color="gray" />
                            </View>
                            <View className="flex items-center">
                            <Text className="font-semibold text-gray-500 text-sm ml-2 p-1">Participents</Text>
                                <FontAwesome6 name="people-group" size={15} color="gray" />
                                <Text className="text-black font-semibold text-sm">13</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 pt-3">20/01/2025</Text>
                    <Text className="text-sm text-gray-700 mt-5">{item.description}</Text>
                </View>
                <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white flex-row justify-between">
                <TouchableOpacity className="flex-1 mr-2">
                    <View className="bg-gray-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Register</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 ml-2">
                    <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Location</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SelectEvent;
