import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import GreenInvetmentCard from '../../components/GreenInvetmentCard';
import NavigationBar from '../../components/NavigationBar';

const GreenInvestmentScreen = ({navigation}) => {
    const DataArray = [
        {
            _id:"1",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Solar Energy",
            description: "Energy from the sun powers homes, buildings, and a variety of other items from lights to radios. Focus your attention on companies that make ..."
        },
        {
            _id:"2",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Wind Energy",
            description: "Wind energy is a growing source of renewable energy. Explore companies that manufacture wind turbines and develop wind farms."
        },
        {
            _id:"3",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Hydro Power",
            description: "Water is used to generate power in many parts of the world. Learn more about companies that use water sources to generate electricity."
        },
        {
            _id:"4",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "Geothermal Energy",
            description: "Geothermal energy comes from the earth's internal heat. It is a renewable resource that companies are investing in for a sustainable future."
        },
        {
            _id:"5",
            image: require('../../assets/images/greenInvestment/greenInvest.png'),
            title: "BioEnergy",
            description: "BioEnergy refers to the use of biomass to generate energy. Companies are focusing on using organic materials like wood and crops for fuel."
        },
    ];

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View className="bg-[#1D78C3]">
                    <View className="flex-row justify-between items-center px-6 py-8">
                        <Text className="text-3xl text-center ml-6 text-white font-bold">Green Investment</Text>
                        <Image
                            source={require('../../assets/images/profile.png')}
                            className="w-14 h-14 rounded-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View className="mt-8 px-4">
                {DataArray.map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={()=> navigation.navigate('InvestmentFormScreen')}
                            // onPress={() => router.push({ pathname: `/selectGreenInvestment`, params: item})}
                        >
                            <GreenInvetmentCard data={item} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar/>
            </View>
        </SafeAreaView>
    );
};

export default GreenInvestmentScreen;
