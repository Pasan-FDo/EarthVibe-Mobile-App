import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import Header from '../../components/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default ProductListScreen = ({navigation}) => {
  const users = [
    {
      id: 1,
      name: 'Clothes',
      icon: 'tshirt-crew',
      
    },
    {
      id: 2,
      name: 'Garden',
      icon: 'broom',
     
    },
    {
      id: 3,
      name: 'Kitchen',
      icon: 'silverware-clean',
     
    },
    {
      id: 4,
      name: 'Jewelary',
      icon: 'necklace',
      
    },
    {
      id: 5,
      name: 'Beauty',
      icon: 'magic-staff',
      
    },
  ];
  const data = [
    {
      id: 1,
      title: 'Product 1',
      price: '$ 25.00 USD',
      image: require('../../assets/images/ecoProduct/product_1.jpg'),
      navigateTo:''
    },
    {
      id: 2,
      title: 'Product 2',
      price: '$ 10.13 USD',
      image: require('../../assets/images/ecoProduct/product_2.jpg'),
    },
    {
      id: 3,
      title: 'Product 3',
      price: '$ 12.12 USD',
      image: require('../../assets/images/ecoProduct/product_3.jpg'),
    },
    {
      id: 4,
      title: 'Product 4',
      price: '$ 11.00 USD',
      image: require('../../assets/images/ecoProduct/product_4.jpg'),
    },
    {
      id: 5,
      title: 'Product 5',
      price: '$ 20.00 USD',
      image: require('../../assets/images/ecoProduct/product_5.jpg'),
    },
    {
      id: 6,
      title: 'Product 6',
      price: '$ 33.00 USD',
      image: require('../../assets/images/ecoProduct/product_6.jpg'),
    },
    {
      id: 7,
      title: 'Product 7',
      price: '$ 20.95 USD',
      image: require('../../assets/images/ecoProduct/product_8.png'),
    },
    {
      id: 8,
      title: 'Product 8',
      price: '$ 13.60 USD',
      image: require('../../assets/images/ecoProduct/product_9.jpg'),
    },
    {
      id: 9,
      title: 'Product 9',
      price: '$ 15.30 USD',
      image: require('../../assets/images/ecoProduct/product_10.jpg'),
    },
    {
      id: 9,
      title: 'Product 10',
      price: '$ 21.30 USD',
      image: require('../../assets/images/ecoProduct/product_11.jpg'),
    },
  ]
  const renderCategories = (item) => (
    <View className="items-center m-1">
      <TouchableOpacity
        className="bg-[#1D78C3] p-1 rounded-full shadow"
        key={item.id}
        // onPress={() => navigation.navigate(item.navigateTo)}
        style={{
          // borderWidth: 5,
          // borderColor: "#1D78C3",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={item.icon} size={30} color='#fff' />
        </View>
      </TouchableOpacity>
      <Text className="text-center text-xs mt-2">{item.name}</Text>
    </View>
  );

  const [products, setProducts] = useState(data)

  addProductToCart = () => {
    // Alert.alert('Success', 'The product has been added to your cart');
    navigation.navigate('SelectProductScreen');

  }
  const [selectedUser, setSelectedUser] = useState(1);

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setStatusPhotos(users.find((user) => user.id === userId)?.statusPhotos || []);
    setCurrentPhotoIndex(0);
  };
  return (
    <View style={styles.container}>
      <Header title="Product List" image={require('../../assets/images/profile.png')}/>
      {/* Category Section */}
      <View className="mt-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4">
              {users.map((item) => renderCategories(item))}
            </View>
          </ScrollView>
        </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={products}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }}
        renderItem={post => {
          const item = post.item
          return (
            <View style={styles.card}>
              {/* <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View> */}

              <Image style={styles.cardImage} source={item.image} />
              <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              <View style={styles.cardFooter}>
              
                <View style={styles.socialBarContainer}>
                  <View style={styles.socialBarSection}>
                
                    <TouchableOpacity
                      style={styles.socialBarButton}
                      onPress={addProductToCart}>
                      <Image
                        style={styles.icon}
                        source={{
                          uri: 'https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png',
                        }}
                      />
                      <Text style={[styles.socialBarLabel, styles.buyNow]}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity style={styles.socialBarButton}>
                      <Image
                        style={styles.icon}
                        source={{ uri: 'https://img.icons8.com/color/50/000000/star.png' }}
                      />
                      <Text style={styles.socialBarLabel}>5</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 15,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 150,
    width: '100%',
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#0E395D',
    fontWeight: 'semibold',
    marginTop: 5,
    textAlign: 'center',
  },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // marginLeft:10,
    backgroundColor:'gray'
  },

  /******** social bar ******************/
  socialBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
  },
  socialBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    // marginRight: 5,
  },
  socialBarLabel: {
    fontSize: 12,
  },
  buyNow: {
    fontSize: 12,
    color: '#0E395D',
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItem: {
    marginRight: 10,
backgroundColor:'#4A90CB',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding:10,
    borderRadius: 60,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 5,
    textAlign: 'center',
  },
  categoryContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor:'#fff'
    
  },
})

      