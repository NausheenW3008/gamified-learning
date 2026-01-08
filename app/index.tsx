// app/index.tsx

import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { router } from "expo-router";

export default function HomeScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide1 = useRef(new Animated.Value(300)).current;
  const slide2 = useRef(new Animated.Value(300)).current;
  const slide3 = useRef(new Animated.Value(300)).current;
  const slide4 = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.stagger(150, [
      Animated.spring(slide1, { toValue: 0, useNativeDriver: true }),
      Animated.spring(slide2, { toValue: 0, useNativeDriver: true }),
      Animated.spring(slide3, { toValue: 0, useNativeDriver: true }),
      Animated.spring(slide4, { toValue: 0, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fade }]}>
      <Text style={styles.header}>🎓 Gamified Learning App</Text>

      {/* Literacy */}
      <Animated.View style={{ transform: [{ translateX: slide1 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#FF6B6B" }]}
          onPress={() => router.push("/literacy")}
        >
          <Text style={styles.emoji}>🔤</Text>
          <View>
            <Text style={styles.cardTitle}>Literacy Games</Text>
            <Text style={styles.cardDesc}>Flashcards & word puzzles</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Numeracy */}
      <Animated.View style={{ transform: [{ translateX: slide2 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#4ECDC4" }]}
          onPress={() => router.push("/numeracy")}
        >
          <Text style={styles.emoji}>🔢</Text>
          <View>
            <Text style={styles.cardTitle}>Numeracy Games</Text>
            <Text style={styles.cardDesc}>Count, match & number order</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Rewards */}
      <Animated.View style={{ transform: [{ translateX: slide3 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#FFD93D" }]}
          onPress={() => router.push("/rewards")}
        >
          <Text style={styles.emoji}>🏅</Text>
          <View>
            <Text style={styles.cardTitle}>Rewards</Text>
            <Text style={styles.cardDesc}>Stars & badges earned</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Dashboard */}
      <Animated.View style={{ transform: [{ translateX: slide4 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#7F6CF3" }]}
          onPress={() => router.push("/dashboard")}
        >
          <Text style={styles.emoji}>📊</Text>
          <View>
            <Text style={styles.cardTitle}>Parent Dashboard</Text>
            <Text style={styles.cardDesc}>Track learning progress</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8E4",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 35,
    color: "#FF6B6B",
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    borderLeftWidth: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  emoji: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 2,
    color: "#666",
  },
});
