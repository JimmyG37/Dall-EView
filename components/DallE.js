import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  PanResponder,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

export default function DallE({ imageUrl, loading }) {
  const [test, setTest] = useState(
    "https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638"
  );

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const maskOffset = useSharedValue({ x: 0, y: 0 });
  const maskStart = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const isFixed = useSharedValue(false);

  const longHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

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

  const maskStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: maskOffset.value.x },
        { translateY: maskOffset.value.y },
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      if (!isFixed.value) {
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      } else {
        maskOffset.value = {
          x: e.translationX + maskStart.value.x,
          y: e.translationY + maskStart.value.y,
        };
      }
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };

      maskStart.value = {
        x: maskStart.value.x,
        y: maskStart.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      if (!isFixed.value) {
        scale.value = savedScale.value * event.scale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      if (!isFixed.value) {
        rotation.value = savedRotation.value + event.rotation;
      }
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const longPress = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      isFixed.value = !isFixed.value;
      runOnJS(longHaptic)();
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
    longPress
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.imageContainer, animatedStyles]}>
        {loading ? (
          <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#999999" />
            <Text style={styles.titleText}>Generating...</Text>
          </SafeAreaView>
        ) : (
          <></>
        )}
        {imageUrl.length > 0 ? (
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        ) : (
          <></>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "visible",
  },
  maskContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
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
    textShadowColor: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 200,
  },
});
