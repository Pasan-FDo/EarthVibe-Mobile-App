import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import NavigationBar from '../../components/NavigationBar';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import EventCard from '../../components/EventCard';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
                <Header title="Event & Tips" image={require('../../assets/images/profile.png')}/>
                <View className="flex-row justify-start items-center">
                <Text className="text-lg text-black font-semibold py-2 px-6">Recent Events</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('EventFormScreen')}>
                        <Icon name="folder-plus" size={22} color="#1D78C3" />
                    </TouchableOpacity>
                </View>
               
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row px-4 py-4">
                        {
                            EventArray.map((event) => (
                                <TouchableOpacity key={event._id} onPress={()=> navigation.navigate('SelectEventScreen',{event})}>
                                    <View className="px-4">
                                        <Image className="w-32 h-32" source={event.image} />
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
                <View className="flex-row items-center">
                <Text className="text-lg text-black font-semibold py-2 px-6">Recent life hacks and tips</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('TipsFormScreen')}>
                        <Icon name="folder-plus" size={22} color="#1D78C3" />
                    </TouchableOpacity>

                </View>
               


                <View className="mt-4 px-4">
                    {DataArray.map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            // onPress={() => router.push({ pathname: `/selectTips`, params: item })}
                            onPress={()=> navigation.navigate('SelectTipsScreen',{item})}
                        >
                            <EventCard data={item} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
};

export default EventScreen;