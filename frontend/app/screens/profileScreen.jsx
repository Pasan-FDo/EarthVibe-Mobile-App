import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import NavigationBar from '../components/NavigationBar';

const ProfileScreen = ({navigation}) => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
          
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-8">
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>

                        <Text className="text-3xl text-white font-bold">Profile</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <AntDesign name='edit' size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex items-center justify-center">
                        <Image
                            source={require('../assets/images/profile.png')}
                            className="w-20 h-20 rounded-full"
                            resizeMode="cover"
                        />
                        <Text className="text-white font-bold text-lg pt-4">Aviska Rathnapala</Text>
                    </View>
                </View>

                <View className="bg-white">
                    <View className="mr-6 ml-6 mt-5">
                        <View>
                            <Text className="text-gray-500 mb-2">Full Name</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                            />
                        </View>

                        <View>
                            <Text className="text-gray-500 mb-2">E-mail</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                            />
                        </View>

                        <View>
                            <Text className="text-gray-400 mb-2">Mobile Number</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                keyboardType='numeric'
                            />
                        </View>
                        <View className="flex-row">
                            <View className="flex-1 mr-2">
                                <Text className="text-gray-400 mb-2">Mobile Number</Text>
                                <TextInput
                                    className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                    placeholderTextColor="#a1a1aa"
                                />
                            </View>
                            <View className="flex-1 ml-2">
                                <Text className="text-gray-400 mb-2">District</Text>
                                <TextInput
                                    className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                    placeholderTextColor="#a1a1aa"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bottom-20 left-0 right-0 px-6 py-4 bg-white">
                <TouchableOpacity>
                    <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar/>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;
