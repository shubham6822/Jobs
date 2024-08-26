import React, { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'

import styles from './welcome.style'
import { useRouter } from 'expo-router'
import { icons, SIZES } from '../../../constants'

const Welcome = () => {
  const jobTypes = [
    'Full Time',
    'Part Time',
    'Remote',
  ]
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [activeJobType, setActiveJobType] = useState(jobTypes[0])
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Shubham</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder='What are you looking for?'
            value={search}
            onChange={(text) => setSearch(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Image source={icons.search} style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome