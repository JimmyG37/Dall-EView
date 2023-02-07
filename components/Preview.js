import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  TextInput,
} from "react-native";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";
import DallE from "./DallE";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";

export default function Preview({
  photo,
  resetPhoto,
  hasMediaLibraryPermission,
}) {
  const viewShotRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      setImageUrl(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    }
  };

  const captureScreenShot = async () => {
    const imageURI = await await viewShotRef.current.capture();
    MediaLibrary.saveToLibraryAsync(imageURI).then(() => {
      resetPhoto();
    });
  };

  return (
    <SafeAreaView style={styles.photo}>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={(text) => setPrompt(text)}
        onSubmitEditing={generateImage}
        returnKeyType="done"
        placeholder="Enter your text here"
      />
      <ViewShot
        ref={viewShotRef}
        style={{ flex: 1 }}
        options={{ format: "jpg", quality: 1.0 }}
      >
        <ImageBackground
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        >
          <DallE imageUrl={imageUrl} />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
});
