import { View, Text, SafeAreaView, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

function LoginScreen({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#1D78C3" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ImageBackground 
          style={{ width: width, height: '110%', position: 'absolute' }} 
          source={require('../assets/images/loginbg.png')} 
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
          <Image 
            style={{ width: width * 0.45, height: height * 0.22, marginBottom: 10 }} 
            source={require('../assets/images/EarthVibeLogo.png')} 
          />
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Sign in to your</Text>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Account</Text>
          <Text style={{ color: 'white', marginTop: 5, marginBottom: 20 }}>Enter your email and password to log in</Text>

          <View style={{ backgroundColor: 'white', borderRadius: 10, width: '100%', padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 }}>
            <TextInput
              style={{
                backgroundColor: '#f3f4f6',
                borderRadius: 6,
                padding: 10,
                borderWidth: 1,
                borderColor: '#d1d5db',
                marginBottom: 16,
              }}
              placeholder="Enter email"
              placeholderTextColor="#a1a1aa"
            />
            <TextInput
              style={{
                backgroundColor: '#f3f4f6',
                borderRadius: 6,
                padding: 10,
                borderWidth: 1,
                borderColor: '#d1d5db',
                marginBottom: 16,
              }}
              placeholder="Password"
              placeholderTextColor="#a1a1aa"
              secureTextEntry
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setIsChecked(!isChecked)}>
                <View 
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderRadius: 3,
                    borderColor: isChecked ? '#1D78C3' : '#d1d5db',
                    backgroundColor: isChecked ? '#1D78C3' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 8,
                  }}
                >
                  {isChecked && <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>}
                </View>
                <Text style={{ color: '#6b7280', fontSize:12 }}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: '#1D78C3', fontWeight: 'bold', fontSize:12 }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <View style={{ backgroundColor: '#1D78C3', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
              <Text style={{ color: '#6b7280' }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{ color: '#1D78C3', fontWeight: 'bold' }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
            <Text style={{ color: '#6b7280', fontSize:10 }}>By signing up, you agree to the </Text>
            <Text style={{ fontWeight: 'bold', fontSize:10 }}>Terms and Service</Text>
            <Text style={{ color: '#6b7280', fontSize:10 }}> and </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:10 }}>
            <Text style={{ fontWeight: 'bold',fontSize:12 }}>Data Processing Agreement</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
