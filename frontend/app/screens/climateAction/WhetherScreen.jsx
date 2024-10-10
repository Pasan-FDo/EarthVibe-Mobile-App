import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';

const WeatherScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const apiKey = '8561cb293616fe29259448fd098f654b'; // Your OpenWeatherMap API Key
    const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in animation

    useEffect(() => {
        // Fetch current weather for the user's location when the component mounts
        getWeatherForCurrentLocation();
    }, []);

    useEffect(() => {
        // Fade-in animation when weatherData changes
        if (weatherData) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [weatherData]);
// Function to determine gradient colors based on weather condition
const getGradientColors = () => {
    if (!weatherData) return ['#2980B9', '#6DD5FA']; // Default gradient

    const condition = weatherData.weather[0].main.toLowerCase();
    switch (condition) {
        case 'clear':
            return ['#FF7300', '#FEF253'];
        case 'rain':
            return ['#00C6FB', '#005BEA'];
        case 'clouds':
            return ['#D7D2CC', '#304352'];
        case 'snow':
            return ['#7DE2FC', '#B9B6E5'];
        case 'thunderstorm':
            return ['#373B44', '#4286f4'];
        case 'drizzle':
            return ['#89F7FE', '#66A6FF'];
        default:
            return ['#2980B9', '#6DD5FA'];
    }
};
    // Function to fetch weather data by city name
    const fetchWeatherData = async (city) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeatherData(response.data);
            fetchForecastData(response.data.coord.lat, response.data.coord.lon); // Fetch forecast for the same location
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('City not found. Please try another search.');
        }
        setLoading(false);
    };

    // Function to fetch forecast data by latitude and longitude
    const fetchForecastData = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
            );
            setForecastData(response.data.list);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    // Function to get the weather for the current location
    const getWeatherForCurrentLocation = async () => {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationPermissionDenied(true);
            setLoading(false);
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        fetchWeatherByLocation(latitude, longitude);
    };

    // Function to fetch weather data by latitude and longitude (for current location)
    const fetchWeatherByLocation = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
            );
            setWeatherData(response.data);
            fetchForecastData(lat, lon);
        } catch (error) {
            console.error('Error fetching weather data by location:', error);
        }
        setLoading(false);
    };

    // Handle the search query and fetch weather data
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            fetchWeatherData(searchQuery);
        }
    };

   

    // Function to select appropriate Lottie animation based on weather condition
    const getWeatherAnimation = () => {
        if (!weatherData) return require('../../assets/animations/cloudy.json'); // Default animation

        const condition = weatherData.weather[0].main.toLowerCase();
        console.log("weather change================",condition);
        switch (condition) {
            case 'clear':
                return require('../../assets/animations/sunny.json');
            case 'rain':
                return require('../../assets/animations/rainy.json');
            case 'clouds':
                return require('../../assets/animations/cloudy.json');
            case 'snow':
                return require('../../assets/animations/cloudy.json');
            case 'thunderstorm':
                return require('../../assets/animations/cloudy.json');
            case 'drizzle':
                return require('../../assets/animations/cloudy.json');
            default:
                return require('../../assets/animations/cloudy.json');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
             <LinearGradient colors={getGradientColors()} style={styles.gradient}>
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                   <Header title="Climate" image={require('../../assets/images/profile.png')}/>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchInput}>
                            <Entypo name="magnifying-glass" size={20} color="#666" />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={handleSearch}
                                returnKeyType="search"
                            />
                        </View>
                        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                            <Entypo name="magnifying-glass" size={28} color="white" />
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
                    ) : (
                        <>
                            {/* Weather Animation */}
                            {weatherData && (
                                <View style={styles.animationContainer}>
                                    <LottieView
                                        source={getWeatherAnimation()}
                                        autoPlay
                                        loop
                                        style={styles.lottie}
                                    />
                                </View>
                            )}

                            {/* Main Weather Info with Fade-In Animation */}
                            {weatherData && (
                                <Animated.View style={[styles.weatherInfo, { opacity: fadeAnim }]}>
                                    <Text style={styles.temperature}>
                                        {weatherData.main.temp}°C
                                    </Text>
                                    <Text style={styles.location}>
                                        {weatherData.name}, {weatherData.sys.country}
                                    </Text>
                                    <Text style={styles.date}>
                                        {new Date().toLocaleTimeString()} {'\n'}
                                        {new Date().toLocaleDateString()}
                                    </Text>
                                </Animated.View>
                            )}

                            {/* Weather Details */}
                            {weatherData && (
                                <View style={styles.detailsContainer}>
                                    <View style={styles.detailItem}>
                                        <MaterialCommunityIcons name="weather-windy" size={30} color="#fff" />
                                        <Text style={styles.detailText}>{weatherData.wind.speed} km/h</Text>
                                        <Text style={styles.detailLabel}>Wind</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <MaterialCommunityIcons name="water-percent" size={30} color="#fff" />
                                        <Text style={styles.detailText}>{weatherData.main.humidity}%</Text>
                                        <Text style={styles.detailLabel}>Humidity</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <MaterialCommunityIcons name="weather-rainy" size={30} color="#fff" />
                                        <Text style={styles.detailText}>{weatherData.clouds.all}%</Text>
                                        <Text style={styles.detailLabel}>Cloudiness</Text>
                                    </View>
                                </View>
                            )}

                            {/* Forecast Section */}
                            {forecastData.length > 0 && (
                                <View style={styles.forecastContainer}>
                                    <TouchableOpacity style={styles.forecastHeader}>
                                        <Entypo name="chevron-up" size={20} color="white" />
                                        <Text style={styles.forecastHeaderText}>7 Day Forecast</Text>
                                    </TouchableOpacity>

                                    {/* Forecast Cards */}
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
                                        {forecastData.slice(0, 7).map((forecast, index) => (
                                            <View key={index} style={styles.forecastCard}>
                                                <Text style={styles.forecastDate}>
                                                    {new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
                                                </Text>
                                                <MaterialCommunityIcons
                                                    name={getWeatherIcon(forecast.weather[0].main)}
                                                    size={30}
                                                    color="#fff"
                                                />
                                                <Text style={styles.forecastTemp}>{Math.round(forecast.main.temp)}°C</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </>
                    )}
                </ScrollView>

                {/* Navigation Bar */}
                <View style={styles.navBar}>
                    <NavigationBar navigation={navigation} />
                </View>
                </LinearGradient>
        </SafeAreaView>
    );
};

// Helper function to get appropriate weather icons
const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
        case 'clear':
            return 'weather-sunny';
        case 'rain':
            return 'weather-rainy';
        case 'clouds':
            return 'weather-cloudy';
        case 'snow':
            return 'weather-snowy';
        case 'thunderstorm':
            return 'weather-lightning';
        case 'drizzle':
            return 'weather-hail';
        default:
            return 'weather-partly-cloudy';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 32,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 15,
        flex: 1,
        marginRight: 10,
    },
    textInput: {
        marginLeft: 10,
        flex: 1,
        color: '#fff',
    },
    searchButton: {
        backgroundColor: '#1D78C3',
        padding: 10,
        borderRadius: 25,
    },
    animationContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    lottie: {
        width: 150,
        height: 150,
    },
    weatherInfo: {
        alignItems: 'center',
        marginVertical: 20,
    },
    temperature: {
        fontSize: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    location: {
        fontSize: 20,
        color: '#fff',
    },
    date: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    detailItem: {
        alignItems: 'center',
    },
    detailText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 5,
    },
    detailLabel: {
        color: '#ddd',
        fontSize: 12,
        marginTop: 2,
    },
    forecastContainer: {
        marginTop: 20,
    },
    forecastHeader: {
        backgroundColor: 'rgba(29, 120, 195, 0.7)',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forecastHeaderText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 5,
    },
    forecastScroll: {
        marginTop: 10,
        paddingLeft: 20,
    },
    forecastCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginRight: 15,
        width: 100,
    },
    forecastDate: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },
    forecastTemp: {
        color: '#fff',
        fontSize: 16,
        marginTop: 5,
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default WeatherScreen;
