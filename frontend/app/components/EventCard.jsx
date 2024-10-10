import { View, Text, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EventCard = ({ data }) => {
    return (
       


        <View  style={{
            backgroundColor: '#F1F5F9', // Slate color (bg-slate-100)
            borderRadius: 10,
            elevation: 5, // For Android shadow
            shadowColor: '#000', // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.25, // Shadow opacity
            shadowRadius: 3.5, // Shadow radius
            marginBottom: 20, // Margin bottom
        }}>
        <View className="flex justify-center items-center">
                <Image
                    className="w-full h-40 rounded-t-[10px] mx-0 my-0" // Remove padding and margin
                    source={data.image}
                    resizeMode="cover"
                />
            </View>
            <View className=" p-4 mb-2">
            <Text className="text-black font-semibold text-sm mt-1">
                {data.title}
            </Text>
            <Text className="text-gray-400 mt-2">
                {data.description}
            </Text>
            <View className="flex-row justify-between mt-4">
                <View className="flex-row">
                    <View className="flex-row items-center">
                        <AntDesign name="like1" size={12} color="gray" />
                        <Text className="font-semibold text-gray-500 text-xs ml-2">
                            10.2K
                        </Text>
                    </View>

                    <View className="flex-row items-center ml-5">
                        <AntDesign name="dislike1" size={12} color="gray" />
                        <Text className="font-semibold text-gray-500 text-xs ml-2">
                            3.2K
                        </Text>
                    </View>
                </View>
                <Text className="font-semibold text-gray-500 text-xs">
                    20/02/2024
                </Text>
            </View>
        </View>
        </View>
    );
};

export default EventCard;
