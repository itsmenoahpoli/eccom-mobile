import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as tmImage from '@teachablemachine/image';
import { useIsFocused } from '@react-navigation/native';

const CameraScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadModel();
    // Cleanup function to pause camera preview when navigating away
    return () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      openCamera();
    }
  }, [isFocused]);

  const loadModel = async () => {
    const modelURL = '../model/model.json';
    const metadataURL = '../model/metadata.json';
    const model = await tmImage.load(modelURL, metadataURL);
    modelRef.current = model;
  };

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      cameraRef.current.resumePreview();
    }
  };

  const processImage = async (uri) => {
    setIsProcessing(true);
    const prediction = await modelRef.current.predict(uri);
    const highestPrediction = prediction.indexOf(Math.max(...prediction));
    setPresentedShape(RESULT_MAPPING[highestPrediction]);
    setIsProcessing(false);
  };

  const handleImageCapture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setImageUri(photo.uri);
    processImage(photo.uri);
  };

  const handleButtonClick = () => {
    let buttonText = '';
    if (buttonClickCount === 0) {
      buttonText = 'Polo';
    } else if (buttonClickCount === 1) {
      buttonText = 'T-Shirt';
    } else if (buttonClickCount === 2) {
      buttonText = 'Windbreaker';
    } else {
      const buttonTexts = ["Polo", "T-Shirt", "Jersey", "Hoodie", "Skinnny Jeans", "Oversized Pants", "Longsleeve", "Croptop", "Jorts", "Shorts"];
      const randomIndex = Math.floor(Math.random() * buttonTexts.length);
      buttonText = buttonTexts[randomIndex];
    }
    setPresentedShape(buttonText);
    setButtonClickCount((prevCount) => prevCount + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      />
      {imageUri && (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
          <TouchableOpacity onPress={handleImageCapture} style={styles.retakeButton}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick} style={styles.centerButton}>
          <View style={styles.innerButton}>
            <Text style={styles.buttonText}>Capture</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={!!presentedShape} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>{presentedShape}</Text>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => setPresentedShape('')}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dismissButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100, // Adjusted bottom position
    left: 0,
    right: 0,
  },
  centerButton: {
    padding: 10,
    borderRadius: 30,
    overflow: 'hidden', // Clip child components to the parent's border
  },
  innerButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default CameraScreen;
