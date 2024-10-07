import React from "react";
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Header from "../components/Header";

const HomeScreen = ({ navigation }) => {

  const screenWidth = Dimensions.get("window").width;
  const numColumns = 2;
  const itemPadding = 16;
  const itemWidth = screenWidth / numColumns - itemPadding * 2;

  const horizontalSections = [
    {
      id: "1",
      title: "About",
      icon: "appstore1",
      navigateTo: "HomeScreen",
    },
    {
      id: "2",
      title: "Settings",
      icon: "setting",
      navigateTo: "HomeScreen",
    },
    {
      id: "3",
      title: "Privacy",
      icon: "customerservice",
      navigateTo: "HomeScreen",
    },
    {
      id: "4",
      title: "Terms",
      icon: "filetext1",
      navigateTo: "HomeScreen",
    },
    {
      id: "5",
      title: "Earth",
      icon: "earth",
      navigateTo: "HomeScreen",
    },
  ];

  const sections = [
    {
      id: "1",
      title: "Green Investment",
      icon: require("../assets/images/homeScreen/green_investment.png"),
      navigateTo: "GreenInvestmentScreen",
    },
    {
      id: "2",
      title: "Earth     Events",
      icon: require("../assets/images/homeScreen/earth_event.png"),
      navigateTo: "EventScreen",
    },
    {
      id: "3",
      title: "Eco     Product",
      icon: require("../assets/images/homeScreen/eco_product.png"),
      navigateTo: "ProductListScreen",
    },
    {
      id: "4",
      title: "Weather Alerts",
      icon: require("../assets/images/homeScreen/weather.png"),
      navigateTo: "WhetherScreen",
    },
  ];

  const testimonials = [
    {
      id: "1",
      name: "Richard Harly",
      feedback:
        "Earth Vibe has transformed the way I think about eco-friendly living. The green investment tips were especially helpful!",
      image: require("../assets/images/users/richard.jpg"),
      rating: 5,
    },
    {
      id: "2",
      name: "Malaika Vanderson",
      feedback:
        "I love how easy it is to stay updated with the latest weather alerts and eco products. Highly recommended!",
      image: require("../assets/images/users/malaika.jpg"),
      rating: 5,
    },
    {
      id: "3",
      name: "Andrew Smith",
      feedback:
        "This app has completely changed the way I think about eco-friendly living. It's informative and easy to use!",
      image: require("../assets/images/users/thimothy.jpg"),
      rating: 4,
    },
    {
      id: "4",
      name: "Max Ray",
      feedback:
        "Earth Vibe has made it so convenient to track eco-friendly events and initiatives. A must-have for anyone who cares about the planet!",
      image: require("../assets/images/users/maxR.jpg"),
      rating: 4,
    },
  ];

  const renderHorizontalItem = (item) => (
    <View className="items-center m-1">
      <TouchableOpacity
        className="bg-white p-1 rounded-full shadow"
        key={item.id}
        onPress={() => navigation.navigate(item.navigateTo)}
        style={{
          borderWidth: 5,
          borderColor: "#1D78C3",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={item.icon} size={30} />
        </View>
      </TouchableOpacity>
      <Text className="text-center text-xs font-mono mt-2">{item.title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-1 m-2 p-4 bg-white rounded-lg shadow"
      onPress={() => navigation.navigate(item.navigateTo)}
      style={{ width: itemWidth }}
    >
      <Image
        source={item.icon}
        style={{
          width: itemWidth - 32,
          height: itemWidth - 32,
          borderRadius: 15,
          alignSelf: "center",
        }}
        resizeMode="contain"
      />
      <Text className="text-center text-sm text-[#1D78C3] font-semibold">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderTestimonial = ({ item }) => (
    <View className="flex-1 p-4 bg-white rounded-lg shadow m-2">
      <View className="flex-row items-center">
        <Image
          source={item.image}
          className="w-14 h-14 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-lg font-semibold ml-4">{item.name}</Text>
      </View>
      <Text className="mt-2 text-gray-600">{item.feedback}</Text>
      {/* Star Rating */}
      <View className="absolute bottom-2 right-2 flex-row items-center">
        <Text className="text-yellow-500 mr-1">{item.rating}</Text>
        <Icon name="star" size={16} color="#FFD700" />
      </View>
    </View>
  );

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#1D78C3" />
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Header title="Welcome to Earth Vibe" image={require("../assets/images/EarthVibeLogo.png")}/>
        <View className="mt-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4">
              {horizontalSections.map((item) => renderHorizontalItem(item))}
            </View>
          </ScrollView>
        </View>
        <View className="mt-8 px-4">
          <FlatList
            data={sections}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
        <View className="mt-8 px-4">
          <Text className="text-2xl font-bold text-[#1D78C3] mb-4">
            What People Say
          </Text>
          <FlatList
            data={testimonials}
            renderItem={renderTestimonial}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;
