import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const SelectTips = () => {
    const item = useLocalSearchParams();
    const router = useRouter();

    const images = [
        require('../assets/images/greenInvest.png'),  // Add more images if you have
        require('../assets/images/greenInvest.png'),
    ];

    // Share handler function
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `${item.title}\n\n${item.description}`,
                url: 'https://example.com', // Add your own URL if needed
                title: item.title
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with specific activity (iOS)
                } else {
                    // shared (Android or fallback)
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row items-center px-6 py-8">
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-2xl text-center ml-12 text-white font-bold">Tips & Life Hacks</Text>
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
                            <TouchableOpacity onPress={onShare} className="flex-row items-center mr-4">
                                <Entypo name="share" size={18} color="gray" />
                            </TouchableOpacity>

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

                    <Text className="text-sm text-gray-700 mt-5">{item.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SelectTips;
