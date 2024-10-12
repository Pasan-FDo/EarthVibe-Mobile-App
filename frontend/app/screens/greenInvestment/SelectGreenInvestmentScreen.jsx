import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions, 
    ActivityIndicator,
    StyleSheet,
    Platform,
    Alert, // Import Alert for error messages
} from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { firebase } from '../../../config';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

const { width: screenWidth } = Dimensions.get('window');

const SelectGreenInvestment = ({ navigation }) => {
    const [investmentData, setInvestmentData] = useState(null);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { _id } = route.params;

    useEffect(() => {
        const fetchInvestmentData = async () => {
            try {
                const docRef = firebase.firestore().collection('GreenInvestment').doc(_id);
                const doc = await docRef.get();
                if (doc.exists) {
                    setInvestmentData({ id: doc.id, ...doc.data() });
                    console.log('Investment Data:', { id: doc.id, ...doc.data() });
                } else {
                    console.log('No such document!');
                    Alert.alert('Error', 'Investment data not found.');
                }
            } catch (error) {
                console.error('Error fetching investment data:', error);
                Alert.alert('Error', 'Failed to fetch investment data.');
            } finally {
                setLoading(false);
            }
        };

        fetchInvestmentData();
    }, [_id]);

    const images = investmentData?.pictures || [];

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1D78C3" />
            </SafeAreaView>
        );
    }

    if (!investmentData) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={styles.errorText}>Investment data not available.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Header Component */}
                <Header 
                    title="Green Investments" 
                    image={require('../../assets/images/profile.png')} 
                />

                {/* Image Carousel */}
                {images.length > 0 ? (
                    <View style={styles.carouselContainer}>
                        <Carousel
                            width={screenWidth}
                            height={screenWidth * 0.6}
                            data={images}
                            autoPlay
                            loop
                            autoPlayInterval={3000}
                            renderItem={({ item }) => (
                                <View style={styles.carouselItem}>
                                    <Image 
                                        source={{ uri: item }} 
                                        style={styles.carouselImage} 
                                        resizeMode="cover" 
                                    />
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No images available.</Text>
                    </View>
                )}

                {/* Investment Details */}
                <View style={styles.detailsContainer}>
                    {/* Title and Like/Dislike Section */}
                    <View style={styles.titleLikeContainer}>
                        <Text style={styles.titleText}>{investmentData.title}</Text>
                        <View style={styles.likeDislikeContainer}>
                            {/* Like Section */}
                            <View style={styles.likeDislikeItem}>
                                <AntDesign name="like1" size={20} color="#1D78C3" />
                                <Text style={styles.likeDislikeText}>{investmentData.like || 0}</Text>
                            </View>
                            {/* Dislike Section */}
                            <View style={styles.likeDislikeItem}>
                                <AntDesign name="dislike1" size={20} color="#FF6347" />
                                <Text style={styles.likeDislikeText}>{investmentData.disLike || 0}</Text>
                            </View>
                        </View>
                    </View>

              
                    <Text style={styles.dateText}>{new Date(investmentData.date).toLocaleDateString()}</Text>

                   
                    <Text style={styles.descriptionText}>{investmentData.description}</Text>
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
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
    scrollViewContent: {
        paddingBottom: 80, 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    errorText: {
        fontSize: 16,
        color: '#FF0000',
    },
    carouselContainer: {
        marginTop: 15,
        width: screenWidth,
        height: screenWidth * 0.6,
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '80%',
        height: '80%', 
        borderRadius: 10,
    },
    noImageContainer: {
        width: screenWidth,
        height: screenWidth * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3D3D3', 
        borderRadius: 10,
        marginVertical: 10,
    },
    noImageText: {
        color: '#808080',
        fontSize: 16,
    },
    detailsContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    titleLikeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
    },
    likeDislikeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeDislikeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    likeDislikeText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#333333',
    },
    dateText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 22,
    },
});

export default SelectGreenInvestment;
