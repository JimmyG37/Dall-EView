import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import DallE from "./DallE";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";

export default function Preview({
  photo,
  resetPhoto,
  hasMediaLibraryPermission,
}) {
  const viewShotRef = useRef();

  const captureScreenShot = async () => {
    const imageURI = await await viewShotRef.current.capture();
    MediaLibrary.saveToLibraryAsync(imageURI).then(() => {
      resetPhoto();
    });
  };

  return (
    <SafeAreaView style={styles.photo}>
      <ViewShot
        ref={viewShotRef}
        style={{ flex: 1 }}
        options={{ format: "jpg", quality: 1.0 }}
      >
        <ImageBackground
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        >
          <DallE />
        </ImageBackground>
      </ViewShot>
      {hasMediaLibraryPermission ? (
        <Button title="Save" onPress={captureScreenShot} />
      ) : undefined}
      <Button title="Discard" onPress={() => resetPhoto()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
