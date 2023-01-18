import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function DallE() {
  const [imageUrl, setImageUrl] = useState("");
  const [test, setTest] = useState("");

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );

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
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.imageContainer, animatedStyles]}>
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
    </GestureDetector>
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
