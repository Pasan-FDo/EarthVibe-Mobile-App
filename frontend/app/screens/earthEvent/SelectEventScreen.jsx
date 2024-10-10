import React, {useState} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const SelectEventScreen = ({route, navigation}) => {
    const { event } = route.params;
    const [activeIndex, setActiveIndex] = useState(0);
   
    const images = [
        require('../../assets/images/greenInvestment/greenInvest.png'),  // Add more images if you have
        require('../../assets/images/greenInvestment/greenInvest.png'),
    ];

    const handleSnapToItem = (index) => {
        setActiveIndex(index); // Update active index when a new slide is displayed
    };
    // Navigation function for location icon
    const handleLocationPress = () => {
        // Navigate to the LocationDetailsScreen and pass location details
        navigation.navigate('LocationDetailsScreen', {
            location: {
                title: 'Town hall, Colombo', // Example location title
                lat: 6.9271,  // Example latitude (replace with actual data)
                lng: 79.9612, // Example longitude (replace with actual data)
            },
        });
    };
    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <Header title="Events" image={require('../../assets/images/profile.png')}/>
    
                     {/* Carousel Section */}
                     <View style={{ flex: 1 }}>
            {/* Carousel Section */}
            <View style={{ width: '100%', marginVertical: 20, alignItems: 'center' }}>
                <Carousel
                    width={screenWidth * 0.9} // Slightly smaller than full width for better spacing
                    height={screenWidth * 0.55} // Slightly less height for a sleeker look
                    style={{ borderRadius: 15 }}
                    data={images}
                    renderItem={({ item }) => (
                        <View style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            elevation: 10,
                            borderRadius: 15,
                        }}>
                            <Image
                                source={item}
                                style={{
                                    width: '100%',
                                    height: screenWidth * 0.55, // Same height as the carousel container
                                    borderRadius: 15,
                                    resizeMode: 'cover', // Ensures image fits well within bounds
                                }}
                            />
                        </View>
                    )}
                    onSnapToItem={handleSnapToItem} // Track active slide index
                    loop={true} // Loop the carousel for continuous scrolling
                />

                {/* Dots Pagination */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: activeIndex === index ? 12 : 8,
                                height: activeIndex === index ? 12 : 8,
                                borderRadius: 6,
                                backgroundColor: activeIndex === index ? '#1D78C3' : '#ccc',
                                marginHorizontal: 4,
                            }}
                        />
                    ))}
                </View>
            </View>
        </View>
                <View className="mt-[-15px] p-4 bg-white rounded-t-[10px]">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold mb-2">{event.title}</Text>

                        <View className="flex-row items-center">
                            <View className="flex-row items-center mr-4">
                                <Entypo name="share" size={20} color="gray" />
                            </View>
                            <View className="flex-row items-center mr-4">
                                <TouchableOpacity onPress={handleLocationPress}>
                                <Entypo name="location" size={20} color="red" />
                                </TouchableOpacity>
                               
                            </View>
                          
                        </View>
                    </View>
                    <View className="flex-row items-center mb-2">
                    <Text className="font-semibold text-gray-700 text-sm mr-4 ">Participents : </Text>
                    <View className="flex-row  items-center">
                            
                            <FontAwesome6 name="people-group" size={15} color="gray" />
                            <Text className="text-gray-700 font-normal text-sm">13</Text>
                        </View>
                        </View>
                    <View className="flex-row items-center mb-2">
                    <Text className="font-semibold text-gray-700 text-sm mr-5 ">Location : </Text>
                    <Text className="font-normal text-gray-700 text-sm mr-5 ">Town hall, Colombo</Text>
                    </View>

                    <View className="flex-row items-center mb-2">
                    <Text className="font-semibold text-gray-700 text-sm mr-5 ">Time : </Text>
                    <Text className="font-normal text-gray-700 text-sm mr-5 ">10.30AM - 1.00PM </Text>
                    </View>
                    
                    <Text className="text-sm text-gray-700 mt-5 ">{event.description}</Text>
                    <Text className="text-gray-500 pt-3 text-right">20/01/2025</Text>
                </View>
                <View className="bottom-0 left-0 right-0 px-6 py-4 bg-white flex-row justify-between">
                <TouchableOpacity className="flex-1 mr-2" onPress={()=>navigation.navigate('EventFormScreen')}>
                    <View className="bg-gray-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Register</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 ml-2" onPress={handleLocationPress}>
                    <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Location</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
};

export default SelectEventScreen;
