import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1D78C3" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ backgroundColor: "#1D78C3" }}>
          <View style={{ paddingLeft: 16 }}>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <FontAwesome6 name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "bold",
                marginTop: 12,
              }}
            >
              Register
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingTop: 16,
                  marginBottom: 16,
                  marginRight: 8,
                }}
              >
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text
                  style={{ textDecorationLine: "underline", color: "white" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
        >
          <View>
            <Text style={{ color: "#6b7280", marginBottom: 8 }}>Full Name</Text>
            <TextInput
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: 6,
                padding: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                marginBottom: 16,
              }}
              placeholder="Enter your full name"
              placeholderTextColor="#a1a1aa"
            />
          </View>

          <View>
            <Text style={{ color: "#6b7280", marginBottom: 8 }}>E-mail</Text>
            <TextInput
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: 6,
                padding: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                marginBottom: 16,
              }}
              placeholder="Enter your email"
              placeholderTextColor="#a1a1aa"
            />
          </View>

          <View>
            <Text style={{ color: "#6b7280", marginBottom: 8 }}>
              Mobile Number
            </Text>
            <TextInput
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: 6,
                padding: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                marginBottom: 16,
              }}
              placeholder="Enter your mobile number"
              placeholderTextColor="#a1a1aa"
              keyboardType="numeric"
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{ color: "#6b7280", marginBottom: 8 }}>
                Mobile Number
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 6,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginBottom: 16,
                }}
                placeholder="Enter your second number"
                placeholderTextColor="#a1a1aa"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{ color: "#6b7280", marginBottom: 8 }}>
                District
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 6,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginBottom: 16,
                }}
                placeholder="Enter your district"
                placeholderTextColor="#a1a1aa"
              />
            </View>
          </View>

          <View>
            <Text style={{ color: "#6b7280", marginBottom: 8 }}>
              Set Password
            </Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 6,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  marginBottom: 16,
                }}
                placeholder="Enter password"
                placeholderTextColor="#a1a1aa"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 16, top: 16 }}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesome
                  name={passwordVisible ? "eye-slash" : "eye"}
                  size={20}
                  color="#a1a1aa"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{ marginVertical: 16 }}>
            <View
              style={{
                backgroundColor: "#1D78C3",
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
