import React from 'react'
import { View, Text } from 'react-native'

import styles from './welcome.style'
import { useRouter } from 'expo-router'

const Welcome = () => {
  const router  = useRouter()
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Shubham</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
    </View>
  )
}

export default Welcome