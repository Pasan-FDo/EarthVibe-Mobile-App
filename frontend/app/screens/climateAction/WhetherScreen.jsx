import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as Location from 'expo-location';

const WeatherScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const apiKey = '8561cb293616fe29259448fd098f654b'; // Your OpenWeatherMap API Key

    useEffect(() => {
        // Fetch current weather for the user's location when the component mounts
        getWeatherForCurrentLocation();
    }, []);

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
            console.log(response.data);
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

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header */}
                <View className="bg-[#1D78C3] pb-2">
                    <Text className="text-3xl text-center text-white font-bold">Climate</Text>
                </View>
                <View className="flex-row justify-between items-center px-6 pt-6">
                    <View className="w-4/5 flex-row items-center bg-white rounded-full px-3 py-1">
                        <Entypo name="magnifying-glass" size={20} color="#666" />
                        <TextInput
                            className="ml-2 flex-1"
                            placeholder="Search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSearch}>
                        <Entypo name="magnifying-glass" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        {/* Main Weather Info */}
                        {weatherData && (
                            <View className="flex items-center my-4">
                               <Image
                                    source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                                    style={{ width: 100, height: 100 }}
                                />
                                <Text className="text-6xl font-bold text-black">
                                    {weatherData ? `${weatherData.main.temp}°C` : 'N/A'}
                                </Text>
                                <Text className="text-lg text-gray-500">
                                    {weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : 'Unknown Location'}
                                </Text>
                                <Text className="text-sm text-gray-500">
                                    {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
                                </Text>
                            </View>
                        )}

                        {/* Weather Details */}
                        {weatherData && (
                            <View className="flex-row justify-around mx-4">
                                <View className="items-center">
                                    <MaterialCommunityIcons name="weather-windy" size={30} color="#000" />
                                    <Text className="text-sm">{weatherData.wind.speed} km/h</Text>
                                    <Text className="text-xs text-gray-500">Wind</Text>
                                </View>
                                <View className="items-center">
                                    <MaterialCommunityIcons name="water-percent" size={30} color="#000" />
                                    <Text className="text-sm">{weatherData.main.humidity}%</Text>
                                    <Text className="text-xs text-gray-500">Humidity</Text>
                                </View>
                                <View className="items-center">
                                    <MaterialCommunityIcons name="weather-rainy" size={30} color="#000" />
                                    <Text className="text-sm">{weatherData.clouds.all}%</Text>
                                    <Text className="text-xs text-gray-500">Cloudiness</Text>
                                </View>
                            </View>
                        )}

                        {/* Forecast Section */}
                        {forecastData.length > 0 && (
                            <View className="mt-6 mx-6">
                                <TouchableOpacity className="bg-[#1D78C3] p-3 rounded-md flex-row justify-center items-center">
                                    <Entypo name="chevron-up" size={20} color="white" />
                                    <Text className="text-white text-lg ml-2">7 Day Forecast</Text>
                                </TouchableOpacity>

                                {/* Forecast Cards */}
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                                    {forecastData.slice(0, 5).map((forecast, index) => (
                                        <View key={index} className="bg-white border-gray-200 shadow-[20px] rounded-lg mx-2 p-3 items-center">
                                            <Text className="text-gray-500">
                                                {new Date(forecast.dt_txt).toLocaleDateString()}
                                            </Text>
                                            <MaterialCommunityIcons name="weather-partly-cloudy" size={30} color="#000" />
                                            <Text className="text-lg">{Math.round(forecast.main.temp)}°C</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            {/* Navigation Bar */}
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
};

export default WeatherScreen;
