import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NumeracyMatch() {
  const numbers = [1, 2, 3, 4, 5];
  const emojis = ["🍎", "⭐", "🐶", "🧸", "🍭", "🌸", "🎈"];

  const getRandomTarget = () =>
    numbers[Math.floor(Math.random() * numbers.length)];

  const [target, setTarget] = useState(getRandomTarget());
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");

  // --- Animation ---
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePop = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 140, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  // Load stars
  useEffect(() => {
    const loadStars = async () => {
      const saved = await AsyncStorage.getItem("numeracyStars");
      if (saved !== null) setStars(parseInt(saved));
    };
    loadStars();
  }, []);

  // Save stars
  const saveStar = async () => {
    const newStarValue = stars + 1;
    setStars(newStarValue);
    await AsyncStorage.setItem("numeracyStars", newStarValue.toString());

    const plays = await AsyncStorage.getItem("numeracyPlays");
    const newPlayValue = plays ? parseInt(plays) + 1 : 1;
    await AsyncStorage.setItem("numeracyPlays", newPlayValue.toString());

    await AsyncStorage.setItem("lastPlayed", new Date().toDateString());
  };

  const getEmojiGroup = (count: number) => {
    const e = emojis[Math.floor(Math.random() * emojis.length)];
    return e.repeat(count);
  };

  const generateOptions = (correct: number) => {
    let wrongs = numbers.filter((n) => n !== correct);
    wrongs.sort(() => Math.random() - 0.5);

    const opts = [correct, wrongs[0], wrongs[1]];
    return opts.sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(generateOptions(target));

  const handleSelect = (num: number) => {
    if (num === target) {
      animatePop();
      setMessage("🎉 Correct!");
      saveStar();

      setTimeout(() => {
        const newTarget = getRandomTarget();
        setTarget(newTarget);
        setOptions(generateOptions(newTarget));
        setMessage("");
      }, 800);
    } else {
      setMessage("❌ Try Again");
      setTimeout(() => setMessage(""), 700);
    }
  };

  return (
    <View style={styles.container}>
      {/* Stars */}
      <Text style={styles.stars}>⭐ {stars}</Text>

      <Text style={styles.title}>Match Number to Objects</Text>

      {/* Emoji Group with Animation */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Text style={styles.objects}>{getEmojiGroup(target)}</Text>
      </Animated.View>

      <Text style={styles.subtitle}>How many?</Text>

      <View style={styles.optionsContainer}>
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

      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

// --------------------- Styles ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8E4",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  stars: {
    position: "absolute",
    top: 50,
    right: 20,
    fontSize: 28,
    fontWeight: "900",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#4A90E2",
    marginBottom: 25,
  },
  objects: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 15,
    color: "#555",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  option: {
    backgroundColor: "#FFDAC1",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
  },
  optionText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#333",
  },
  message: {
    fontSize: 28,
    marginTop: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
