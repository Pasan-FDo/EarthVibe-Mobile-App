import { View, Text, Button } from 'react-native'
import React from 'react'

const Nav = ({navigation}) => {
  return (
    <View>
      <Button onPress={()=>navigation.navigate('ClimateNetworkScreen')} title='ClimateNetworkScreen'/>
      <Button onPress={()=>navigation.navigate('DisasterForm')} title='DisasterForm'/>
      <Button onPress={()=>navigation.navigate('ClimateNetworkScreen')} title='ClimateNetworkScreen'/>
      <Button onPress={()=>navigation.navigate('LoginScreen')} title='Login'/>
      <Button onPress={()=>navigation.navigate('DisasterNewsListScreen')} title='DisasterNewsListScreen'/>
    </View>
  )
}

export default Nav