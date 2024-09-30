import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({navigation}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <SafeAreaView className="flex-1 bg-[#1D78C3]">
           
            <ScrollView>
                <View className="bg-[#1D78C3]">
                    <View className="pl-6">
                        <TouchableOpacity className="mt-12" onPress={()=>navigation.navigate('LoginScreen')}>
                            <FontAwesome6 name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-3xl text-white font-bold mt-8">Register</Text>
                        <View className="flex-row justify-start items-center">
                        <Text className="text-white pt-4 mb-4 mr-2">Already have an account?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}><Text className="underline text-white">Login</Text></TouchableOpacity>
                        </View>
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
                        <View>
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
                        </View>
                        <TouchableOpacity className="ml-6 mr-6 mt-10">
                            <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                                <Text className="text-xl text-white">Register</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
