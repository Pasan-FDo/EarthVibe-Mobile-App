import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Share } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRoute } from '@react-navigation/native'; 
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';
import { firebase } from '../../../config';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen width and height

const SelectTipsScreen = ({ navigation }) => {
  const [investmentData, setInvestmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { _id } = route.params;

  useEffect(() => {
    const fetchInvestmentData = async () => {
        try {
            const docRef = firebase.firestore().collection('Tips').doc(_id);
            const doc = await docRef.get();
            if (doc.exists) {
                setInvestmentData({ id: doc.id, ...doc.data() });
                console.log('Investment Data:', { id: doc.id, ...doc.data() });
            } else {
                console.log('No such document!');
                Alert.alert('Error', 'Tips data not found.');
            }
        } catch (error) {
            console.error('Error fetching investment data:', error);
            Alert.alert('Error', 'Failed to fetch tips data.');
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
    // Share handler function
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `${item.title}\n\n${item.description}`,
                url: 'https://example.com', // Add your own URL if needed
                title: item.title
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with specific activity (iOS)
                } else {
                    // shared (Android or fallback)
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.error(error.message);
        }
    };
        // State to track like and dislike counts
        const [likeCount, setLikeCount] = useState(102);  // 10.2K as initial value
        const [dislikeCount, setDislikeCount] = useState(30);  // 3.2K as initial value
      
        // Handle Like Button Press
        const handleLikePress = () => {
          setLikeCount(likeCount + 1); // Increase like count
        };
      
        // Handle Dislike Button Press
        const handleDislikePress = () => {
          setDislikeCount(dislikeCount + 1); // Increase dislike count
        };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Header Section */}
                <Header title="Tips & Life Hacks" image={require('../../assets/images/profile.png')}/>

              {/* Carousel Section */}
              <View style={{ flex: 1 }}>
            {/* Carousel Section */}
            <View style={{ width: '100%', marginVertical: 20, alignItems: 'center' }}>
                <Carousel
                    width={screenWidth * 0.9} // Slightly smaller than full width for better spacing
                    height={screenWidth * 0.55} // Slightly less height for a sleeker look
                    style={{ borderRadius: 15 }}
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
                    onSnapToItem={handleSnapToItem} // Track active slide index
                   
                />

                {/* Dots Pagination */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: activeIndex === index ? 12 : 8,
                                height: activeIndex === index ? 12 : 8,
                                borderRadius: 6,
                                backgroundColor: activeIndex === index ? '#1D78C3' : '#ccc',
                                marginHorizontal: 4,
                            }}
                        />
                    ))}
                </View>
            </View>
        </View>


        <View
  style={{
    flex: 1, // Ensures the white section takes the rest of the screen space
    marginTop: -15,
    padding: screenWidth * 0.05, // 5% padding relative to screen width
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }}
>
  {/* Title and Icons */}
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: screenHeight * 0.02, // Spacing between title and icons
    }}
  >
    {/* Title */}
    <Text style={{ fontSize: screenWidth * 0.06, fontWeight: 'bold' }}>
      {investmentData.title}
    </Text>

    {/* Icons: Share, Like, Dislike */}
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Share Button */}
      <TouchableOpacity onPress={onShare} style={{ marginRight: 15 }}>
        <Entypo name="share" size={22} color="gray" />
      </TouchableOpacity>

     
    </View>
  </View>

  {/* Description Section */}
  <Text
    style={{
      fontSize: screenWidth * 0.035, // Relative font size
      color: 'gray',
      marginBottom: screenHeight * 0.02, // Space after description
    }}
  >
    {investmentData.description}
  </Text>
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      {/* Like Button */}
      <TouchableOpacity onPress={handleLikePress} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
        <AntDesign name="like1" size={18} color="gray" />
        <Text style={{ fontSize: screenWidth * 0.04, color: 'gray', marginLeft: 5 }}>
        {likeCount}
          {/* {likeCount >= 1000 ? (likeCount / 1000).toFixed(1) + 'K' : likeCount} */}
        </Text>
      </TouchableOpacity>

      {/* Dislike Button */}
      <TouchableOpacity onPress={handleDislikePress} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name="dislike1" size={18} color="gray" />
        <Text style={{ fontSize: screenWidth * 0.04, color: 'gray', marginLeft: 5 }}>
            {dislikeCount}
          {/* {dislikeCount >= 1000 ? (dislikeCount / 1000).toFixed(1) + 'K' : dislikeCount} */}
        </Text>
      </TouchableOpacity>
    </View>
  
      
</View>

            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0">
                <NavigationBar />
            </View>
        </SafeAreaView>
    );
};

export default SelectTipsScreen;
