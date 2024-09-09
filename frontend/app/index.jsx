import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      router.replace('login');
    }, 5000);

    // Cleanup the timer and listener if the component is unmounted
    return () => {
      clearTimeout(timer);
      progressAnim.removeAllListeners();
    };
  }, [router, progressAnim]);

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

export default Index;
