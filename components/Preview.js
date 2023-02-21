import React, { useState, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { OpenAIApi, Configuration } from "openai";
import { OPENAI_API_KEY } from "@env";
import DallE from "./DallE";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";
import * as Haptics from "expo-haptics";
import IconBackSpace from "../Icons/IconBackSpace";
import IconSavePhoto from "../Icons/IconSavePhoto";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function Preview({
  photo,
  resetPhoto,
  hasMediaLibraryPermission,
}) {
  const viewShotRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      setImageUrl(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const captureScreenShot = async () => {
    const imageURI = await viewShotRef.current.capture();
    MediaLibrary.saveToLibraryAsync(imageURI).then(() => {
      resetPhoto();
    });
  };

  const DiscardAlert = () =>
    Alert.alert("Discard", "Are You Sure You Want To Discard?", [
      {
        text: "Wait No!",
        onPress: () => {
          console.log("Pheeww!");
        },
        style: "cancel",
      },
      {
        text: "Ya",
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          resetPhoto();
        },
      },
    ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
            onSubmitEditing={generateImage}
            returnKeyType="done"
            placeholder="Generate Image"
            placeholderTextColor="black"
          />
        </SafeAreaView>
        <ViewShot
          ref={viewShotRef}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 0,
          }}
          options={{ format: "jpg", quality: 1.0 }}
        >
          <ImageBackground
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          >
            <DallE imageUrl={imageUrl} loading={loading} />
          </ImageBackground>
        </ViewShot>
        <SafeAreaView style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              DiscardAlert();
            }}
            style={{ marginTop: 8, marginLeft: 8 }}
          >
            <IconBackSpace
              width={50}
              height={47}
              color="rgba(52, 52, 52, 0.8)"
            />
          </TouchableOpacity>

          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                captureScreenShot();
              }}
            >
              <IconSavePhoto />
            </TouchableOpacity>
          ) : undefined}
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: "white",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    zIndex: 9999,
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    position: "absolute",
    top: 20,
    zIndex: 9999,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
