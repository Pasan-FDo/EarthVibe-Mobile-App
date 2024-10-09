import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';


const SplashScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
   
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Set the status bar color when the screen is focused
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#1D78C3');
    });
  
    // Start the animation to fill the progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000, // 5 seconds for the progress bar to fill
      useNativeDriver: false, // Progress animation cannot use native driver
    }).start();

    // Update progress state based on animated value
    progressAnim.addListener(({ value }) => {
      setProgress(value);
    });

    // Navigate to the home page after 5 seconds
    const timer = setTimeout(() => {
     navigation.navigate('LoginScreen');
    }, 5000);

    // Cleanup the timer and listener if the component is unmounted
    return () => {
      clearTimeout(timer);
      progressAnim.removeAllListeners();
      unsubscribeFocus();
    };
  }, [progressAnim]);

  return (
    <>
    <StatusBar key={Math.random()} barStyle="light-content" backgroundColor="#1D78C3" />
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
          progress={progress}
          color={'white'}
          showsText={true}
          formatText={() => `${Math.round(progress * 100)}%`}
          textStyle={{ color: 'white', fontSize: 18 }}
        />
      </View>
    </View>
    </>
  );
};

export default SplashScreen;
