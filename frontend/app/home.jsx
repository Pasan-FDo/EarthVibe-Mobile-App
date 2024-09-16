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
      <Button onPress={()=>router.push('greenInvestment')} title='greenInvestment'/>
      <Button onPress={()=>router.push('investmentForm')} title='investmentForm'/>
      <Button onPress={()=>router.push('whether')} title='whether'/>
      <Button onPress={()=>router.push('climateNetwork')} title='climateNetwork'/>
      <Button onPress={()=>router.push('disasterNewsList')} title='disasterNewsList'/> 
      <Button onPress={()=>router.push('disasterAllert')} title='disasterAllert'/> 
      <Button onPress={()=>router.push('event')} title='event'/> 
      <Button onPress={()=>router.push('eventForm')} title='eventForm'/> 
      <Button onPress={()=>router.push('eventPost')} title='eventPost'/> 
      <Button onPress={()=>router.push('tipsForm')} title='tipsForm'/> 
      <Button onPress={()=>router.push('tipsList')} title='tipsList'/> 
      
      
      
      
      
      
    </View>
  )
}

export default Home