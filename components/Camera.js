import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType, takePictureAsync } from "expo-camera";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import Preview from "./Preview";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from "expo-haptics";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function CameraComponent() {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePhoto = async () => {
    const options = { quality: 1, base64: true, exif: false };
    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const resetPhoto = () => {
    setPhoto(undefined);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {!photo ? (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            width={screenWidth}
            height={screenHeight}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.buttonBorder}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    takePhoto();
                  }}
                />
              </View>
            </View>
          </Camera>
        </View>
      ) : (
        <Preview
          photo={photo}
          resetPhoto={resetPhoto}
          hasMediaLibraryPermission={hasMediaLibraryPermission}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "stretch",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    margin: 20,
    height: 66,
    width: 66,
    borderRadius: "50%",
  },
  buttonBorder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    margin: 20,
    height: 76,
    width: 76,
    borderRadius: "50%",
    borderColor: "black",
    borderWidth: 3,
  },
});
