import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LiteracyIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Literacy Games</Text>

      {/* Flashcards */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/literacy/flashcards")}
      >
        <Text style={styles.buttonText}>Alphabet Flashcards</Text>
      </TouchableOpacity>

      {/* Word Puzzle */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/literacy/wordPuzzle")}
      >
        <Text style={styles.buttonText}>Word Puzzle</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
