import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardScreen() {
  const [literacyStars, setLiteracyStars] = useState(0);
  const [numeracyStars, setNumeracyStars] = useState(0);

  const [literacyPlays, setLiteracyPlays] = useState(0);
  const [numeracyPlays, setNumeracyPlays] = useState(0);

  const [lastPlayed, setLastPlayed] = useState("—");

  useEffect(() => {
    const loadData = async () => {
      const lStars = await AsyncStorage.getItem("literacyStars");
      const nStars = await AsyncStorage.getItem("numeracyStars");

      const lPlays = await AsyncStorage.getItem("literacyPlays");
      const nPlays = await AsyncStorage.getItem("numeracyPlays");

      const last = await AsyncStorage.getItem("lastPlayed");

      if (lStars) setLiteracyStars(parseInt(lStars));
      if (nStars) setNumeracyStars(parseInt(nStars));

      if (lPlays) setLiteracyPlays(parseInt(lPlays));
      if (nPlays) setNumeracyPlays(parseInt(nPlays));

      if (last) setLastPlayed(last);
    };

    loadData();
  }, []);

  const totalStars = literacyStars + numeracyStars;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Dashboard</Text>

      {/* Total Stars */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Total Stars Earned</Text>
        <Text style={styles.bigText}>⭐ {totalStars}</Text>

        <Text style={styles.subText}>📘 Literacy: {literacyStars}</Text>
        <Text style={styles.subText}>🔢 Numeracy: {numeracyStars}</Text>
      </View>

      {/* Game Progress */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Game Progress</Text>

        <Text style={styles.subText}>
          📘 Flashcards Completed: {literacyPlays}
        </Text>

        <Text style={styles.subText}>
          🔢 Numeracy Questions Answered: {numeracyPlays}
        </Text>
      </View>

      {/* Last Played */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Last Activity</Text>
        <Text style={styles.subText}>
          🗓️ Last Played: {lastPlayed}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },
  box: {
    width: "85%",
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  bigText: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    marginVertical: 2,
  },
});
