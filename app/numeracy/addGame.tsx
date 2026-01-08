// app/numeracy/addGame.tsx
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddGame() {
  const emojis = ["🍎", "⭐", "🧸", "🍭", "🌸", "🐶", "🎈", "🍪"];

  const getRand = () => Math.floor(Math.random() * 4) + 1; // 1–4
  const getEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

  // two groups of emojis: a + b
  const [a, setA] = useState(getRand());
  const [b, setB] = useState(getRand());
  const [emoji, setEmoji] = useState(getEmoji());

  const correct = a + b;

  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");

  // animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("numeracyStars");
      if (saved) setStars(parseInt(saved));
    })();
  }, []);

  const saveStar = async () => {
    const newVal = stars + 1;
    setStars(newVal);
    await AsyncStorage.setItem("numeracyStars", newVal.toString());

    const plays = await AsyncStorage.getItem("numeracyPlays");
    const newPlays = plays ? parseInt(plays) + 1 : 1;
    await AsyncStorage.setItem("numeracyPlays", newPlays.toString());

    const today = new Date().toDateString();
    await AsyncStorage.setItem("lastPlayed", today);
  };

  const regenerate = () => {
    setA(getRand());
    setB(getRand());
    setEmoji(getEmoji());
  };

  const triggerAnimation = (msg: string) => {
    setMessage(msg);

    fadeAnim.setValue(0);
    scaleAnim.setValue(0.7);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => setMessage(""), 700);
    });
  };

  const handleSelect = async (num: number) => {
    if (num === correct) {
      await saveStar();
      triggerAnimation("🎉 Correct!");
      setTimeout(() => regenerate(), 700);
    } else {
      triggerAnimation("❌ Try Again");
    }
  };

  const rowA = Array(a).fill(emoji).join(" ");
  const rowB = Array(b).fill(emoji).join(" ");

  const options = [correct, correct + 1, correct - 1]
    .filter((n) => n > 0)
    .sort(() => Math.random() - 0.5);

  return (
    <View style={styles.container}>
      <Text style={styles.stars}>⭐ {stars}</Text>

      <Text style={styles.title}>Addition Game</Text>
      <Text style={styles.subtitle}>Add the emojis</Text>

      <Text style={styles.objects}>{rowA}</Text>
      <Text style={styles.plus}>+</Text>
      <Text style={styles.objects}>{rowB}</Text>

      <Text style={styles.equals}>= ?</Text>

      <View style={styles.options}>
        {options.map((num, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.option}
            onPress={() => handleSelect(num)}
          >
            <Text style={styles.optionText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {message !== "" && (
        <Animated.Text
          style={[
            styles.message,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {message}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, alignItems: "center", backgroundColor: "#FDF8E4" },

  stars: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 26,
    fontWeight: "800",
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FF6B6B",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    marginBottom: 25,
  },

  objects: {
    fontSize: 45,
    marginBottom: 10,
    textAlign: "center",
  },

  plus: {
    fontSize: 40,
    fontWeight: "900",
    marginVertical: 5,
    color: "#333",
  },

  equals: {
    fontSize: 40,
    fontWeight: "900",
    marginVertical: 10,
    color: "#333",
  },

  options: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },

  option: {
    backgroundColor: "#FFF",
    paddingVertical: 20,
    paddingHorizontal: 26,
    borderRadius: 16,
    elevation: 2,
  },

  optionText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
  },

  message: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 25,
  },
});
