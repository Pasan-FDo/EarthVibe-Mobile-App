import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'; // For pencil and trash icons

const EventPostCard = ({ data }) => {
    return (
        <View className="shadow-lg shadow-black bg-white rounded-[15px] mb-6">
            <View className="bg-[#FFFFFF] rounded-[10px] p-2">
                <Text className="text-black font-semibold text-lg ml-2">
                    {data.title}
                </Text>
                <View className="flex-row items-center mt-1">
                    <Text className="text-gray-400 ml-2">{data.description.slice(20)}</Text>
                </View>
                <Text className="text-gray-400 mt-1 ml-2">20/15/2022</Text>
                <View className="flex-row justify-end mt-4">
                    {/* Edit button */}
                    <TouchableOpacity className="bg-[#C7F0D8] mx-1 rounded-[10px] p-2">
                        <AntDesign name="edit" size={20} color="black" />
                    </TouchableOpacity>

                    {/* Delete button */}
                    <TouchableOpacity className="bg-[#F5C6CB] mx-1 rounded-[10px] p-2">
                        <AntDesign name="delete" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EventPostCard;
