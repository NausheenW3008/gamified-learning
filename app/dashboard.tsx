import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function DashboardScreen() {
  const [literacyStars, setLiteracyStars] = useState(0);
  const [numeracyStars, setNumeracyStars] = useState(0);
  const [literacyPlays, setLiteracyPlays] = useState(0);
  const [numeracyPlays, setNumeracyPlays] = useState(0);
  const [lastPlayed, setLastPlayed] = useState("—");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // ⭐ Chart data states
  const [progressLabels, setProgressLabels] = useState(["Day 1", "Day 2", "Day 3"]);
  const [progressStars, setProgressStars] = useState([1, 3, 5]);

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

      // ⭐ Load progress history
      const stored = await AsyncStorage.getItem("progressHistory");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const labels = parsed.map((d: any, i: number) =>
              d?.date ? d.date.split(" ")[0] : `Day ${i + 1}`
            );
            const values = parsed.map((d: any) =>
              typeof d?.stars === "number" ? d.stars : 0
            );

            setProgressLabels(labels);
            setProgressStars(values);
          }
        } catch {}
      }
    };

    loadData();

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const totalStars = literacyStars + numeracyStars;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80, alignItems: "center" }}>
        <Animated.View
          style={{
            width: "100%",
            alignItems: "center",
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.title}>👨‍👩‍👧 Parent Dashboard</Text>

          {/* ⭐ TOTAL STARS */}
          <View style={[styles.box, styles.boxYellow]}>
            <Text style={styles.boxTitle}>Total Stars Earned</Text>
            <Text style={styles.bigText}>⭐ {totalStars}</Text>
            <Text style={styles.subText}>📘 Literacy: {literacyStars}</Text>
            <Text style={styles.subText}>🔢 Numeracy: {numeracyStars}</Text>
          </View>

          {/* ⭐ GAME PROGRESS */}
          <View style={[styles.box, styles.boxBlue]}>
            <Text style={styles.boxTitle}>Game Progress</Text>

            <Text style={styles.subText}>🧩 Literacy Game Plays: {literacyPlays}</Text>
            <Text style={styles.subText}>🔢 Numeracy Questions Solved: {numeracyPlays}</Text>
          </View>

          {/* ⭐ LAST PLAYED */}
          <View style={[styles.box, styles.boxPink]}>
            <Text style={styles.boxTitle}>Last Activity</Text>
            <Text style={styles.subText}>🗓️ Last Played: {lastPlayed}</Text>
          </View>

          {/* ⭐ ALWAYS-SHOWING LINE CHART */}
          <View style={[styles.box, styles.boxGreen]}>
            <Text style={styles.boxTitle}>Progress Over Time</Text>

            <LineChart
              data={{
                labels: progressLabels,
                datasets: [{ data: progressStars }],
              }}
              width={Dimensions.get("window").width * 0.8}
              height={220}
              yAxisSuffix="⭐"
              chartConfig={{
                backgroundGradientFrom: "#FDF8E4",
                backgroundGradientTo: "#FDF8E4",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
                labelColor: () => "#333",
              }}
              bezier
              style={{ borderRadius: 16, marginTop: 10 }}
            />
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FDF8E4",
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 25,
    color: "#FF6B6B",
  },
  box: {
    width: "85%",
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    elevation: 4,
  },
  boxYellow: {
    backgroundColor: "#FFE0B5",
  },
  boxBlue: {
    backgroundColor: "#D8EFFF",
  },
  boxPink: {
    backgroundColor: "#FFD6E8",
  },
  boxGreen: {
    backgroundColor: "#E6FFD8",
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  bigText: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 2,
  },
});
