import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { firebase } from '../../config'; // Make sure firebase is imported properly
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; // Ensure location is imported

const SplashScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [userDistrict, setUserDistrict] = useState('');
  const [Locdistrict, setLocDistrict] = useState('');
  const [disaster, setDisaster] = useState([]);

  const fetchUserDetails = async () => {
    const district = await AsyncStorage.getItem('District');
    setUserDistrict(district || ''); // Set user district or empty string
  };

  const getLiveLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address.length > 0) {
      const userDistrict = address[0].subregion || address[0].district || 'District not found';
      setLocDistrict(userDistrict);
    } else {
      console.log('No address found');
    }
  };

  const getLoginDistrict = async () => {
    try {
      let query = firebase.firestore().collection('Disaster');
      const conditions = [];

      if (userDistrict) {
        conditions.push(query.where('location', '==', userDistrict));
      }

      if (Locdistrict) {
        conditions.push(query.where('location', '==', Locdistrict));
      }

      let commentsData = [];
      for (const condition of conditions) {
        const snapshot = await condition.get();
        commentsData.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      const uniqueComments = Array.from(new Set(commentsData.map(a => a.id)))
        .map(id => commentsData.find(a => a.id === id));

      setDisaster(uniqueComments);
      console.log(disaster);
      

      if (uniqueComments.length === 0) {
        console.log('No disaster found, you are safe!');
      }
    } catch (error) {
      console.log('Error fetching disaster data:', error);
    }
  };

  const SplashNavigation = async () => {
    const userName = await AsyncStorage.getItem('UserName');
    if (userName) {
      console.log(userName);
      
      if (disaster.length > 0) {
        navigation.navigate('DisasterAlertScreen');
      } else {
        navigation.navigate('ClimateNetworkScreen');
      }
    } else {
      navigation.navigate('Nav');
    }
  }

  useEffect(() => {
    const loadData = async () => {
        fetchUserDetails(); // Fetch user district
       getLiveLocation();  // Get location-based district
       getLoginDistrict(); // Fetch disaster data based on districts
    };

    loadData();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 10000, // 5 seconds for the progress bar to fill
      useNativeDriver: false, // Progress animation cannot use native driver
    }).start();

    progressAnim.addListener(({ value }) => {
      setProgress(value);
    });

    const timer = setTimeout(() => {
      SplashNavigation(); // Navigate after progress completes
    }, 10000);

    return () => {
      clearTimeout(timer);
      progressAnim.removeAllListeners();
    };
  }, [userDistrict, Locdistrict]); // Watch for changes in disaster data, userDistrict, and Locdistrict

  return (
    <View className="flex-1 bg-[#1D78C3] justify-center items-center">
      <View className="mb-4">
        <Image source={require('../assets/images/EarthVibeLogo.png')} />
      </View>

      <View className="mb-4">
        <Text className="text-white text-center font-bold text-4xl">
          Earth-Vibe
        </Text>
      </View>

      <View className="flex items-center justify-center mt-16">
        <Progress.Circle
          size={80}
          progress={progress} // Animated progress value
          color={'white'}
          showsText={true}
          formatText={() => `${Math.round(progress * 100)}%`} // Display percentage
          textStyle={{ color: 'white', fontSize: 18 }}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
