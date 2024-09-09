import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView className="flex-1">
        <ScrollView>
      <ImageBackground className="w-full h-full absolute" source={require('../assets/images/loginbg.png')} />
      <View className="flex-1 justify-center items-center">
        <Image className="w-44 h-44 mb-4" source={require('../assets/images/EarthVibeLogo.png')} />
        <Text className="text-white font-bold text-3xl">Sign in to your</Text>
        <Text className="text-white font-bold text-3xl">Account</Text>
        <Text className="text-white mt-1 mb-6">Enter your email and password to log in</Text>

        <View className="bg-white rounded-[10px] w-[80%] p-6 shadow-lg">
          <TextInput
            className="bg-gray-100 rounded-[6px] w-full p-3 border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
            placeholder="Enter email"
            placeholderTextColor="#a1a1aa"
          />
          <TextInput
            className="bg-gray-100 rounded-[6px] w-full p-3 border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
            placeholder="Password"
            placeholderTextColor="#a1a1aa"
            secureTextEntry
          />
          <View className="flex-row justify-between items-center w-full mb-4">
            <TouchableOpacity 
              className="flex-row items-center" 
              onPress={() => setIsChecked(!isChecked)}
            >
              <View className={`w-5 h-5 border-2 rounded-sm ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} mr-2`}>
                {isChecked && <View className="bg-white w-full h-full justify-center items-center">
                  <Text className="text-white font-bold">✓</Text>
                </View>}
              </View>
              <Text className="text-gray-400">Remember me</Text>
            </TouchableOpacity>
            <Text className="text-blue-500 font-bold">Forgot Password?</Text>
          </View>

          <TouchableOpacity>
            <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
              <Text className="text-xl text-white">Log In</Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-center pt-5">
            <Text className="text-gray-400">Don't have an account?</Text>
            <Text className="text-blue-500">Register </Text>
          </View>
        </View>
        <View className="flex-row justify-center pt-6">
            <Text className="text-gray-400">By signing up, you agree to the</Text>
            <Text className="text-black font-bold">Terms and Service</Text>
            <Text className="text-gray-400">and</Text>
        </View>
        <View className="flex-row justify-center">
            <Text className="text-black font-bold">Data Processing Agreement</Text>

        </View>

      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
