import { View, Text, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EventCard = ({ data }) => {
    return (
        <View className="bg-slate-100 rounded-[10px] shadow-lg p-4 mb-6">
            <View className="flex justify-center items-center">
                <Image
                    className="w-full h-40 rounded-[10px]"
                    source={data.image}
                    resizeMode="cover"
                />
            </View>
            <Text className="text-black font-semibold text-lg mt-4">
                {data.title}
            </Text>
            <Text className="text-gray-400 mt-2">
                {data.description}
            </Text>
            <View className="flex-row justify-between mt-4">
                <View className="flex-row">
                    <View className="flex-row items-center">
                        <AntDesign name="like1" size={15} color="gray" />
                        <Text className="font-semibold text-gray-500 text-sm ml-2">
                            10.2K
                        </Text>
                    </View>

                    <View className="flex-row items-center ml-5">
                        <AntDesign name="dislike1" size={15} color="gray" />
                        <Text className="font-semibold text-gray-500 text-sm ml-2">
                            3.2K
                        </Text>
                    </View>
                </View>
                <Text className="font-semibold text-gray-500 text-sm">
                    20/02/2024
                </Text>
            </View>
        </View>
    );
};

export default EventCard;
