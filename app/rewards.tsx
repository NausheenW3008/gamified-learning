import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RewardsScreen() {
  const [literacyStars, setLiteracyStars] = useState(0);
  const [numeracyStars, setNumeracyStars] = useState(0);

  useEffect(() => {
    const loadStars = async () => {
      const l = await AsyncStorage.getItem("literacyStars");
      const n = await AsyncStorage.getItem("numeracyStars");

      if (l !== null) setLiteracyStars(parseInt(l));
      if (n !== null) setNumeracyStars(parseInt(n));
    };
    loadStars();
  }, []);

  const total = literacyStars + numeracyStars;

  const getBadge = () => {
    if (total >= 100) return "🏆 Genius Trophy";
    if (total >= 60) return "🥇 Top Learner";
    if (total >= 30) return "🎖️ Rising Star";
    if (total >= 15) return "🌟 Beginner Star";
    return "✨ Keep Playing!";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Rewards</Text>

      <Text style={styles.starCount}>⭐ Total Stars: {total}</Text>

      <Text style={styles.subStars}>📘 Literacy Stars: {literacyStars}</Text>
      <Text style={styles.subStars}>🔢 Numeracy Stars: {numeracyStars}</Text>

      <View style={styles.badgeBox}>
        <Text style={styles.badgeTitle}>Unlocked Badge:</Text>
        <Text style={styles.badge}>{getBadge()}</Text>
      </View>

      <View style={styles.progressBox}>
        <Text style={styles.progressText}>
          Next badge at:{" "}
          {total < 5
            ? "⭐ 5"
            : total < 10
            ? "⭐ 10"
            : total < 20
            ? "⭐ 20"
            : "⭐ 30"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  starCount: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 15,
  },
  subStars: {
    fontSize: 20,
    marginBottom: 5,
  },
  badgeBox: {
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginTop: 25,
  },
  badgeTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  badge: {
    fontSize: 28,
    fontWeight: "700",
  },
  progressBox: {
    backgroundColor: "#e8e8e8",
    padding: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginTop: 30,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
