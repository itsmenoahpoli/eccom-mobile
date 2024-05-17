import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";

const ImageClassifierScreen = () => {
  // const [cameraPermission, setCameraPermission] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setCameraPermission(status === 'granted');
  //   })();
  // }, []);

  // if (cameraPermission === null) {
  //   return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  // }
  // if (cameraPermission === false) {
  //   return <View style={styles.container}><Text>No access to camera</Text></View>;
  // }

  return (
    <View style={styles.container}>
      <Text>Camera</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
});

export default ImageClassifierScreen;
