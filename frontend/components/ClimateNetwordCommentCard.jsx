import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ClimateNetworkCommentCard = ({ toggleModal }) => {
    return (
        <View className=" bg-white">
            <ScrollView contentContainerStyle="flex-grow">
                <View className="flex-row justify-end">
                    <TouchableOpacity onPress={toggleModal}>
                        <AntDesign name="closecircle" size={20} color="red" />
                    </TouchableOpacity>
                </View>

                <Text className="mt-2 text-black text-lg">Climate Network Comment Card</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>

            </ScrollView>

            <View className="flex-row items-center bg-white border-t border-gray-300 absolute bottom-0 left-0 right-0 pt-4">
                <TextInput
                    className="bg-gray-100 rounded-md pl-3 py-2 flex-1 border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800"
                    placeholder="Comment here"
                    placeholderTextColor="#a1a1aa"
                    multiline
                />
                <TouchableOpacity>
                    <View className="w-12 h-12 bg-[#EAF4FB] rounded-[10px] items-center justify-center ml-2">
                        <FontAwesome name="send" size={20} color="#1D78C3" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClimateNetworkCommentCard;
