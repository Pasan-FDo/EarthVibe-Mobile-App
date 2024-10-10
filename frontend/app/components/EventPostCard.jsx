import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width: screenWidth } = Dimensions.get('window');

const EventPostCard = ({ data }) => {
    return (
        <View
            style={{
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
                elevation: 5, // For Android
                backgroundColor: 'white',
                borderRadius: 15,
                marginBottom: 24, // 6% of screen width
            }}
        >
            <View
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    padding: screenWidth * 0.05, // 5% padding relative to screen width
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontWeight: '600',
                        fontSize: screenWidth * 0.05, // 5% for title
                    }}
                >
                    {data.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Text style={{ color: 'gray', marginLeft: 2, fontSize: screenWidth * 0.04 }}>
                        {data.description.slice(0, 80)}...
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ color: 'gray', marginLeft: 2, fontSize: screenWidth * 0.035 }}>
                        20/15/2022
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        {/* Edit button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#C7F0D8',
                                marginHorizontal: 4,
                                borderRadius: 10,
                                padding: screenWidth * 0.03, // Responsive padding
                            }}
                        >
                            <AntDesign name="edit" size={20} color="black" />
                        </TouchableOpacity>

                        {/* Delete button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F5C6CB',
                                marginHorizontal: 4,
                                borderRadius: 10,
                                padding: screenWidth * 0.03, // Responsive padding
                            }}
                        >
                            <AntDesign name="delete" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EventPostCard;
