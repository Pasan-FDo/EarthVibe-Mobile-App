import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
  const router= useRouter()
  return (
    <View>
      <Button onPress={()=>router.push('login')} title='login'/>
      <Button onPress={()=>router.push('register')} title='reg'/>
      <Button onPress={()=>router.push('profile')} title='profile'/>
    </View>
  )
}

export default Home