import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationBar = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(''); // Default to 'HomeScreen'

    const handlePress = (item) => {
        setSelected(item);
        navigation.navigate(item);
    };

    return (
        <View className="flex-row justify-between items-center bg-[#D9D9D9] py-3">
            {/* Home Screen */}
            <TouchableOpacity onPress={() => handlePress('HomeScreen')}>
                <View className="flex items-center ml-3">
                    <Entypo name="home" size={25} color={selected === 'HomeScreen' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'HomeScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'} text-xs`}>
                        HOME
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Climate Screen */}
            <TouchableOpacity onPress={() => handlePress('ClimateNetworkScreen')}>
                <View className="flex items-center">
                    <MaterialCommunityIcons name="weather-partly-lightning" size={25} color={selected === 'ClimateScreen' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'ClimateNetworkScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'} text-xs`}>
                        CLIMATE
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Tips Screen */}
            <TouchableOpacity onPress={() => handlePress('SelectTipsScreen')}>
                <View className="flex items-center">
                    <MaterialCommunityIcons name="head-lightbulb" size={25} color={selected === 'SelectTipsScreen' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'SelectTipsScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'} text-xs`}>
                        TIPS
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Invests Screen */}
            <TouchableOpacity onPress={() => handlePress('GreenInvestmentScreen')}>
                <View className="flex items-center">
                    <MaterialCommunityIcons name="hand-coin" size={25} color={selected === 'GreenInvestmentScreen' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'GreenInvestmentScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'} text-xs`}>
                        INVESTS
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Eco Screen */}
            <TouchableOpacity onPress={() => handlePress('EcoScreen')}>
                <View className="flex items-center pr-3">
                    <MaterialCommunityIcons name="leaf" size={25} color={selected === 'EcoScreen' ? "#1D78C3" : "#4F4F4F"} />
                    <Text className={`text-center font-semibold ${selected === 'EcoScreen' ? 'text-[#1D78C3]' : 'text-[#4F4F4F]'} text-xs`}>
                        ECO
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default NavigationBar;
