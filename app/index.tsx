import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gamified Learning</Text>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Play Literacy Game"
          onPress={() => router.push("/literacy")}
        />

        <View style={{ height: 12 }} />

        <Button
          title="Play Numeracy Game"
          onPress={() => router.push("/numeracy")}
        />

        <View style={{ height: 12 }} />

        <Button
          title="Rewards"
          onPress={() => router.push("/rewards")}
        />

        <View style={{ height: 12 }} />

        <Button
          title="Parent Dashboard"
          onPress={() => router.push("/dashboard")}
        />
      </View>
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
    fontSize: 26,
    fontWeight: "bold",
  },
});
