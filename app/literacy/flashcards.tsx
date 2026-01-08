import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  withSpring 
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Flashcards() {
  const flashcards = [
    { letter: "A", word: "Apple", image: require("../../assets/alphabet/apple.png") },
    { letter: "B", word: "Ball", image: require("../../assets/alphabet/ball.png") },
    { letter: "C", word: "Cat", image: require("../../assets/alphabet/cat.png") },
    { letter: "D", word: "Dog", image: require("../../assets/alphabet/dog.png") },
    { letter: "E", word: "Elephant", image: require("../../assets/alphabet/elephant.jpg") },
    { letter: "F", word: "Fish", image: require("../../assets/alphabet/fish.jpg") },
    { letter: "G", word: "Grapes", image: require("../../assets/alphabet/grapes.jpg") },
    { letter: "H", word: "Hat", image: require("../../assets/alphabet/hat.jpg") },
    { letter: "I", word: "Ice Cream", image: require("../../assets/alphabet/i.jpg") },
    { letter: "J", word: "Juice", image: require("../../assets/alphabet/j.jpg") },
    { letter: "K", word: "Kite", image: require("../../assets/alphabet/k.jpg") },
    { letter: "L", word: "Lion", image: require("../../assets/alphabet/l.png") },
    { letter: "M", word: "Monkey", image: require("../../assets/alphabet/m.jpg") },
    { letter: "N", word: "Nest", image: require("../../assets/alphabet/n.jpg") },
    { letter: "O", word: "Orange", image: require("../../assets/alphabet/o.jpg") },
    { letter: "P", word: "Penguin", image: require("../../assets/alphabet/p.png") },
    { letter: "Q", word: "Queen", image: require("../../assets/alphabet/q.png") },
    { letter: "R", word: "Rabbit", image: require("../../assets/alphabet/r.png") },
    { letter: "S", word: "Sun", image: require("../../assets/alphabet/s.jpg") },
    { letter: "T", word: "Tiger", image: require("../../assets/alphabet/t.png") },
    { letter: "U", word: "Umbrella", image: require("../../assets/alphabet/u.jpg") },
    { letter: "V", word: "Van", image: require("../../assets/alphabet/v.jpg") },
    { letter: "W", word: "Watch", image: require("../../assets/alphabet/w.png") },
    { letter: "X", word: "Xylophone", image: require("../../assets/alphabet/x.png") },
    { letter: "Y", word: "Yacht", image: require("../../assets/alphabet/y.jpg") },
    { letter: "Z", word: "Zebra", image: require("../../assets/alphabet/z.jpg") },
  ];

  const [index, setIndex] = useState(0);

  // ANIMATION VALUE
  const scale = useSharedValue(1);

  // BOUNCE + FADE ANIMATION
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    };
  });

  const animateCard = () => {
    scale.value = withSequence(
      withTiming(0.6, { duration: 150 }),
      withSpring(1.05),
      withSpring(1)
    );
  };

  // SAVE PROGRESS
  const updateProgress = async () => {
    const currentStars = await AsyncStorage.getItem("literacyStars");
    const newStarValue = currentStars ? parseInt(currentStars) + 1 : 1;
    await AsyncStorage.setItem("literacyStars", newStarValue.toString());

    const plays = await AsyncStorage.getItem("literacyPlays");
    const newPlayValue = plays ? parseInt(plays) + 1 : 1;
    await AsyncStorage.setItem("literacyPlays", newPlayValue.toString());

    const today = new Date().toDateString();
    await AsyncStorage.setItem("lastPlayed", today);
  };

  const nextCard = async () => {
    animateCard();
    await updateProgress();
    setIndex((i) => (i + 1) % flashcards.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Alphabet Flashcards ✨</Text>

      {/* Animated Card */}
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.letter}>{flashcards[index].letter}</Text>
        <Image source={flashcards[index].image} style={styles.image} />
        <Text style={styles.word}>{flashcards[index].word}</Text>
      </Animated.View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={nextCard}>
        <Text style={styles.nextText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
}

// ------------------- STYLES -------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 30,
    color: "#FF6B6B",
  },
  card: {
    width: 270,
    height: 360,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  letter: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginVertical: 15,
  },
  word: {
    fontSize: 26,
    fontWeight: "700",
    color: "#555",
  },
  nextBtn: {
    marginTop: 25,
    backgroundColor: "#4ECDC4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
  },
  nextText: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
  },
});
