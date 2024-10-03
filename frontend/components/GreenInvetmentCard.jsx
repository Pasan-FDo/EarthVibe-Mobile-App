import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { doc, updateDoc } from 'firebase/firestore'; // Firebase Firestore imports
import { firebase } from '../config'; // Your Firestore configuration

const GreenInvetmentCard = ({ data }) => {
    // State to manage likes and dislikes
    const [likes, setLikes] = useState(data.like || 0);
    const [dislikes, setDislikes] = useState(data.dislike || 0);

    // Function to handle like button press
    const handleLikePress = async () => {
        const newLikes = likes + 1;
        setLikes(newLikes); // Optimistic UI update

        try {
            await firebase.firestore().collection('GreenInvestment').doc(data._id).update({
                like: newLikes
            })
        } catch (error) {
            console.error('Error updating likes:', error);
            setLikes(likes); // Revert UI change in case of error
        }
    };

    // Function to handle dislike button press
    const handleDislikePress = async () => {
        const newDislikes = dislikes + 1;
        setDislikes(newDislikes); // Optimistic UI update

        try {
            await firebase.firestore().collection('GreenInvestment').doc(data._id).update({
                dislike: newDislikes
            })
        } catch (error) {
            console.error('Error updating dislikes:', error);
            setDislikes(dislikes); // Revert UI change in case of error
        }
    };

    return (
        <View className="bg-slate-100 rounded-[10px] shadow-lg p-4 mb-6">
            <View className="flex justify-center items-center">
                <Image
                    className="w-full h-40 rounded-[10px]"
                    source={{ uri: data.pictures[0] }} // Ensure data has pictures
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
                    {/* Like Button */}
                    <TouchableOpacity onPress={handleLikePress}>
                        <View className="flex-row items-center">
                            <AntDesign name="like1" size={15} color="gray" />
                            <Text className="font-semibold text-gray-500 text-sm ml-2">
                                {likes}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Dislike Button */}
                    <TouchableOpacity onPress={handleDislikePress} style={{ marginLeft: 20 }}>
                        <View className="flex-row items-center">
                            <AntDesign name="dislike1" size={15} color="gray" />
                            <Text className="font-semibold text-gray-500 text-sm ml-2">
                                {dislikes}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text className="font-semibold text-gray-500 text-sm">
                    {data.date}
                </Text>
            </View>
        </View>
    );
};

export default GreenInvetmentCard;
