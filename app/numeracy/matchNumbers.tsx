import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NumeracyMatch() {
  const numbers = [1, 2, 3, 4, 5];
  const emojis = ["🍎", "⭐", "🐶", "🧸", "🍭", "🌸", "🎈"];

  const getRandomTarget = () =>
    numbers[Math.floor(Math.random() * numbers.length)];

  const [target, setTarget] = useState(getRandomTarget());
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");

  // LOAD STARS
  useEffect(() => {
    const loadStars = async () => {
      const saved = await AsyncStorage.getItem("numeracyStars");
      if (saved !== null) setStars(parseInt(saved));
    };
    loadStars();
  }, []);

  // SAVE STAR
  const saveStar = async () => {
    const newStarValue = stars + 1;
    setStars(newStarValue);
    await AsyncStorage.setItem("numeracyStars", newStarValue.toString());

    // update numeracy play count
    const plays = await AsyncStorage.getItem("numeracyPlays");
    const newPlayValue = plays ? parseInt(plays) + 1 : 1;
    await AsyncStorage.setItem("numeracyPlays", newPlayValue.toString());

    // last played
    const today = new Date().toDateString();
    await AsyncStorage.setItem("lastPlayed", today);
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
      setMessage("🎉 Correct!");
      saveStar();

      setTimeout(() => {
        const newTarget = getRandomTarget();
        setTarget(newTarget);
        setOptions(generateOptions(newTarget));
        setMessage("");
      }, 700);
    } else {
      setMessage("❌ Try Again");
      setTimeout(() => setMessage(""), 600);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stars}>⭐ {stars}</Text>

      <Text style={styles.title}>Match Number to Objects</Text>

      <Text style={styles.objects}>{getEmojiGroup(target)}</Text>

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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  stars: { position: "absolute", top: 50, right: 20, fontSize: 28, fontWeight: "bold" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  objects: { fontSize: 42, marginBottom: 15, textAlign: "center" },
  subtitle: { fontSize: 22, marginBottom: 10 },
  optionsContainer: { flexDirection: "row", gap: 20, marginTop: 10 },
  option: { backgroundColor: "#f1f1f1", padding: 18, borderRadius: 10, minWidth: 60, alignItems: "center" },
  optionText: { fontSize: 24, fontWeight: "bold" },
  message: { fontSize: 26, marginTop: 25, fontWeight: "bold" },
});
