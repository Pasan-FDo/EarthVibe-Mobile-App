import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';

const LocationDetailsScreen = ({route,navigation}) => {
    const { location } = route.params;

    return (
        <View style={styles.container}>
            <Header title="Event Location" image={require('../../assets/images/profile.png')}/>
            <Text style={styles.title}>{location.title}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.01, // Adjust the zoom level
                    longitudeDelta: 0.01, // Adjust the zoom level
                }}
                showsUserLocation={true} // Optionally show user location
                loadingEnabled={true}
            >
                <Marker
                    coordinate={{
                        latitude: location.lat,
                        longitude: location.lng,
                    }}
                    title={location.title} // Display title in marker
                />
            </MapView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 3, // Optional shadow for title
    },
    map: {
        flex: 1,
    },
});


export default LocationDetailsScreen;