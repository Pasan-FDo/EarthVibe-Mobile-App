import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import EventPostCard from '../../components/EventPostCard';
import Header from '../../components/Header';
import TipsListCard from '../../components/TipsListCard';

const TipsListScreen = ({navigation}) => {
    const DataArray = [
        {
            _id: "1",
            title: "Keep Your Veggies Fresh Longer",
            category: "Kitchen Hacks",
            description: "Store leafy greens in a paper towel and seal them in a ziplock bag to absorb moisture and extend freshness by several days.",
            tip: "Use a dry paper towel to line the bottom of the container before adding your vegetables.",
        },
        {
            _id: "2",
            title: "Easy Way to Clean Microwave",
            category: "Cleaning Tips",
            description: "Place a bowl of water with lemon slices inside the microwave and heat it for 5 minutes. The steam loosens grime, and the lemon leaves a fresh scent.",
            tip: "Use a damp cloth to easily wipe away the softened grease and food particles afterward.",
        },
        {
            _id: "3",
            title: "Organize Cables with Toilet Paper Rolls",
            category: "Organization",
            description: "Use empty toilet paper rolls to store cables and prevent them from tangling. Simply fold the cable and slip it inside the roll.",
            tip: "Label the rolls with a marker to easily identify each cable when needed.",
        },
        {
            _id: "4",
            title: "Quickly Chill Drinks",
            category: "Food & Drink",
            description: "Wrap a wet paper towel around your drink and place it in the freezer for 10-15 minutes. Your drink will chill much faster than usual.",
            tip: "Keep a close eye to avoid freezing the drink by accident.",
        },
        {
            _id: "5",
            title: "Remove Scratches from Wood Furniture",
            category: "Home Improvement",
            description: "Rub a walnut on scratched wooden surfaces. The natural oils from the nut will help fill the scratch and make it less noticeable.",
            tip: "Buff the area gently with a soft cloth after applying the walnut oil for a smoother finish.",
        }
    ];
    
    

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Header title="Event list" image={require('../../assets/images/profile.png')}/>
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

export default TipsListScreen;
