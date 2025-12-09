// app/numeracy/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function NumeracyIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Numeracy Games</Text>

      {/* Match Numbers Game */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/numeracy/matchNumbers")}
      >
        <Text style={styles.buttonText}>Match Number to Objects</Text>
      </TouchableOpacity>

      {/* Number Order Game */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/numeracy/orderGame")}
      >
        <Text style={styles.buttonText}>Number Ordering (Swap)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
