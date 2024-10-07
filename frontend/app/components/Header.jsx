import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = ({ title, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={image}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D78C3",
    paddingBottom: 10,
    paddingTop: 40, 
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
  },
  title: {
    fontSize: 22, 
    color: "#fff",
    fontWeight: "bold",
    flexShrink: 1, 
  },
  profileImage: {
    width: 60, 
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff", 
  },
});

export default Header;

