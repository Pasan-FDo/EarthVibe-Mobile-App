import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreen from "./screens/TestScreen";
import SplashScreen from "./screens/SplashScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/profileScreen";
import EventFormScreen from "./screens/earthEvent/EventFormScreen";
import EventPostScreen from "./screens/earthEvent/EventPostScreen";
import EventScreen from "./screens/earthEvent/EventScreen";
import SelectEventScreen from "./screens/earthEvent/SelectEventScreen";
import SelectTipsScreen from "./screens/earthEvent/SelectTipsScreen";
import TipsFormScreen from "./screens/earthEvent/TipsFormScreen";
import TipsListScreen from "./screens/earthEvent/TipsListScreen";
import GreenInvestmentScreen from "./screens/greenInvestment/GreenInvestmentScreen";
import InvestmentFormScreen from "./screens/greenInvestment/InvestmentFormScreen";
import SelectGreenInvestmentScreen from "./screens/greenInvestment/SelectGreenInvestmentScreen";
import ClimateNetworkScreen from "./screens/climateAction/ClimateNetworkScreen";
import DisasterAlertScreen from "./screens/climateAction/DisasterAlertScreen";
import DisasterNewsListScreen from "./screens/climateAction/DisasterNewsListScreen";
import WhetherScreen from "./screens/climateAction/WhetherScreen";
import UserLocation from "./app/screens/UserLocation";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1D78C3" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EventFormScreen"
            component={EventFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventPostScreen"
            component={EventPostScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventScreen"
            component={EventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectEventScreen"
            component={SelectEventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectTipsScreen"
            component={SelectTipsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TipsFormScreen"
            component={TipsFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TipsListScreen"
            component={TipsListScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GreenInvestmentScreen"
            component={GreenInvestmentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InvestmentFormScreen"
            component={InvestmentFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectGreenInvestmentScreen"
            component={SelectGreenInvestmentScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ClimateNetworkScreen"
            component={ClimateNetworkScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DisasterAlertScreen"
            component={DisasterAlertScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DisasterNewsListScreen"
            component={DisasterNewsListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WhetherScreen"
            component={WhetherScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="UserLocation"
          component={UserLocation}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Index;
