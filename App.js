import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CameraComponent from "./components/Camera";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <View style={styles.container}>
        <CameraComponent />
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
