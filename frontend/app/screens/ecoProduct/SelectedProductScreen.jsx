import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal, // Import Modal
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

export default SelectedProductScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const categories = [
    { id: 1, name: 'Clothes', icon: 'tshirt-crew' },
    { id: 2, name: 'Garden', icon: 'broom' },
    { id: 3, name: 'Kitchen', icon: 'silverware-clean' },
    { id: 4, name: 'Jewelry', icon: 'necklace' },
    { id: 5, name: 'Beauty', icon: 'magic-staff' },
  ];

  const ecoBrushSet = {
    name: 'Eco Brush Set',
    description:
      'The EcoTools Brushes feature our signature smooth, renewable bamboo handles, synthetic Taklon bristles, and sleek ferrules made with recycled aluminum for a clean beauty experience.',
    price: 'Rs. 2000.00',
    image: require('../../assets/images/ecoProduct/product_1.jpg'), // Placeholder
  };

  const handleAddToCart = () => {
    Alert.alert('Success', 'The product has been added to your cart');

  };

  const handleBuyNow = () => {
    setModalVisible(true); // Show the modal when "Buy Now" is clicked
  };

  return (
    <View style={styles.container}>
      <Header title="Eco brush set" image={require('../../assets/images/profile.png')}/>

      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={ecoBrushSet.image} />
        <View style={styles.iconMain}>
          <Text style={styles.productTitle}>{ecoBrushSet.name}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Icon name="share-variant" size={25} color="#0E395D" style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="cart" size={25} color="#0E395D" style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.productDescription}>{ecoBrushSet.description}</Text>
        <Text style={styles.productPrice}>{ecoBrushSet.price}</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Implementation */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Purchase Confirmation</Text>
            <Text>Are you sure you want to buy {ecoBrushSet.name} for {ecoBrushSet.price}?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  setModalVisible(false);
                  Alert.alert('Purchase Successful', 'Thank you for your purchase!');
                  navigation.navigate('PaymentScreen');

                }}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#7f7f7f',
  },
  productPrice: {
    fontSize: 18,
    color: '#0E395D',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: '#1D78C3',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    marginLeft:20,

  },
  confirmButton: {
    backgroundColor: '#1D78C3',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer:{
    flexDirection: 'row',
  },
  iconMain:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerIcon: {
    marginLeft: 20,
  },
});

