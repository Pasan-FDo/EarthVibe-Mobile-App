import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../app/screens/SplashScreen";
import SignUpScreen from "../app/screens/SignUpScreen";
import LoginScreen from "../app/screens/LoginScreen";
import HomeScreen from "../app/screens/HomeScreen";
import NavigationBar from "../app/components/NavigationBar";
import ProfileScreen from "../app/screens/profileScreen";
import EventFormScreen from "../app/screens/earthEvent/EventFormScreen";
import EventPostScreen from "../app/screens/earthEvent/EventPostScreen";
import EventScreen from "../app/screens/earthEvent/EventScreen";
import SelectEventScreen from "../app/screens/earthEvent/SelectEventScreen";
import SelectTipsScreen from "../app/screens/earthEvent/SelectTipsScreen";
import TipsFormScreen from "../app/screens/earthEvent/TipsFormScreen";
import TipsListScreen from "../app/screens/earthEvent/TipsListScreen";
import LocationDetailsScreen from "./screens/earthEvent/LocationDetailsScreen.";
import GreenInvestmentScreen from "../app/screens/greenInvestment/GreenInvestmentScreen";
import InvestmentFormScreen from "../app/screens/greenInvestment/InvestmentFormScreen";
import InvestmentListScreen from "./screens/greenInvestment/InvestmentListScreen";
import SelectGreenInvestmentScreen from "../app/screens/greenInvestment/SelectGreenInvestmentScreen";
import ClimateNetworkScreen from "../app/screens/climateAction/ClimateNetworkScreen";
import DisasterAlertScreen from "../app/screens/climateAction/DisasterAlertScreen";
import DisasterNewsListScreen from "../app/screens/climateAction/DisasterNewsListScreen";
import WhetherScreen from "../app/screens/climateAction/WhetherScreen";
import ProductListScreen from "../app/screens/ecoProduct/ProductListScreen";
import SelectProductScreen from "../app/screens/ecoProduct/SelectedProductScreen";
import Invoice from "./screens/ecoProduct/Invoice";
import PaymentScreen from './screens/ecoProduct/PaymentScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1D78C3" />
      <Stack.Navigator initialRouteName="SplashScreen"  >
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
          options={{ headerShown: false , navigationBarColor: '#1D78C3',
            navigationBarHidden: false,}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NavigationBar"
          component={NavigationBar}
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
          options={{ headerShown: false,navigationBarHidden: true, }}
        />
        <Stack.Screen
          name="LocationDetailsScreen"
          component={LocationDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GreenInvestmentScreen"
          component={GreenInvestmentScreen}
          options={{ headerShown: false ,navigationBarHidden: true,}}
        />
        <Stack.Screen
          name="InvestmentFormScreen"
          component={InvestmentFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectGreenInvestmentScreen"
          component={SelectGreenInvestmentScreen}
          options={{ headerShown: false ,  navigationBarHidden: true,}}
        />
        <Stack.Screen
          name="InvestmentListScreen"
          component={InvestmentListScreen}
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
          name="ProductListScreen"
          component={ProductListScreen}
          options={{ headerShown: false, navigationBarHidden: true, }}
        />
        <Stack.Screen
          name="SelectProductScreen"
          component={SelectProductScreen}
          options={{ headerShown: false,navigationBarHidden: true, }}
        />
        <Stack.Screen
          name="InvoiceScreen"
          component={Invoice}
          options={{ headerShown: false, navigationBarHidden: true, }}
        />
          <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false, navigationBarHidden: true, }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Index;
