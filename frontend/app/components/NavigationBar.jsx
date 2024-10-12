import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationBar = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState('');

    const handlePress = (item) => {
        setSelected(item);
        navigation.navigate(item);
    };

    return (
        <View style={styles.navBar}>
            {/* Home Screen */}
            <TouchableOpacity onPress={() => handlePress('HomeScreen')} style={styles.iconWrapper}>
                <View style={styles.iconContainer}>
                    <Entypo
                        name="home"
                        size={selected === 'HomeScreen' ? 28 : 25}
                        color={selected === 'HomeScreen' ? "#0A8CFF" : "#7E8C99"}
                    />
                    <Text style={[styles.text, selected === 'HomeScreen' ? styles.textSelected : styles.textDefault]}>
                        HOME
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Climate Screen */}
            <TouchableOpacity onPress={() => handlePress('WhetherScreen')} style={styles.iconWrapper}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="cloud-search"
                        size={selected === 'WhetherScreen' ? 28 : 25}
                        color={selected === 'WhetherScreen' ? "#0A8CFF" : "#7E8C99"}
                    />
                    <Text style={[styles.text, selected === 'WhetherScreen' ? styles.textSelected : styles.textDefault]}>
                        CLIMATE
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Tips Screen */}
            <TouchableOpacity onPress={() => handlePress('EventScreen')} style={styles.iconWrapper}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="head-lightbulb"
                        size={selected === 'EventScreen' ? 28 : 25}
                        color={selected === 'EventScreen' ? "#0A8CFF" : "#7E8C99"}
                    />
                    <Text style={[styles.text, selected === 'EventScreen' ? styles.textSelected : styles.textDefault]}>
                        TIPS
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Invests Screen */}
            <TouchableOpacity onPress={() => handlePress('GreenInvestmentScreen')} style={styles.iconWrapper}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="hand-coin"
                        size={selected === 'GreenInvestmentScreen' ? 28 : 25}
                        color={selected === 'GreenInvestmentScreen' ? "#0A8CFF" : "#7E8C99"}
                    />
                    <Text style={[styles.text, selected === 'GreenInvestmentScreen' ? styles.textSelected : styles.textDefault]}>
                        INVESTS
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Eco Screen */}
            <TouchableOpacity onPress={() => handlePress('ProductListScreen')} style={styles.iconWrapper}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="leaf"
                        size={selected === 'ProductListScreen' ? 28 : 25}
                        color={selected === 'ProductListScreen' ? "#0A8CFF" : "#7E8C99"}
                    />
                    <Text style={[styles.text, selected === 'ProductListScreen' ? styles.textSelected : styles.textDefault]}>
                        ECO
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#E1E8ED',
        paddingVertical: 10,
        // borderRadius: 25,
        // marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    iconWrapper: {
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },
    textDefault: {
        color: '#7E8C99',
    },
    textSelected: {
        color: '#0A8CFF',
    },
};

export default NavigationBar;
