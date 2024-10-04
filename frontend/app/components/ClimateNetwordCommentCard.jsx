import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../../config'; // Make sure firebase is imported properly

const ClimateNetworkCommentCard = ({ toggleModal, post }) => {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]); // State to hold fetched comments

    useEffect(() => {
        const fetchUserDetails = async () => {
            const storedUserName = await AsyncStorage.getItem('UserName');
            setUserName(storedUserName || ''); // Set user name or empty string
        };

        const fetchComments = async () => {
            const snapshot = await firebase.firestore().collection('Comment').where('postId', '==', post).get();
            const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through the snapshot to create an array of comments
            setComments(commentsData); // Set the comments state
        };

        fetchUserDetails();
        fetchComments(); // Call fetchComments when component mounts
    }, [post]); // Depend on post to refetch comments if post changes

    const handleSubmit = async () => {
        if (!message) {
            Alert.alert('Warning', 'Please type your comment');
            return; // Exit if no message
        }

        try {
            await firebase.firestore().collection('Comment').add({
                postId: post, // Assuming post is passed as a prop
                message,
                userName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert('Success', 'Your comment was successfully added');
            setMessage(''); // Clear the message input after submitting
            // Refetch comments after adding a new one
            const snapshot = await firebase.firestore().collection('Comment').where('postId', '==', post).get();
            const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(commentsData);
        } catch (error) {
            Alert.alert('Error', 'Failed to add comment: ' + error.message);
        }
    };

    return (
        <View className="bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-row justify-end">
                    <TouchableOpacity onPress={toggleModal}>
                        <AntDesign name="closecircle" size={20} color="red" />
                    </TouchableOpacity>
                </View>

                <Text className="mt-2 text-black text-lg">Climate Network Comment</Text>
                <Text className="mt-4 text-gray-500">Here you can add comments related to the climate network.</Text>

                <View className="pb-20">
                    {comments.map(comment => (
                        <CommentCard key={comment.id} data={comment} /> // Pass each comment data to CommentCard
                    ))}
                </View>

            </ScrollView>

            <View className="flex-row items-center bg-white border-t border-gray-300 absolute bottom-0 left-0 right-0 pt-4">
                <TextInput
                    className="bg-gray-100 rounded-md pl-3 py-2 flex-1 border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800"
                    placeholder="Comment here"
                    placeholderTextColor="#a1a1aa"
                    multiline
                    value={message} // Set the value to the state
                    onChangeText={setMessage}
                />
                <TouchableOpacity onPress={handleSubmit}>
                    <View className="w-12 h-12 bg-[#EAF4FB] rounded-[10px] items-center justify-center ml-2">
                        <FontAwesome name="send" size={20} color="#1D78C3" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClimateNetworkCommentCard;

const CommentCard = ({ data }) => {
    return ( // Ensure to return the JSX in the CommentCard component
        <View className="bg-slate-300 py-3 px-2 m-2 rounded-lg shadow-lg">
            <View className="flex-row p-1">
                <AntDesign name="user" size={20} color="black" />
                <Text className="text-black ml-4">{data.userName}</Text>
            </View>
            <Text className="py-1 text-gray-500 italic">{data.message}</Text>
        </View>
    );
};
