import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

export default function DallE({ imageUrl }) {
  const [test, setTest] = useState(
    "https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638"
  );

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
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

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      if (!isFixed.value) {
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      }
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
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
