// app/numeracy/orderGame.tsx
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function uniqueRandomNumbers(count: number, min = 1, max = 9) {
  const set = new Set<number>();
  while (set.size < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(n);
  }
  return Array.from(set);
}

export default function NumberOrderGame() {
  const [numbers, setNumbers] = useState<number[]>(() => uniqueRandomNumbers(3));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);

  // Load numeracy stars on mount
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("numeracyStars");
      if (saved !== null) setStars(parseInt(saved, 10));
    })();
  }, []);

  // Helpers to persist
  const saveNumeracyStars = async (val: number) => {
    await AsyncStorage.setItem("numeracyStars", val.toString());
    setStars(val);
  };
  const increasePlays = async () => {
    const cur = await AsyncStorage.getItem("numeracyPlays");
    const next = cur ? parseInt(cur, 10) + 1 : 1;
    await AsyncStorage.setItem("numeracyPlays", next.toString());
  };

  // Swap two items
  const handlePress = async (idx: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(idx);
      return;
    }

    // swap
    const newArr = [...numbers];
    const tmp = newArr[selectedIndex];
    newArr[selectedIndex] = newArr[idx];
    newArr[idx] = tmp;
    setNumbers(newArr);
    setSelectedIndex(null);

    // check correct
    const sorted = [...newArr].slice().sort((a, b) => a - b);
    const isCorrect = sorted.every((v, i) => v === newArr[i]);

    if (isCorrect) {
      setMessage("🎉 Correct!");
      // award star + save plays
      const curStars = (await AsyncStorage.getItem("numeracyStars")) || "0";
      const newStars = parseInt(curStars, 10) + 1;
      await saveNumeracyStars(newStars);
      await increasePlays();

      // next round after short delay
      setTimeout(() => {
        setMessage("");
        setNumbers(uniqueRandomNumbers(3));
      }, 900);
    } else {
      // small feedback
      setMessage("Try swapping more!");
      setTimeout(() => setMessage(""), 700);
    }
  };

  const resetRound = () => {
    setNumbers(uniqueRandomNumbers(3));
    setSelectedIndex(null);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topStars}>⭐ {stars}</Text>

      <Text style={styles.title}>Order the numbers (small → large)</Text>

      <View style={styles.row}>
        {numbers.map((num, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handlePress(idx)}
              style={[
                styles.numBox,
                isSelected ? styles.selectedBox : null,
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.numText}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={resetRound}>
          <Text style={styles.btnText}>Shuffle / New</Text>
        </TouchableOpacity>
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Text style={styles.hint}>Tap one number, then tap another to swap.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topStars: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  numBox: {
    backgroundColor: "#f2f2f2",
    width: 90,
    height: 90,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  selectedBox: {
    backgroundColor: "#cfe9ff",
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  numText: {
    fontSize: 28,
    fontWeight: "800",
  },
  controls: {
    marginTop: 18,
    width: "80%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    width: "100%",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  message: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#2e7d32",
  },
  hint: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
});
