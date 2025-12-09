import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

  // Shuffle letters on puzzle load
  useEffect(() => {
    const letters = puzzle.word.split(""); // Always valid string[]
    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
    setShuffled(shuffledLetters);
  }, [puzzle]);

  // ⭐ Add literacy star
  const addLiteracyStar = async () => {
    const current = await AsyncStorage.getItem("literacyStars");
    const newVal = current ? parseInt(current) + 1 : 1;
    await AsyncStorage.setItem("literacyStars", newVal.toString());
  };

  const pressLetter = (letter: string) => {
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
      <Text style={styles.title}>Word Puzzle</Text>
      <Text style={styles.subtitle}>Arrange the letters to form a word</Text>

      <View style={styles.answerBox}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>

      <View style={styles.lettersContainer}>
        {shuffled.map((letter, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.letterBtn}
            onPress={() => pressLetter(letter)}
          >
            <Text style={styles.letter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.checkBtn} onPress={checkAnswer}>
        <Text style={styles.checkText}>Check</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearBtn} onPress={clearAnswer}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>

      {message !== "" && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 25,
  },
  answerBox: {
    width: "80%",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  answerText: {
    fontSize: 22,
    fontWeight: "600",
  },
  lettersContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 25,
  },
  letterBtn: {
    backgroundColor: "#eee",
    padding: 17,
    borderRadius: 10,
  },
  letter: {
    fontSize: 23,
    fontWeight: "bold",
  },
  checkBtn: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
    marginBottom: 10,
  },
  checkText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  clearBtn: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  clearText: {
    color: "white",
    fontSize: 17,
  },
  message: {
    fontSize: 26,
    marginTop: 20,
    fontWeight: "bold",
  },
});
