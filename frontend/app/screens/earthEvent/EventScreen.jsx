// EventScreen.js
import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    SafeAreaView, 
    Image, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet,
    ActivityIndicator 
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { useRouter } from 'expo-router';
import { TouchableWithoutFeedback } from 'react-native';
import EventCard from '../../components/EventCard';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { firebase } from '../../../config'; 

const EventScreen = ({ navigation }) => {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
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


    // Fetching Events and Tips from Firestore
    const fetchData = async () => {
        try {
            // Fetch Events
            const eventsSnapshot = await firebase.firestore().collection('Events').orderBy('createdAt', 'desc').get();
            const fetchedEvents = eventsSnapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
            }));
            setEvents(fetchedEvents);

            // Fetch Tips
            const tipsSnapshot = firebase.firestore().collection('Tips');
            const snapshot = await tipsSnapshot.get();
            const fetchedTips = snapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
            }));
            console.log(fetchedTips );
            setTips(fetchedTips);

        } catch (error) {
            console.error('Error fetching data: ', error);
            Alert.alert('Error', 'Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Loading Indicator
    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1D78C3" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Header title="Event & Tips" image={require('../../assets/images/profile.png')}/>
                
                {/* Recent Events Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.sectionTitle}>Recent Events</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EventFormScreen')}>
                        <Icon name="folder-plus" size={22} color="#1D78C3" />
                    </TouchableOpacity>
                </View>
                
                {/* Events Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.carouselRow}>
                        {EventArray.map((event) => (
                                <TouchableOpacity key={event._id} onPress={()=> navigation.navigate('SelectEventScreen',{event})}>
                                    <View className="px-4">
                                        <Image className="w-32 h-32" source={event.image} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                </ScrollView>

                {/* Recent Tips Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.sectionTitle}>Recent Life Hacks and Tips</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TipsFormScreen')}>
                        <Icon name="folder-plus" size={22} color="#1D78C3" />
                    </TouchableOpacity>
                </View>

                {/* Tips List */}
                <View style={styles.tipsList}>
                    {tips.map((item) => (
                        <TouchableOpacity key={item._id} onPress={() => navigation.navigate('SelectTipsScreen', { _id: item._id })}>
                            <EventCard data={item} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    carouselRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    eventImageContainer: {
        marginRight: 15,
        borderRadius: 10,
        overflow: 'hidden',
        width: 150,
        height: 150,
        backgroundColor: '#ddd',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    tipsList: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default EventScreen;
