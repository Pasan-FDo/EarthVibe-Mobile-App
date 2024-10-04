import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreen from "../app/screens/TestScreen";
import SplashScreen from "../app/screens/SplashScreen";
import SignUpScreen from "../app/screens/SignUpScreen";
import LoginScreen from "../app/screens/LoginScreen";
import HomeScreen from "../app/screens/HomeScreen";
import ProfileScreen from "../app/screens/profileScreen";
import EventFormScreen from "../app/screens/earthEvent/EventFormScreen";
import EventPostScreen from "../app/screens/earthEvent/EventPostScreen";
import EventScreen from "../app/screens/earthEvent/EventScreen";
import SelectEventScreen from "../app/screens/earthEvent/SelectEventScreen";
import SelectTipsScreen from "../app/screens/earthEvent/SelectTipsScreen";
import TipsFormScreen from "../app/screens/earthEvent/TipsFormScreen";
import TipsListScreen from "../app/screens/earthEvent/TipsListScreen";
import GreenInvestmentScreen from "../app/screens/greenInvestment/GreenInvestmentScreen";
import InvestmentFormScreen from "../app/screens/greenInvestment/InvestmentFormScreen";
import SelectGreenInvestmentScreen from "../app/screens/greenInvestment/SelectGreenInvestmentScreen";
import ClimateNetworkScreen from "../app/screens/climateAction/ClimateNetworkScreen";
import DisasterAlertScreen from "../app/screens/climateAction/DisasterAlertScreen";
import DisasterNewsListScreen from "../app/screens/climateAction/DisasterNewsListScreen";
import WhetherScreen from "../app/screens/climateAction/WhetherScreen";
import Nav from "./screens/Nav";
import DisasterForm from "./screens/climateAction/DisasterForm";
import UserLocation from "./screens/UserLocation";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1D78C3" />
     
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
            name="Nav"
            component={Nav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DisasterForm"
            component={DisasterForm}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="UserLocation"
            component={UserLocation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
     
    </>
  );
};

export default Index;
