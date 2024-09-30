import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import GreenInvetmentCard from '../../components/CilmateNetworkCard';

const ClimateNetworkScreen = ({navigation}) => {
    const DataArray = [
        {
            _id: "1",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Flooding",
            location: "Kelani River Basin",
            description: "Heavy rainfall has caused severe flooding in the Kelani River basin, displacing thousands and damaging homes and infrastructure."
        },
        {
            _id: "2",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Cyclone",
            location: "Eastern Coastline",
            description: "A tropical cyclone hit the eastern coastline, bringing destructive winds and heavy rainfall, causing widespread devastation to communities."
        },
        {
            _id: "3",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Wildfire",
            location: "Knuckles Mountain Range",
            description: "Prolonged drought has led to wildfires spreading through the Knuckles Mountain Range, threatening wildlife and ecosystems."
        },
        {
            _id: "4",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Landslide",
            location: "Badulla District",
            description: "Continuous heavy rains triggered landslides in the Badulla district, burying homes and leading to numerous casualties and displaced residents."
        },
        {
            _id: "5",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Drought",
            location: "Northern Province",
            description: "A severe drought has hit the Northern Province, leading to water shortages, crop failure, and a humanitarian crisis in affected areas."
        }
    ];


    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-4">
                        <Text className="text-xl text-center text-white font-bold ">Climate Network</Text>
                        <Image
                            source={require('../../assets/images/profile.png')}
                            className="w-12 h-12 rounded-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View className="mt-8 px-4">
                    {DataArray.map((item) => (
                        <GreenInvetmentCard data={item} />
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    )
}

export default ClimateNetworkScreen;