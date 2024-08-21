// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
// import { Icon } from '@rneui/themed';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

// export default function App() {
//   let [fontsLoaded] = useFonts({
//     Roboto_400Regular,
//     Roboto_500Medium,
//     Roboto_700Bold,
//   });
//   if (!fontsLoaded) {
//     return null; // Optionally render a loading component here
//   }
//   return (
//     <ImageBackground
//       source={require("./assets/img/background.jpg")}
//       style={styles.backgroundImage}
//       blurRadius={20}
//     >
//       <ScrollView style={styles.container}>
//         {/* Header Component */}
//         <View style={styles.header}>
//           <Text style={styles.locationText}>Biygamaa</Text>
//           <TouchableOpacity>
//             <Text style={styles.headerButton}>EXTENDED FORECAST {'>'}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Comfort Level Component */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>COMFORT LEVEL</Text>
//             <TouchableOpacity>
//               <Text style={styles.sectionButton}>MORE {'>'}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.comfortLevelContent}>
//             <AnimatedCircularProgress
//               size={100}
//               width={10}
//               fill={83}
//               tintColor="#00e0ff"
//               backgroundColor="#3d5875"
//               rotation={0}
//               lineCap="round"
//             >
//               {() => <Text style={styles.progressText}>83%</Text>}
//             </AnimatedCircularProgress>
//             <View style={styles.additionalInfo}>
//               <Text style={styles.additionalText}>Feels like 33°</Text>
//               <Text style={styles.additionalText}>UV index 0 Low</Text>
//             </View>
//           </View>
//         </View>

//         {/* Wind Component */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>WIND</Text>
//             <TouchableOpacity>
//               <Text style={styles.sectionButton}>MORE {'>'}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.windContent}>
//             <Icon name="wind" type="font-awesome-5" size={50} color="#fff" />
//             <View style={styles.windInfo}>
//               <Text style={styles.windText}>Direction: Southwest</Text>
//               <Text style={styles.windText}>Speed: 12-28 km/h</Text>
//             </View>
//           </View>
//         </View>

//         {/* Sunrise and Sunset Component */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>SUNRISE & SUNSET</Text>
//             <TouchableOpacity>
//               <Text style={styles.sectionButton}>MORE {'>'}</Text>
//             </TouchableOpacity>
//           </View>
//           {/* Add Sunrise and Sunset information here */}
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   locationText: {
//     fontSize: 24,
//     color: '#fff',
//     fontFamily: 'Roboto_700Bold',
//   },
//   headerButton: {
//     color: '#00008b',
//     marginTop: 10,
//     fontFamily: 'Roboto_400Regular',
//     fontSize: 16,
//   },
//   section: {
//     marginVertical: 20,
//     padding: 16,
//     backgroundColor: '#1e90ff',  // Viva Magenta
//     borderRadius: 10,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: '#fff',
//     fontFamily: 'Roboto_700Bold',
//   },
//   sectionButton: {
//     color: '#f0fff0',
//     marginTop:2,
//     fontSize:12,
//     fontFamily: 'Roboto_600Regular',
//   },
//   comfortLevelContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   progressText: {
//     color: '#fff',
//     fontSize: 24,
//   },
//   additionalInfo: {
//     flexDirection: 'column',
//   },
//   additionalText: {
//     color: '#fff',
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   windContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   windInfo: {
//     marginLeft: 20,
//   },
//   windText: {
//     color: '#fff',
//     fontSize: 16,
//     marginVertical: 2,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Icon } from '@rneui/themed';

export default function App() {
  return (
    <ImageBackground
      source={require("./assets/img/background.jpg")}
      style={styles.backgroundImage}
      blurRadius={20}
    >
    <ScrollView style={styles.container}>
      {/* Main Weather Info */}
      <View style={styles.mainWeather}>
        <Text style={styles.locationText}>Biyagama</Text>
        <Text style={styles.temperatureText}>28°</Text>
        <Text style={styles.weatherConditionText}>Partly cloudy</Text>
        <Text style={styles.rangeText}>31° / 28°</Text>
      </View>

      {/* Hourly Forecast */}
      <View style={styles.hourlyForecast}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Example hourly data */}
          {[
            { time: '11:00 PM', temp: '28°', icon: 'cloud' },
            { time: '12:00 AM', temp: '28°', icon: 'cloud' },
            { time: '1:00 AM', temp: '28°', icon: 'cloud-rain' },
            { time: '2:00 AM', temp: '28°', icon: 'cloud-showers-heavy' },
            { time: '3:00 AM', temp: '28°', icon: 'cloud' },
          ].map((hour, index) => (
            <View key={index} style={styles.hourContainer}>
              <Text style={styles.hourText}>{hour.time}</Text>
              <Icon name={hour.icon} type="font-awesome-5" size={24} color="#fff" />
              <Text style={styles.tempText}>{hour.temp}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 7-Day Forecast */}
      <View style={styles.weeklyForecast}>
        {[
          { day: 'Thu', condition: 'Showers', tempRange: '30° / 27°', icon: 'cloud-showers-heavy' },
          { day: 'Fri', condition: 'Showers', tempRange: '30° / 26°', icon: 'cloud-showers-heavy' },
          { day: 'Sat', condition: 'Cloudy', tempRange: '29° / 26°', icon: 'cloud' },
          { day: 'Sun', condition: 'T-storms', tempRange: '30° / 26°', icon: 'bolt' },
          { day: 'Mon', condition: 'T-storms', tempRange: '32° / 26°', icon: 'bolt' },
          { day: 'Mon', condition: 'Cloudy', tempRange: '32° / 26°', icon: 'cloud' },
          { day: 'Mon', condition: 'T-storms', tempRange: '32° / 26°', icon: 'bolt' },
          { day: 'Mon', condition: 'Cloudy', tempRange: '32° / 26°', icon: 'cloud' },
          { day: 'Mon', condition: 'Cloudy', tempRange: '32° / 26°', icon: 'cloud' },
        ].map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.day}</Text>
            <Icon name={day.icon} type="font-awesome-5" size={24} color="#fff" />
            <Text style={styles.tempRangeText}>{day.tempRange}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
  container: {
    flex: 1,
    padding: 16,
  },
  mainWeather: {
    alignItems: 'center',
    marginVertical: 20,
  },
  locationText: {
    fontSize: 24,
    color: '#fff',
  },
  temperatureText: {
    fontSize: 72,
    color: '#fff',
  },
  weatherConditionText: {
    fontSize: 24,
    color: '#fff',
  },
  rangeText: {
    fontSize: 18,
    color: '#fff',
  },
  hourlyForecast: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  hourContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourText: {
    color: '#fff',
  },
  tempText: {
    color: '#fff',
    fontSize: 16,
  },
  weeklyForecast: {
    marginVertical: 20,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#4682b4',
    borderRadius: 5,
    // Box Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Box Shadow for Android
    elevation: 5,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
  },
  tempRangeText: {
    color: '#fff',
    fontSize: 16,
  },
});


