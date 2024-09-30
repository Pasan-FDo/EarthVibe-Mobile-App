import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DisasterAlertCard = ({ data }) => {
    // Function to handle dialing
    const handleDial = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`).catch((err) => console.error("Couldn't load page", err));
    };

    return (
        <View className="shadow-lg shadow-black bg-[#FFCBD4] rounded-[15px] p-4 mb-6">
            <View className="bg-[#FFCBD4] rounded-[10px] p-4">
                <View className="flex justify-center items-center">
                    <Image
                        className="w-full h-40 rounded-[10px]"
                        source={data.image}
                        resizeMode="cover"
                    />
                </View>

                <View className="flex-row justify-between items-center mt-4">
                    <Text className="text-black font-semibold text-lg">
                        {data.title}
                    </Text>
                    <Text className="font-semibold text-gray-500 text-sm">
                        20/02/2024
                    </Text>
                </View>

                <View className="flex-row items-center mt-2">
                    <Ionicons name="location-sharp" size={15} color="gray" />
                    <Text className="text-gray-400 ml-2">{data.location}</Text>
                </View>

                <Text className="text-gray-400 mt-2">
                    {data.description}
                </Text>
                <Text className="py-3 text-black font-semibold text-lg">
                    Emergency Contact
                </Text>
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => handleDial(data.policeContact)}>
                        <View className="flex-row items-center justify-center bg-white rounded-[10px] w-32 mx-4 py-1">
                            <MaterialIcons name="local-police" size={25} color="#545454" />
                            <Text className="text-[#545454] text-lg font-semibold ml-2">Police</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDial(data.fireContact)}>
                        <View className="flex-row items-center justify-center bg-white rounded-[10px] w-32 mx-4 py-1">
                            <MaterialIcons name="local-fire-department" size={25} color="#545454" />
                            <Text className="text-[#545454] text-lg font-semibold ml-2">Fire</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center py-3">
                    <TouchableOpacity onPress={() => handleDial(data.medicalContact)}>
                        <View className="flex-row items-center justify-center bg-white rounded-[10px] w-32 mx-4 py-1">
                            <MaterialIcons name="local-hospital" size={25} color="#545454" />
                            <Text className="text-[#545454] text-lg font-semibold ml-2">Medical</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDial(data.agentContact)}>
                        <View className="flex-row items-center justify-center bg-white rounded-[10px] w-32 mx-4 py-1">
                            <MaterialIcons name="support-agent" size={25} color="#545454" />
                            <Text className="text-[#545454] text-lg font-semibold ml-2">Agent</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DisasterAlertCard;
