import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Profile = () => {
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-8">
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>

                        <Text className="text-3xl text-white font-bold">Profile</Text>

                        <TouchableOpacity onPress={() => router.push('login')}>
                            <AntDesign name='edit' size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/* <View className="flex-1 items-center">
                        <Image source={require("../assets/images/profile.pmg")}/>
                    </View> */}
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
                        {/* <View>
                    <Text className="text-gray-400 mb-2">Set Password</Text>
                    <View className="relative">
                        <TextInput
                            className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                            placeholderTextColor="#a1a1aa"
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity
                            className="absolute right-3 top-3"
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <FontAwesome
                                name={passwordVisible ? "eye-slash" : "eye"}
                                size={20}
                                color="#a1a1aa"
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}
                        <TouchableOpacity className="ml-6 mr-6 mt-10">
                            <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                                <Text className="text-xl text-white">Register</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile