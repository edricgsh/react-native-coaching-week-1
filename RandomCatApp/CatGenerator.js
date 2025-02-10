import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

const CatGenerator = () => {
  const [cats, setCats] = useState([
    {
      url: "https://cdn2.thecatapi.com/images/8cd.jpg",
    },
    {
      url: "https://cdn2.thecatapi.com/images/8ob.jpg",
    },
    {
      url: "https://cdn2.thecatapi.com/images/a0v.jpg",
    },
    {
      url: "https://cdn2.thecatapi.com/images/akf.jpg",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCats(5);
  }, []);

  const handleSubmit = () => {
    const numCats = parseInt(inputValue);

    if (numCats > 10) {
      setError("Maximum number of cats is 10");
      return;
    }

    setError("");
    fetchCats(numCats);
  };

  const fetchCats = async (count) => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${count}`
      );
      const data = await response.json();
      setCats(data.slice(0, count));
    } catch (error) {
      setError("Failed to fetch cats");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Surface style={styles.surface}>
          <Text variant="titleLarge" style={styles.title}>
            {cats.length
              ? `${cats.length} number of cats has been found!`
              : "Random Cat Generator"}
          </Text>

          <View style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.imageGrid}>
                {cats.map((cat, index) => (
                  <Surface
                    key={`${cat.id}-${index}`}
                    style={styles.imageSurface}
                  >
                    <Image source={{ uri: cat.url }} style={styles.image} />
                  </Surface>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
              label="Number of cats"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Submit
            </Button>
          </View>
        </Surface>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  surface: {
    height: "80%",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 5,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  imageGrid: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  imageSurface: {
    width: (windowWidth - 32 - 32 - 30) / 2,
    height: (windowWidth - 32 - 32 - 30) / 2,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fb923c",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  inputContainer: {
    gap: 16,
    flex: 3,
  },
  input: {
    backgroundColor: "white",
  },
  button: {
    paddingVertical: 6,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default CatGenerator;
