import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from '@rneui/themed';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function weatherForcast() {
  return (
    <ImageBackground
      source={require("../assets/img/background.jpg")}
      style={styles.backgroundImage}
      blurRadius={70}
    >
      <ScrollView style={styles.container}>
        {/* Header Component */}
        <View style={styles.header}>
          <Text style={styles.locationText}>Biygamaa</Text>
          <TouchableOpacity>
            <Text style={styles.headerButton}>EXTENDED FORECAST {'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Comfort Level Component */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>COMFORT LEVEL</Text>
            <TouchableOpacity>
              <Text style={styles.sectionButton}>MORE {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.comfortLevelContent}>
            <AnimatedCircularProgress
              size={100}
              width={10}
              fill={83}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
              rotation={0}
              lineCap="round"
            >
              {() => <Text style={styles.progressText}>83%</Text>}
            </AnimatedCircularProgress>
            <View style={styles.additionalInfo}>
              <Text style={styles.additionalText}>Feels like 33°</Text>
              <Text style={styles.additionalText}>UV index 0 Low</Text>
            </View>
          </View>
        </View>

        {/* Wind Component */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>WIND</Text>
            <TouchableOpacity>
              <Text style={styles.sectionButton}>MORE {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.windContent}>
            <Icon name="wind" type="font-awesome-5" size={50} color="#fff" />
            <View style={styles.windInfo}>
              <Text style={styles.windText}>Direction: Southwest</Text>
              <Text style={styles.windText}>Speed: 12-28 km/h</Text>
            </View>
          </View>
        </View>

        {/* Sunrise and Sunset Component */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SUNRISE AND SUNSET</Text>
            <TouchableOpacity>
              <Text style={styles.sectionButton}>MORE {'>'}</Text>
            </TouchableOpacity>
          </View>
          {/* Add Sunrise and Sunset information here */}
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
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 24,
    color: '#fff',
  },
  headerButton: {
    color: '#bbb',
    marginTop: 10,
  },
  section: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#505050',
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
  },
  sectionButton: {
    color: '#bbb',
  },
  comfortLevelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    color: '#fff',
    fontSize: 24,
  },
  additionalInfo: {
    flexDirection: 'column',
  },
  additionalText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
  },
  windContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  windInfo: {
    marginLeft: 20,
  },
  windText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
  },
});
