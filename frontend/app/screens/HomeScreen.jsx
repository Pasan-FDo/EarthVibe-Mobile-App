import { View, Text, Button,StatusBar } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const HomeScreen = ({navigation}) => {
  const router= useRouter()
  return (
    <View>
       
      <Text>Home Screen!</Text>      
    </View>
  )
}

export default HomeScreen