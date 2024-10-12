// PaymentScreen.js

import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    FlatList, 
    Alert, 
    ActivityIndicator, 
    SafeAreaView,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';

const PaymentScreen = ({navigation}) => {


    // State variables
    const [cards, setCards] = useState([
        { id: '1', number: '**** **** **** 1234', holder:'John Doe', expiration:'12/24', logo: 'https://img.icons8.com/color/70/000000/visa.png' },
        { id: '2', number: '**** **** **** 5678', holder:'John Doe', expiration:'11/23', logo: 'https://img.icons8.com/color/70/000000/mastercard.png' },
        { id: '3', number: 'Apple Pay', holder:'John Doe', expiration:'', logo:'https://img.icons8.com/color/70/000000/apple-pay.png' },
    ]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [uploading, setUploading] = useState(false); // Define 'uploading' state

    // Sample data for Item Details and Delivery Information
    const [itemDetails, setItemDetails] = useState({
        image: 'https://img.icons8.com/ios-filled/100/000000/shopping-cart.png',
        name: 'Eco Brush Set',
        quantity: 1,
        price: 'Rs. 2000.00',
    });

    const [deliveryInfo, setDeliveryInfo] = useState({
        address: '123 Main Street, MHvila,Panadura',
        expectedDate: 'October 12, 2024',
        shippingMethod: 'Standard Shipping',
    });

    // Fetch user details from AsyncStorage on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetailsString = await AsyncStorage.getItem('UserDetails');
                if (userDetailsString !== null) {
                    const parsedUserDetails = JSON.parse(userDetailsString);
                    setUserDetails(parsedUserDetails);
                    console.log('User Details:', parsedUserDetails);
                } else {
                    console.log('No user details found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                Alert.alert('Error', 'Failed to fetch user details.');
            }
        };
        fetchUserDetails();
    }, []);

    // Handle selection of a card
    const handleSelectCard = (id) => {
        setSelectedCardId(id);
    };

    // Handle "Make a Payment" button press
    const handleMakePayment = () => {
        if (!selectedCardId) {
            Alert.alert('No Payment Method Selected', 'Please select a payment method to proceed.');
            return;
        }

        const selectedCard = cards.find(card => card.id === selectedCardId);
        // Implement your payment logic here
        // For demonstration, we'll simulate a payment process
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            Alert.alert('Payment Successful', `Payment made using ${selectedCard.number}`);
            // Optionally, navigate to a confirmation screen
            navigation.navigate('InvoiceScreen'); // Ensure this route exists
        }, 2000); 
    };

    // Handle adding a new payment method
    const handleAddPaymentMethod = () => {
        // Navigate to AddPaymentMethod screen or open a modal
        navigation.navigate('AddPaymentMethod');
    };

    // Render individual payment method card
    const renderCard = ({ item }) => {
        const isSelected = item.id === selectedCardId;
        return (
            <TouchableOpacity 
                style={[styles.cardContainer, isSelected && styles.selectedCard]} 
                onPress={() => handleSelectCard(item.id)}
            >
                <Image source={{ uri: item.logo }} style={styles.logo} />
                <Text style={styles.cardNumber}>{item.number}</Text>
                <View style={styles.cardInfoContainer}>
                    <View style={styles.cardInfoItem}>
                        <Text style={styles.cardInfoLabel}>Card Holder</Text>
                        <Text style={styles.cardInfoValue}>{item.holder}</Text>
                    </View>
                    <View style={styles.cardInfoItem}>
                        <Text style={styles.cardInfoLabel}>Expiration</Text>
                        <Text style={styles.cardInfoValue}>{item.expiration}</Text>
                    </View>
                </View>
                {isSelected && (
                    <FontAwesome6 name="check-circle" size={24} color="#1D78C3" style={styles.checkIcon} />
                )}
            </TouchableOpacity>
        );
    };

    // Key extractor for FlatList
    const keyExtractor = (item) => item.id;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
               <Header title="Payment details" image={require('../../assets/images/profile.png')}/>
                {/* Item Details */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Item Details</Text>
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: itemDetails.image }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{itemDetails.name}</Text>
                            <Text style={styles.itemQuantity}>Quantity: {itemDetails.quantity}</Text>
                            <Text style={styles.itemPrice}>{itemDetails.price}</Text>
                        </View>
                    </View>
                </View>

                {/* Delivery Information */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Delivery Information</Text>
                    <View style={styles.deliveryContainer}>
                        <Text style={styles.deliveryLabel}>Address:</Text>
                        <Text style={styles.deliveryValue}>{deliveryInfo.address}</Text>
                    </View>
                    <View style={styles.deliveryContainer}>
                        <Text style={styles.deliveryLabel}>Expected Delivery:</Text>
                        <Text style={styles.deliveryValue}>{deliveryInfo.expectedDate}</Text>
                    </View>
                    <View style={styles.deliveryContainer}>
                        <Text style={styles.deliveryLabel}>Shipping Method:</Text>
                        <Text style={styles.deliveryValue}>{deliveryInfo.shippingMethod}</Text>
                    </View>
                </View>

                {/* Payment Instructions */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Payment Instructions</Text>
                    <Text style={styles.instructionsText}>
                        Please select a payment method below and tap "Make a Payment" to complete your purchase securely.
                    </Text>
                </View>

                {/* Payment Methods */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Select Payment Method</Text>
                    <FlatList
                        data={cards}
                        renderItem={renderCard}
                        keyExtractor={keyExtractor}
                        horizontal={true}
                        contentContainerStyle={styles.carouselContainer}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={
                            <TouchableOpacity style={styles.addCardButton} onPress={handleAddPaymentMethod}>
                                <FontAwesome6 name="plus-circle" size={60} color="#1D78C3" />
                                <Text style={styles.addCardText}>Add Payment Method</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </ScrollView>

            {/* Make a Payment Button */}
            <TouchableOpacity 
                style={styles.paymentButton} 
                onPress={handleMakePayment}
                disabled={uploading}
            >
                {uploading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Make a Payment</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    scrollContent: {
        // padding: 20,
        paddingBottom: 150, // Increased padding to accommodate the fixed button
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D78C3',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1D78C3',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
        resizeMode: 'cover',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1D78C3',
    },
    deliveryContainer: {
        marginBottom: 10,
    },
    deliveryLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    deliveryValue: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    instructionsText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    carouselContainer: {
        paddingVertical: 10,
    },
    cardContainer: {
        marginHorizontal: 10,
        width: 300,
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        position: 'relative',
    },
    selectedCard: {
        borderColor: '#1D78C3',
        borderWidth: 2,
    },
    cardNumber: {
        fontSize: 18,
        letterSpacing: 4,
        marginBottom: 10,
        color: '#333',
    },
    cardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardInfoItem: {
        flex: 1,
    },
    cardInfoLabel: {
        fontSize: 12,
        color: 'gray',
    },
    cardInfoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    logo: {
        width: 60,
        height: 40,
        resizeMode: 'contain',
    },
    checkIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    addCardButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    addCardText: {
        marginTop: 10,
        fontSize: 14,
        color: '#1D78C3',
        textAlign: 'center',
    },
    paymentButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#1D78C3',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1D78C3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default PaymentScreen;
