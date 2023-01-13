import { useEffect, useState } from "react";
import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";

export default function DallE() {
  const [imageUrl, setImageUrl] = useState("");

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: "A fresh lemon",
        n: 1,
        size: "256x256",
      });
      setImageUrl(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    generateImage();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        {imageUrl.length > 0 ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <Text style={styles.titleText}>Sad Face</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin",
    textAlign: "center",
  },
});
