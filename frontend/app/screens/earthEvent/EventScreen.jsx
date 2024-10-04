import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import NavigationBar from '../../components/NavigationBar';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import EventCard from '../../components/EventCard';

const EventScreen = ({navigation}) => {
    const router = useRouter()
    const DataArray = [
        {
            _id: "1",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Solar Energy",
            description: "Energy from the sun powers homes, buildings, and a variety of other items from lights to radios. Focus your attention on companies that make ..."
        },
        {
            _id: "2",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Wind Energy",
            description: "Wind energy is a growing source of renewable energy. Explore companies that manufacture wind turbines and develop wind farms."
        },
        {
            _id: "3",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Hydro Power",
            description: "Water is used to generate power in many parts of the world. Learn more about companies that use water sources to generate electricity."
        },
        {
            _id: "4",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."
        },
        {
            _id: "5",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "BioEnergy",
            description: "BioEnergy refers to the use of biomass to generate energy. Companies are focusing on using organic materials like wood and crops for fuel."
        },

    ];

    const EventArray = [
        {
            _id: "1",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
        {
            _id: "2",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
        {
            _id: "3",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
        {
            _id: "4",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
        {
            _id: "5",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
        {
            _id: "5",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
        {
            _id: "6",
            image: require('../../assets/images/earthEvent/event.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."

        },
    ]

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-8">
                        <Text className="text-3xl text-center ml-6 pl-[25%] text-white font-bold">Event</Text>
                        <Image
                            source={require('../../assets/images/profile.png')}
                            className="w-14 h-14 rounded-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <Text className="text-lg text-black font-semibold py-2 px-6">Recent Events</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row px-4 py-4">
                        {
                            EventArray.map((event) => (
                                <TouchableOpacity key={event._id} onPress={()=>router.push({ pathname: `/SelectEvent`, params: event })}>
                                    <View className="px-4">
                                        <Image className="w-32 h-32" source={event.image} />
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
                <Text className="text-lg text-black font-semibold py-2 px-6">Recent life hacks and tips</Text>


                <View className="mt-4 px-4">
                    {DataArray.map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => router.push({ pathname: `/selectTips`, params: item })}
                        >
                            <EventCard data={item} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
};

export default EventScreen;