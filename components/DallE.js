import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";

export default function DallE() {
  const [imageUrl, setImageUrl] = useState("");
  const [test, setTest] = useState("");

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

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

  const setLemon = () => {
    setTest(
      "https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638"
    );
  };

  useEffect(() => {
    // generateImage();
    setLemon();
  }, []);

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {test.length > 0 ? (
          <Image
            style={styles.image}
            source={{
              uri: test,
            }}
          />
        ) : (
          <Text style={styles.titleText}>Sad Face</Text>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "visible",
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
