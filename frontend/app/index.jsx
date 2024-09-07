import { View, Text, Image, Animated as RNAnimated } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const scale = useSharedValue(1);
  const opacityText = useSharedValue(1);
  const opacityProgress = useSharedValue(1);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 1) {
          return prevProgress + 0.02;
        }
        return prevProgress;
      });
    }, 100);

    if (progress >= 1) {
      scale.value = withTiming(3, { duration: 1000 }, () => {
        // Animate text and progress bar opacity to vanish
        opacityText.value = withTiming(0, { duration: 500 });
        opacityProgress.value = withTiming(0, { duration: 500 }, () => {
          // Navigate after animations are complete
        //   navigation.navigate('Home');  // Replace 'Home' with your target route name
        });
      });
    }

    return () => clearInterval(interval);
    }, [progress]);

    const percentage = Math.round(progress * 100);

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: opacityText.value,
        transform: [{ translateY: withTiming(50, { duration: 500 }) }]
    }));

    const animatedProgressStyle = useAnimatedStyle(() => ({
        opacity: opacityProgress.value
    }));

  return (
    <View className="flex-1 bg-[#1D78C3] justify-center items-center">
      <View>
        <Animated.View style={animatedImageStyle}>
          <Image source={require('../assets/images/EarthVibeLogo.png')} />
        </Animated.View>

        <Animated.View style={animatedTextStyle}>
          <Text className="text-white text-center font-bold text-4xl">
            Earth-Vibe
          </Text>
        </Animated.View>

        <View className="mt-">
        <Animated.View style={animatedProgressStyle} className="flex items-center justify-center mt-16">
          <Progress.Circle
            size={80}
            progress={progress}
            color={'white'}
            showsText={true}
            formatText={() => `${percentage}%`}
            textStyle={{ color: 'white', fontSize: 18 }}
          />
        </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Index;
