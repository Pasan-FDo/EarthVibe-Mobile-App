import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Header from '../../components/Header';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Import the DateTimePicker component

const EventFormScreen = ({navigation}) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

            <Header title="Register the Event" image={require('../../assets/images/profile.png')}/>
                <View className="bg-white flex-1">
                    <View className="mr-6 ml-6 mt-5 flex-1">
                        <Text className="py-4 text-[#1D78C3]">Fill This Form To Post Event</Text>

                        <View>
                            <Text className="text-gray-500 mb-2">Main Title</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Title'
                            />
                        </View>

                        <View>
                            <Text className="text-gray-500 mb-2">Description</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-4 w-full h-[150px] border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Type Description'
                                multiline
                                numberOfLines={5}
                                style={{ paddingTop: 10, paddingLeft: 10 }} // Adjust padding to position placeholder
                            />
                        </View>

                        {/* Uncomment and use DateTimePicker if needed */}
                        {/* <View>
                            <Text className="text-gray-500 mb-2">Date</Text>
                            <TouchableOpacity onPress={() => setShow(true)} className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4">
                                <Text>{date.toDateString()}</Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View> */}

                        <View>
                            <Text className="text-gray-500 mb-2">Date</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='dd/mm/yyyy'
                            />
                        </View>
                        <View>
                            <Text className="text-gray-500 mb-2">Time</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='10 : 00'
                            />
                        </View>
                        <View>
                            <Text className="text-gray-500 mb-2">Location</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Adress Here'
                            />
                        </View>
                        <View>
                            <Text className="text-gray-500 mb-2">Picture</Text>
                            <TextInput
                                className="bg-gray-100 rounded-[6px] pl-4 pt-2 pb-2 w-full border border-gray-300 focus:bg-white focus:border-[#1D78C3] focus:ring-2 focus:ring-[#1D78C3] outline-none text-gray-800 mb-4"
                                placeholderTextColor="#a1a1aa"
                                placeholder='Add Photo URL, separated By Commas'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white flex-row justify-between">
                <TouchableOpacity className="flex-1 mr-2">
                    <View className="bg-gray-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Cancel</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 ml-2" onPress={()=>navigation.navigate('EventPostScreen')}>
                    <View className="bg-blue-500 flex justify-center items-center h-12 rounded-[10px]">
                        <Text className="text-xl text-white">Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EventFormScreen;
