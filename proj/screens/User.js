import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from expo-image-picker
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from @expo/vector-icons

const UserProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // white background
  },
  header: {
    backgroundColor: '#ffffff', // white background
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // black text color
    textAlign: 'center', // Center align the text
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#808080',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textDecorationLine: 'underline', // Add underline to the text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#ececec',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientText: {
    textAlign: 'center', // Center align the text
    fontSize: 20, // Adjust the font size
    fontWeight: 'bold', // Make the text bold
  },
  footer: {
    backgroundColor: '#ffffff', // white background
    paddingTop: 5,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
  },
  homeIconContainer: {
    padding: 20, // Increase the padding around the home icon
  },
  homeIcon: {
    width: 50, // Set the width of the image
    height: 50, // Set the height of the image
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'column', // Set flex direction to column
  },
  
  userIcon: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it a circle
  },
  
  cameraIcon: {
    marginTop: 10, // Adjust margin to separate the camera icon from the image
    alignSelf: 'center', // Center the camera icon horizontally
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

function User() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [location, setLocation] = useState('');
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleCameraPress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('ImagePicker result:', result); // Log the ImagePicker result
  
      if (!result.cancelled) {
        const { uri } = result.assets[0]; // Access the URI from the assets array
        console.log('Avatar source URI:', uri); // Log the avatarSource URI
        setAvatarSource(uri); // Set the image URI as the source
      } else {
        console.log('Image selection cancelled');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleRemoveImage = () => {
    setAvatarSource(null);
  };

  const handleSaveProfile = () => {
    // Here you can implement logic to save user profile data
    console.log('Saving profile...');
  };

  return (
    <View style={UserProfileStyles.container}>
      <View style={UserProfileStyles.header}>
        <Text style={UserProfileStyles.headerText}>User Profile</Text>
      </View>
      <View style={UserProfileStyles.content}>
        <Text style={UserProfileStyles.clientText}></Text>
        <View style={UserProfileStyles.iconContainer}>
          <TouchableOpacity onPress={handleCameraPress}>
            {avatarSource ? (
              <>
                <Image source={{ uri: avatarSource }} style={UserProfileStyles.userIcon} />
                <TouchableOpacity style={UserProfileStyles.removeButton} onPress={handleRemoveImage}>
                  <Text style={UserProfileStyles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image source={require('../assets/user.png')} style={UserProfileStyles.userIcon} />
                <FontAwesome name="camera" size={24} color="#000" style={UserProfileStyles.cameraIcon} />
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={UserProfileStyles.inputGroup}>
          <Text style={UserProfileStyles.label}>Name:</Text>
          <TextInput
            style={UserProfileStyles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={UserProfileStyles.inputGroup}>
          <Text style={UserProfileStyles.label}>Email:</Text>
          <TextInput
            style={UserProfileStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={UserProfileStyles.inputGroup}>
          <Text style={UserProfileStyles.label}>Contact Number:</Text>
          <TextInput
            style={UserProfileStyles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={UserProfileStyles.inputGroup}>
          <Text style={UserProfileStyles.label}>Location:</Text>
          <TextInput
            style={UserProfileStyles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <TouchableOpacity style={UserProfileStyles.saveButton} onPress={handleSaveProfile}>
          <Text style={UserProfileStyles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default User;
