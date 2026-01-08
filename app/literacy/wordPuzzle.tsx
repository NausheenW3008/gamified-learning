import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WordPuzzle() {
  const puzzles = [
    { word: "DOG" },
    { word: "CAT" },
    { word: "SUN" },
    { word: "HAT" },
    { word: "MAP" },
    { word: "BAT" },
  ];

  const getRandomPuzzle = () =>
    puzzles[Math.floor(Math.random() * puzzles.length)];

  const [puzzle, setPuzzle] = useState(getRandomPuzzle());
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const scaleAnim = new Animated.Value(1);

  // Animate button press
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 120, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  // Shuffle letters
  useEffect(() => {
    const letters = puzzle.word.split("");
    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
    setShuffled(shuffledLetters);
  }, [puzzle]);

  // Add stars
  const addLiteracyStar = async () => {
    const current = await AsyncStorage.getItem("literacyStars");
    const newVal = current ? parseInt(current) + 1 : 1;
    await AsyncStorage.setItem("literacyStars", newVal.toString());
  };

  const pressLetter = (letter: string) => {
    animatePress();
    setAnswer((prev) => prev + letter);
  };

  const checkAnswer = async () => {
    if (answer === puzzle.word) {
      setMessage("🎉 Correct!");
      await addLiteracyStar();

      setTimeout(() => {
        setMessage("");
        setAnswer("");
        setPuzzle(getRandomPuzzle());
      }, 1200);
    } else {
      setMessage("❌ Try Again!");
      setTimeout(() => setMessage(""), 900);
    }
  };

  const clearAnswer = () => setAnswer("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧩 Word Puzzle</Text>
      <Text style={styles.subtitle}>Arrange the letters to form a word</Text>

      {/* ANSWER BOX */}
      <View style={styles.answerBox}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>

      {/* LETTER BUTTONS */}
      <Animated.View style={[styles.lettersContainer, { transform: [{ scale: scaleAnim }] }]}>
        {shuffled.map((letter, idx) => (
          <TouchableOpacity key={idx} style={styles.letterBtn} onPress={() => pressLetter(letter)}>
            <Text style={styles.letter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* BUTTONS */}
      <TouchableOpacity style={styles.checkBtn} onPress={checkAnswer}>
        <Text style={styles.checkText}>Check</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearBtn} onPress={clearAnswer}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>

      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: "#FDF8E4",
  },
  header: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
    color: "#FF6B6B",
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 20,
    color: "#555",
  },
  answerBox: {
    width: "80%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#FFD93D",
  },
  answerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
  },
  lettersContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  letterBtn: {
    backgroundColor: "#FFDAC1",
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 12,
    elevation: 3,
  },
  letter: {
    fontSize: 28,
    fontWeight: "900",
    color: "#333",
  },
  checkBtn: {
    backgroundColor: "#4ECDC4",
    padding: 14,
    borderRadius: 12,
    width: "55%",
    alignItems: "center",
    marginBottom: 10,
  },
  checkText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  clearBtn: {
    backgroundColor: "#888",
    padding: 12,
    borderRadius: 12,
    width: "55%",
    alignItems: "center",
  },
  clearText: {
    color: "white",
    fontSize: 18,
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
});
