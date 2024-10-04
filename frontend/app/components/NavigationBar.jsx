import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationBar = ({navigation}) => {
    const [selected, setSelected] = useState('home'); // Default to 'home'

    const handlePress = (item) => {
        setSelected(item);
        navigation.navigate(item)
    };

    return (
        <View className="flex-row justify-between items-center bg-[#D9D9D9] py-3">
            <TouchableOpacity onPress={() => handlePress('ClimateNetworkScreen')}>
                <View className="flex items-center ml-3">
                    <Entypo name="home" size={40} color={selected === 'ClimateNetworkScreen' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'ClimateNetworkScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'}`}>
                        HOME
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View className="flex items-center">
                    <MaterialCommunityIcons name="weather-partly-lightning" size={40} color={selected === 'climate' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'climate' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'}`}>
                        CLIMATE
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('EventScreen')}>
                <View className="flex items-center">
                    <Image source={require("../assets/images/navTips.png")} style={{width: 40, height: 40, tintColor: selected === 'EventScreen' ? "#1D78C3" : "#4F4F4F"}} />
                    <Text className={`text-center font-semibold ${selected === 'EventScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'}`}>
                        TIPS
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View className="flex items-center">
                    <Image source={require("../assets/images/navInvest.png")} style={{width: 40, height: 40, tintColor: selected === 'invests' ? "#1D78C3" : "#4F4F4F"}} />
                    <Text className={`text-center font-semibold ${selected === 'invests' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'}`}>
                        INVESTS
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View className="flex items-center pr-3">
                    <Image source={require("../assets/images/navEco.png")} style={{width: 40, height: 40, tintColor: selected === 'eco' ? "#1D78C3" : "#4F4F4F"}} />
                    <Text className={`text-center font-semibold ${selected === 'eco' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'}`}>
                        ECO
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default NavigationBar;
