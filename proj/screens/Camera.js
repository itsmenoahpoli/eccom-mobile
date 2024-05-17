import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Camera } from "expo-camera";

const ImageClassifierScreen = ({ navigation }) => {
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
      <Pressable>
        <Text style={styles.goBack} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </Pressable>
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
  goBack: {
    color: "blue",
    textDecorationLine: 1,
    marginTop: 20,
  },
  camera: {
    flex: 1,
  },
});

export default ImageClassifierScreen;
