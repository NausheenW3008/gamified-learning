// app/numeracy/index.tsx

import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

export default function NumeracyIndex() {
  const fadeAnim = useRef(new Animated.Value(0)).current;         // screen fade
  const slide1 = useRef(new Animated.Value(300)).current;         // card 1 slide-in
  const slide2 = useRef(new Animated.Value(300)).current;         // card 2 slide-in
  const scaleAnim = useRef(new Animated.Value(1)).current;        // emoji scale

  useEffect(() => {
    // Fade-in screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Slide-in cards with stagger
    Animated.stagger(200, [
      Animated.spring(slide1, { toValue: 0, useNativeDriver: true }),
      Animated.spring(slide2, { toValue: 0, useNativeDriver: true }),
    ]).start();
  }, []);

  const bounce = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 120,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>✨ Numeracy Games ✨</Text>

      {/* Match Numbers */}
      <Animated.View style={{ transform: [{ translateX: slide1 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#4A90E2" }]}
          onPress={() => {
            bounce();
            router.push("/numeracy/matchNumbers");
          }}
        >
          <Animated.Text style={[styles.emoji, { transform: [{ scale: scaleAnim }] }]}>
            🔢
          </Animated.Text>

          <View>
            <Text style={styles.cardTitle}>Match Number to Objects</Text>
            <Text style={styles.cardDesc}>
              Count objects & pick the correct number
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Number Ordering */}
      <Animated.View style={{ transform: [{ translateX: slide2 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#F7B731" }]}
          onPress={() => {
            bounce();
            router.push("/numeracy/addGame");
          }}
        >
          <Animated.Text style={[styles.emoji, { transform: [{ scale: scaleAnim }] }]}>
            ➕
          </Animated.Text>

          <View>
            <Text style={styles.cardTitle}> Add Game</Text>
            <Text style={styles.cardDesc}>
              Count and add numbers
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8E4",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 30,
    color: "#4A90E2",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 4,
    borderLeftWidth: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
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
