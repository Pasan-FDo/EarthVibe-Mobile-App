import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { firebase } from '../config';

const Register = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !mobileNumber || !district || !password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Create user data object
      const userDetails = {
        fullName,
        email,
        mobileNumber,
        district,
        password,  // Store password only if necessary, but typically avoid storing plain text passwords
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // Add user details to Firestore without Firebase Auth
      const dbRef = firebase.firestore().collection('Earthusers');
      await dbRef.add(userDetails);
      alert('User registered successfully!');

      // Redirect to login or home page
      router.push('login');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error registering user: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="bg-[#1D78C3]">
          <View className="pl-6">
            <TouchableOpacity className="mt-12" onPress={() => router.back()}>
              <FontAwesome6 name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-3xl text-white font-bold mt-8">Register</Text>
            <TouchableOpacity onPress={() => router.push('login')}>
              <Text className="text-white pt-4 mb-4">Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white">
          <View className="mr-6 ml-6 mt-5">
            {/* Full Name */}
            <View>
              <Text className="text-gray-500 mb-2">Full Name</Text>
              <TextInput
                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                placeholderTextColor="#a1a1aa"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-gray-500 mb-2">E-mail</Text>
              <TextInput
                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                placeholderTextColor="#a1a1aa"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>

            {/* Mobile Number */}
            <View>
              <Text className="text-gray-400 mb-2">Mobile Number</Text>
              <TextInput
                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                placeholderTextColor="#a1a1aa"
                value={mobileNumber}
                onChangeText={(text) => setMobileNumber(text)}
                keyboardType="numeric"
              />
            </View>

            {/* District */}
            <View className="flex-1 ml-2">
              <Text className="text-gray-400 mb-2">District</Text>
              <TextInput
                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                placeholderTextColor="#a1a1aa"
                value={district}
                onChangeText={(text) => setDistrict(text)}
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-gray-500 mb-2">Password</Text>
              <View className="flex-row items-center">
                <TextInput
                  className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                  placeholderTextColor="#a1a1aa"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3"
                >
                  <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={18} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity className="ml-6 mr-6 mt-10" onPress={handleRegister}>
            <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
              <Text className="text-xl text-white">Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
