import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Modal from 'react-native-modal'; 
import ClimateNetworkCommentCard from './ClimateNetwordCommentCard';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window'); 

const ClimateNetworkCard = ({ data }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View className="shadow-lg shadow-black bg-white rounded-[15px] p-2 mb-6">
            <View className="bg-[#FFFFFF] rounded-[10px] p-4">
                <View className="flex justify-center items-center">
                    <Carousel
                        autoPlay
                        width={screenWidth *0.85} 
                        height={screenWidth * 0.6} 
                        data={data.images}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }} // Correctly wrapping the item
                                style={{ width: '100%', height: '100%', borderRadius: 10 }} // Ensure images fill the carousel area
                                resizeMode="cover" // Adjust resize mode as needed
                            />
                        )}
                    />
                </View>

                <View className="flex-row justify-between items-center mt-4">
                    <Text className="text-black font-semibold text-lg">{data.title}</Text>
                    <Text className="font-semibold text-gray-500 text-sm">{data.date}</Text>
                </View>

                <View className="flex-row items-center">
                    <Ionicons name="location-sharp" size={15} color="gray" />
                    <Text className="text-gray-400 ml-3 my-1">{data.location}</Text>
                </View>

                <Text className="text-gray-400 mt-2">{data.description}</Text>
            </View>

            <TouchableOpacity onPress={toggleModal} className="flex-row bg-[#EAF4FB] justify-center items-center mt-4 p-2 rounded-[10px]">
                <Foundation name="comment" size={20} color="gray" />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                animationIn="zoomIn"
                animationOut="zoomOut"
                style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}
            >
                <View className="bg-white p-4 rounded-[10px] w-[90%]">
                    <ClimateNetworkCommentCard toggleModal={toggleModal} post={data._id}/>
                </View>
            </Modal>
        </View>
    );
};

export default ClimateNetworkCard;
