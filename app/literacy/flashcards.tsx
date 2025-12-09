import { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LiteracyScreen() {
  const flashcards = [
    { letter: "A", word: "Apple", image: require("../../assets/alphabet/apple.png"), sound: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg" },
    { letter: "B", word: "Ball", image: require("../../assets/alphabet/ball.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "C", word: "Cat", image: require("../../assets/alphabet/cat.png"), sound: "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg" },
    { letter: "D", word: "Dog", image: require("../../assets/alphabet/dog.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "E", word: "Elephant", image: require("../../assets/alphabet/elephant.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "F", word: "Fish", image: require("../../assets/alphabet/fish.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "G", word: "Grapes", image: require("../../assets/alphabet/grapes.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "H", word: "Hat", image: require("../../assets/alphabet/hat.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "I", word: "Ice Cream", image: require("../../assets/alphabet/i.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "J", word: "Juice", image: require("../../assets/alphabet/j.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "K", word: "Kite", image: require("../../assets/alphabet/k.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "L", word: "Lion", image: require("../../assets/alphabet/l.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "M", word: "Monkey", image: require("../../assets/alphabet/m.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "N", word: "Nest", image: require("../../assets/alphabet/n.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "O", word: "Orange", image: require("../../assets/alphabet/o.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "P", word: "Penguin", image: require("../../assets/alphabet/p.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "Q", word: "Queen", image: require("../../assets/alphabet/q.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "R", word: "Rabbit", image: require("../../assets/alphabet/r.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "S", word: "Sun", image: require("../../assets/alphabet/s.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "T", word: "Tiger", image: require("../../assets/alphabet/t.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "U", word: "Umbrella", image: require("../../assets/alphabet/u.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "V", word: "Van", image: require("../../assets/alphabet/v.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "W", word: "Watch", image: require("../../assets/alphabet/w.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "X", word: "Xylophone", image: require("../../assets/alphabet/x.png"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "Y", word: "Yacht", image: require("../../assets/alphabet/y.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
    { letter: "Z", word: "Zebra", image: require("../../assets/alphabet/z.jpg"), sound: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" },
  ];

  const [index, setIndex] = useState(0);

  // ⭐ ADD STAR + FLASHCARD COUNT + LAST PLAYED
  const updateProgress = async () => {
    // stars
    const currentStars = await AsyncStorage.getItem("literacyStars");
    const newStarValue = currentStars ? parseInt(currentStars) + 1 : 1;
    await AsyncStorage.setItem("literacyStars", newStarValue.toString());

    // flashcards completed
    const plays = await AsyncStorage.getItem("literacyPlays");
    const newPlayValue = plays ? parseInt(plays) + 1 : 1;
    await AsyncStorage.setItem("literacyPlays", newPlayValue.toString());

    // last activity
    const today = new Date().toDateString();
    await AsyncStorage.setItem("lastPlayed", today);
  };

  const nextCard = async () => {
    await updateProgress();
    setIndex((i) => (i + 1) % flashcards.length);
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: flashcards[index].sound });
      await sound.playAsync();
    } catch (e) {
      console.log("Sound error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alphabet Flashcards</Text>

      <View style={styles.card}>
        <Text style={styles.letter}>{flashcards[index].letter}</Text>
        <Image source={flashcards[index].image} style={styles.image} />
        <Text style={styles.word}>{flashcards[index].word}</Text>
      </View>

      <Button title="Play Sound" onPress={playSound} />
      <View style={{ height: 12 }} />
      <Button title="Next" onPress={nextCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: { width: 250, height: 300, borderWidth: 2, borderRadius: 10, justifyContent: "center", alignItems: "center", padding: 10 },
  letter: { fontSize: 60, fontWeight: "bold" },
  image: { width: 150, height: 150, marginVertical: 10, resizeMode: "contain" },
  word: { fontSize: 22, fontWeight: "600" }
});
