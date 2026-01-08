// app/literacy/index.tsx

import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { useRef, useEffect } from "react";
import { router } from "expo-router";

export default function LiteracyIndex() {
  const fadeAnim = useRef(new Animated.Value(0)).current;   // Screen fade
  const slide1 = useRef(new Animated.Value(300)).current;    // Flashcards slide
  const slide2 = useRef(new Animated.Value(300)).current;    // Word puzzle slide
  const scaleAnim = useRef(new Animated.Value(1)).current;   // Emoji bounce

  useEffect(() => {
    // Fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Slide cards with stagger animation
    Animated.stagger(200, [
      Animated.spring(slide1, { toValue: 0, useNativeDriver: true }),
      Animated.spring(slide2, { toValue: 0, useNativeDriver: true })
    ]).start();
  }, []);

  // Bounce animation on press
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
      <Text style={styles.header}>✨ Literacy Games ✨</Text>

      {/* FLASHCARDS */}
      <Animated.View style={{ transform: [{ translateX: slide1 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#FF6B6B" }]}
          onPress={() => {
            bounce();
            router.push("/literacy/flashcards");
          }}
        >
          <Animated.Text style={[styles.emoji, { transform: [{ scale: scaleAnim }] }]}>
            🔤
          </Animated.Text>

          <View>
            <Text style={styles.cardTitle}>Alphabet Flashcards</Text>
            <Text style={styles.cardDesc}>Learn A–Z with pictures & sounds</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* WORD PUZZLE */}
      <Animated.View style={{ transform: [{ translateX: slide2 }] }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: "#4ECDC4" }]}
          onPress={() => {
            bounce();
            router.push("/literacy/wordPuzzle");
          }}
        >
          <Animated.Text style={[styles.emoji, { transform: [{ scale: scaleAnim }] }]}>
            🧩
          </Animated.Text>

          <View>
            <Text style={styles.cardTitle}>Word Puzzle</Text>
            <Text style={styles.cardDesc}>Rearrange letters to form words</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

// 🎨 UI Styles
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
    color: "#FF6B6B",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
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

    // Shadow for iOS
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
