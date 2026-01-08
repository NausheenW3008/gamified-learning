import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RewardsScreen() {
  const [literacyStars, setLiteracyStars] = useState(0);
  const [numeracyStars, setNumeracyStars] = useState(0);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const loadStars = async () => {
      const l = await AsyncStorage.getItem("literacyStars");
      const n = await AsyncStorage.getItem("numeracyStars");

      if (l !== null) setLiteracyStars(parseInt(l));
      if (n !== null) setNumeracyStars(parseInt(n));
    };
    loadStars();

    // Fade-in + scale bounce animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const total = literacyStars + numeracyStars;

  const getBadge = () => {
    if (total >= 200) return "🏆 Genius Trophy";
    if (total >= 100) return "🥇 Top Learner";
    if (total >= 60) return "🎖️ Rising Star";
    if (total >= 30) return "🌟 Beginner Star";
    return "✨ Keep Playing!";
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.header}>🏅 Rewards & Achievements</Text>

          {/* Total Stars Card */}
          <View style={styles.card}>
            <Text style={styles.bigStar}>⭐</Text>
            <Text style={styles.totalStars}>{total} Stars</Text>
          </View>

          {/* Sub Stars */}
          <View style={styles.subCard}>
            <Text style={styles.subText}>📘 Literacy Stars: {literacyStars}</Text>
            <Text style={styles.subText}>🔢 Numeracy Stars: {numeracyStars}</Text>
          </View>

          {/* Badge Box */}
          <View style={styles.badgeBox}>
            <Text style={styles.badgeTitle}>Your Badge</Text>
            <Text style={styles.badge}>{getBadge()}</Text>
          </View>

          {/* Progress Box */}
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Next Badge At</Text>
            <Text style={styles.progressValue}>
              {total < 30
                ? "⭐ 30"
                : total < 60
                ? "⭐ 60"
                : total < 100
                ? "⭐ 100"
                : "⭐ 200"}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FDF8E4",
  },

  scrollContent: {
    paddingBottom: 50,
    alignItems: "center",
  },

  container: {
    paddingTop: 60,
    alignItems: "center",
    width: "100%",
  },

  header: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 25,
    color: "#FF6B6B",
  },

  card: {
    width: "80%",
    backgroundColor: "#FFE0B5",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
    elevation: 4,
  },

  bigStar: {
    fontSize: 50,
  },

  totalStars: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "900",
  },

  subCard: {
    width: "80%",
    backgroundColor: "#FFF4D9",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },

  subText: {
    fontSize: 20,
    fontWeight: "600",
  },

  badgeBox: {
    width: "80%",
    backgroundColor: "#FFD6E8",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
    elevation: 4,
  },

  badgeTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  badge: {
    fontSize: 28,
    fontWeight: "800",
  },

  progressCard: {
    width: "75%",
    backgroundColor: "#D8EFFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    marginBottom: 30,
  },

  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },

  progressValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#4A90E2",
  },
});
