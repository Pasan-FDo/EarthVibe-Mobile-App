import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DisasterAllertCard from '../../components/DisasterAllertCard'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../components/NavigationBar';


const DisasterAlertScreen = ({navigation}) => {
    const [disaster,setDisaster]= useState({
        _id: "1",
        image: require('../../assets/images/greenInvestment/greenInvest.png'),
        title: "Flooding",
        location: "Kelani River Basin",
        description: "Heavy rainfall has caused severe flooding in the Kelani River basin, displacing thousands and damaging homes and infrastructure."
    })
    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-center items-center px-6 py-4">
                        <Text className="text-3xl  text-white font-bold">Disaster Alert</Text>
                    </View>
                </View>
                <View className="px-4 py-4">
                    <View className=" flex-row items-center justify-center bg-[#E4F400] px-1 py-2 rounded-[10px]">
                        <FontAwesome name="warning" size={20} color="#E10000" />
                        <Text className="text-2xl text-[#E10000] font-bold ml-3">You are in dangerous zone !</Text>
                    </View>
                </View>
                {/* <View className="mt-8 px-4">
        {DataArray.map((item) => (
                    <GreenInvetmentCard data={item} />
            ))}
        </View> */}
                <View className="flex px-6 py-4">
                    <DisasterAllertCard data={disaster} />
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    )
}

export default DisasterAlertScreen;