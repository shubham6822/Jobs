import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFecth";
import axios from "axios";

const Popularjobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState();
  const [jobs, setJobs] = useState([]);

  const fetchjobs = async () => {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: "React developer",
        num_pages: "1",
      },
      headers: {
        'x-rapidapi-key': 'f098f2b966mshdda4ba10129c67fp1eaa18jsn1e7f04676b51',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    };

    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error(error);
    }
  }


  useEffect(() => {
    fetchjobs();
  }
    , []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;