import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import ClimateNewsListCard from '../../components/ClimateNewsListCard';
import EventPostCard from '../../components/EventPostCard';
import Header from '../../components/Header';

const InvestmentListScreen = ({navigation}) => {
    const DataArray = [
        {
            _id: "1",
            title: "Tree Planting Drive",
            location: "Central Highlands",
            description: "Join us in restoring native forests by planting over 10,000 trees in the Central Highlands. Volunteers will receive training on sustainable reforestation and biodiversity conservation.",
            date: "2024-10-15",
            organizer: "Green Earth Initiative",
        },
        {
            _id: "2",
            title: "Renewable Energy Expo",
            location: "Colombo Convention Center",
            description: "Explore the latest innovations in solar, wind, and hydropower technologies at the Renewable Energy Expo. Engage with industry experts, attend workshops, and discover sustainable energy solutions.",
            date: "2024-11-22",
            organizer: "Sustainable Energy Coalition",
        },
        {
            _id: "3",
            title: "Coastal Cleanup Campaign",
            location: "Negombo Beach",
            description: "Join hands with local communities to clean up the coastline and protect marine life. This event aims to reduce ocean pollution and raise awareness about the importance of clean oceans.",
            date: "2024-09-30",
            organizer: "Ocean Guardians",
        },
        {
            _id: "4",
            title: "Climate Change Awareness Workshop",
            location: "Jaffna University",
            description: "This workshop will focus on educating participants about climate change, its impact on local communities, and strategies for adaptation and mitigation. Open to students and the public.",
            date: "2024-12-05",
            organizer: "Climate Action Network",
        },
        {
            _id: "5",
            title: "Sustainable Agriculture Conference",
            location: "Kandy Agricultural Institute",
            description: "Farmers, researchers, and policymakers are invited to discuss sustainable farming techniques and climate-smart agriculture practices that reduce carbon footprints and ensure food security.",
            date: "2024-10-25",
            organizer: "AgroFuture Foundation",
        }
    ];
    

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Header title="Investment list" image={require('../../assets/images/profile.png')}/>
                <View className="mt-8 px-4">
                    {DataArray.map((item) => (
                        <EventPostCard key={item._id} data={item} />
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
};

export default InvestmentListScreen;
