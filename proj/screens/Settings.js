import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';

const Settings = () => {
  const navigation = useNavigation();
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);
  const [theme, setTheme] = useState('light'); // Default theme is light

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const toggleThemeModal = () => {
    setThemeModalVisible(!themeModalVisible);
  };

  const toggleAboutUsModal = () => {
    setAboutUsModalVisible(!aboutUsModalVisible);
  };

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setThemeModalVisible(false);
    StatusBar.setBarStyle(selectedTheme === 'light' ? 'dark-content' : 'light-content');
  };

  return (
    <ScrollView style={{ backgroundColor: theme === 'light' ? '#fff' : '#000' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: theme === 'light' ? '#000' : '#fff' }]}>Da. Source</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.image} />
        </View>

        <View style={styles.centeredOptions}>
          <TouchableOpacity onPress={toggleThemeModal} style={[styles.button, { width: '100%' }]}>
            <Text style={[styles.settingOptionText, { color: theme === 'light' ? '#000' : '#fff', textAlign: 'center' }]}>Theme: {theme}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={[styles.button, { width: '100%' }]}>
            <Text style={[styles.settingOptionText, { color: theme === 'light' ? '#000' : '#fff', textAlign: 'center' }]}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleAboutUsModal} style={[styles.button, { width: '100%' }]}>
            <Text style={[styles.settingOptionText, { color: theme === 'light' ? '#000' : '#fff', textAlign: 'center' }]}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme === 'light' ? '#000' : '#fff' }]}>
          &copy; 2024 My Homepage. All rights reserved.
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={themeModalVisible || aboutUsModalVisible}
        onRequestClose={() => {
          setThemeModalVisible(false);
          setAboutUsModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {themeModalVisible && (
              <>
                <Text style={styles.modalText}>Select Theme:</Text>
                <TouchableOpacity onPress={() => toggleTheme('light')}>
                  <Text style={styles.themeOption}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTheme('dark')}>
                  <Text style={styles.themeOption}>Dark</Text>
                </TouchableOpacity>
              </>
            )}
            {aboutUsModalVisible && (
              <Text style={styles.aboutUsText}>   A mobile application that offers and buys thrifted clothing. We carefully select and purchase
              pre-owned things to fit the style preferences of our clients. Using our features, the user can also
              sell their own products. This app's advantages include the ability to quickly search for secondhand
              goods on your phone instead of having to visit various thrift stores, greater convenience than
              making purchases on social media, and the ability to connect users and create a community that
              offers a large selection of goods that might not be available in physical thrift stores.</Text>
            )}
            <Button title="Close" onPress={() => {
              setThemeModalVisible(false);
              setAboutUsModalVisible(false);
            }} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 70,
    resizeMode: 'cover',
  },
  settingOptionText: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 10,
  },
  footer: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {},
  centeredOptions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
    paddingHorizontal: 20, // Add horizontal padding
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  themeOption: {
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#808080',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  aboutUsText: {
    marginBottom: 15,
    textAlign: 'justify', // Justify the text
    fontSize: 17, // Increase the font size
  },
});

export default Settings;