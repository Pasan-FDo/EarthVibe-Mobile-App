// Header.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Animated,
  Easing,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, image }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  // Animation value for dropdown
  const dropdownAnim = useState(new Animated.Value(0))[0]; // Initial value: 0

  // Toggle dropdown visibility with animation
  const toggleDropdown = () => {
    if (dropdownVisible) {
      // Hide dropdown
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      // Show dropdown
      Animated.timing(dropdownAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  // Close dropdown
  const closeDropdown = () => {
    // Hide dropdown with animation
    Animated.timing(dropdownAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => setDropdownVisible(false));
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    switch (option) {
      case "Profile":
        navigation.navigate("ProfileScreen");
        break;
      case "Events":
        navigation.navigate("EventPostScreen");
        break;
      case "Tips":
        navigation.navigate("TipsListScreen");
        break;
      case "Investment":
        navigation.navigate("InvestmentListScreen");
        break;
      case "Logout":
        // firebase.auth().signOut();
        Alert.alert("Logout", "You have been logged out.");
        navigation.navigate("LoginScreen");
        break;
      default:
        break;
    }
    closeDropdown();
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
        <Animated.Image
          source={image}
          style={[
            styles.profileImage,
            {
              transform: [
                {
                  scale: dropdownVisible ? 1.1 : 1,
                },
              ],
              shadowOpacity: dropdownVisible ? 0.3 : 0.1,
            },
          ]}
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        transparent
        visible={dropdownVisible}
        animationType="none" // Using custom animation
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.dropdownContainer,
                  {
                    opacity: dropdownAnim,
                    transform: [
                      {
                        translateY: dropdownAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {/* Dropdown Options */}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionSelect("Profile")}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={22}
                    color="#333"
                    style={styles.dropdownIcon}
                  />
                  <Text style={styles.dropdownText}>Profile</Text>
                </TouchableOpacity>
{/* events */}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionSelect("Events")}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="book-edit"
                    size={22}
                    color="#333"
                    style={styles.dropdownIcon}
                  />
                  <Text style={styles.dropdownText}>Events Lists</Text>
                </TouchableOpacity>
                {/* tips */}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionSelect("Tips")}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="brightness-percent"
                    size={22}
                    color="#333"
                    style={styles.dropdownIcon}
                  />
                  <Text style={styles.dropdownText}>Tips List</Text>
                </TouchableOpacity>
                {/* investment */}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionSelect("Investment")}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="cash-multiple"
                    size={22}
                    color="#333"
                    style={styles.dropdownIcon}
                  />
                  <Text style={styles.dropdownText}>Investment</Text>
                </TouchableOpacity>



                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionSelect("Logout")}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={22}
                    color="#333"
                    style={styles.dropdownIcon}
                  />
                  <Text style={styles.dropdownText}>Logout</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#1D78C3", // Primary blue color
    paddingBottom: 10,
    paddingTop: Platform.OS === "ios" ? 60 : 40, // Adjust padding for iOS notch
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  dropdownIcon: {
    marginRight: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default Header;
