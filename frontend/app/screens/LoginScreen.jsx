import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../../config'; 
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const db = getFirestore();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Query the Firestore collection for the entered email
      const usersRef = collection(db, 'Earthusers');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      // Check if the email exists in the collection
      if (!querySnapshot.empty) {
        let userData = null;

        querySnapshot.forEach( async(doc) => {
          console.log(userData);
          userData = doc.data();
          // await AsyncStorage.setItem('User',userData);
          console.log(userData); // Get the user data
          // console.log('District',Asyn);
          
        });

        // Compare the stored password with the entered password
        if (userData && userData.password === password) {
          alert('Login successful!');
          // Navigate to the home page or dashboard
          navigation.navigate('ClimateNetworkScreen');
        } else {
          alert('Incorrect password!');
        }
      } else {
        alert('User with this email does not exist!');
      }

    } catch (error) {
      console.error('Login error: ', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <ImageBackground className="w-full h-full absolute" source={require('../assets/images/loginbg.png')} />
        <View className="flex-1 justify-center items-center">
          <Image className="w-44 h-44 mb-1" source={require('../assets/images/EarthVibeLogo.png')} />
          <Text className="text-white font-bold text-3xl">Sign in to your</Text>
          <Text className="text-white font-bold text-3xl">Account</Text>
          <Text className="text-white mt-1 mb-6">Enter your email and password to log in</Text>

          <View className="bg-white rounded-[10px] w-[80%] p-6 shadow-lg">
            {/* Email Input */}
            <TextInput
              className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
              placeholder="Enter email"
              placeholderTextColor="#a1a1aa"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            {/* Password Input */}
            <TextInput
              className="bg-gray-100 rounded-[6px] w-full pl-4 pt-2 pb-2 border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
              placeholder="Password"
              placeholderTextColor="#a1a1aa"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {/* Remember Me and Forgot Password */}
            <View className="flex-row justify-between items-center w-full mb-4">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setIsChecked(!isChecked)}
              >
                <View className={`w-5 h-5 border-2 rounded-sm ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} mr-2`}>
                  {isChecked && (
                    <View className="bg-white w-full h-full justify-center items-center">
                      <Text className="text-white font-bold">✓</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-400">Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-blue-500 font-bold">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin}>
              <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                <Text className="text-xl text-white">Log In</Text>
              </View>
            </TouchableOpacity>

            {/* Register Link */}
            <View className="flex-row justify-center pt-5">
              <Text className="text-gray-400">Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('register')}>
                <Text className="text-blue-500"> Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className="flex-row justify-center pt-6">
            <Text className="text-gray-400">By signing in, you agree to the</Text>
            <TouchableOpacity>
              <Text className="text-black font-bold"> Terms and Service</Text>
            </TouchableOpacity>
            <Text className="text-gray-400"> and </Text>
          </View>
          <View className="flex-row justify-center">
            <TouchableOpacity>
              <Text className="text-black font-bold">Data Processing Agreement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;