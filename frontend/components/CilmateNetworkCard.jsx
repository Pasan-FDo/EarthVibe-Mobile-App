import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Modal from 'react-native-modal'; // Use the correct import for react-native-modal
import ClimateNetworkCommentCard from './ClimateNetwordCommentCard';

const GreenInvestmentCard = ({ data }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View className="shadow-lg shadow-black bg-white rounded-[15px] p-2 mb-6">
            {/* Outer wrapper to create the "pop-up" shadow effect */}
            <View className="bg-[#FFFFFF] rounded-[10px] p-4">
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

                <View className="flex-row items-center">
                    <Ionicons name="location-sharp" size={15} color="gray" />
                    <Text className="text-gray-400 ml-3 my-1">{data.location}</Text>
                </View>

                <Text className="text-gray-400 mt-2">
                    {data.description}
                </Text>
            </View>

            {/* Comment section button */}
            <TouchableOpacity onPress={toggleModal} className="flex-row bg-[#EAF4FB] justify-center items-center mt-4 p-2 rounded-[10px]">
                <Foundation name="comment" size={20} color="gray" />
            </TouchableOpacity>

            {/* Modal for comments */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                animationIn="zoomIn"
                animationOut="zoomOut"
                style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}
            >
                <View className="bg-white p-4 rounded-[10px] w-[90%]">
                    <ClimateNetworkCommentCard toggleModal={toggleModal} />
                </View>
            </Modal>
        </View>
    );
};

export default GreenInvestmentCard;
