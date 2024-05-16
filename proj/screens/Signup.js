import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, Pressable, Modal, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase"; // Assuming you only need the auth and database objects from firebase config
import { doc, setDoc } from "firebase/firestore";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!isChecked) {
        alert("Please agree to the terms and conditions.");
        return;
      }
      if (password.length < 6) {
        alert("Password must have at least 6 characters");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Invalid email address");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords must match");
        return;
      }
      // Sign up the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save additional user details to Firestore
      await addUserInfoToFirestore(userCredential.user.uid);

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation using regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addUserInfoToFirestore = async (userId) => {
    try {
      // Save user details to Firestore
      await setDoc(doc(database, "users", userId), {
        email,
        mobileNumber,
        // Add more fields if necessary
      });
    } catch (error) {
      console.error("Error adding user info to Firestore:", error);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalShow}
        onRequestClose={() => {
          setModalShow(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={{ height: "80%" }}>
              <Text style={styles.modalText}>TERMS AND CONDITIONS</Text>
              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>Welcome</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                Welcome to Da Source! These terms and conditions outline the rules and regulations for the use of our application. By accessing this
                app, we assume you accept these terms and conditions. Do not continue to use Da Source] if you do not agree to all of the terms and
                conditions stated on this page.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>License to Use:</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use the app for personal, non-commercial use. You
                must not:
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                Republish material from the app Sell, rent, or sub-license material from the app Reproduce, duplicate, or copy material from the app
                Redistribute content from the app
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>User Accounts</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                To access certain features of the app, you may be required to create an account and provide specific information. You agree to provide
                accurate, current, and complete information during the registration process.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You
                agree to accept responsibility for all activities that occur under your account.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>User Content</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                The app allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other
                material (“User Content”). You are responsible for the User Content that you post on or through the app.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                By posting User Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and
                distribute such User Content on and through the app.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>Prohibited Activities</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                You agree not to use the app for any purpose that is unlawful or prohibited by these terms. Prohibited activities include, but are not
                limited to:
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                Violating any local, state, national, or international law Hacking or interfering with the proper functioning of the app Using the app
                to transmit any harmful or malicious code
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                Purchases; If you wish to purchase any product or service made available through the app (“Purchase”), you may be asked to supply
                certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your
                credit card, your billing address, and your shipping information.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                You represent and warrant that you have the legal right to use any credit card(s) or other payment methods in connection with any
                Purchase and that the information you supply is true, correct, and complete.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>Returns and Refunds Policy</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                Please review our [Returns and Refunds Policy] for detailed information on our policies regarding returns and refunds.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>Intellectual Property</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                The app and its original content, features, and functionality are and will remain the exclusive property of Da Source and its
                licensors.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                The app is protected by copyright, trademark, and other laws of both the country and foreign countries. Our trademarks and trade dress
                may not be used in connection with any product or service without the prior written consent of Da Source.
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>Termination</Text>

              <Text style={{ fontSize: 14, fontWeight: "medium", marginBottom: 15 }}>
                We may terminate or suspend your account and bar access to the app immediately, without prior notice or liability, under our sole
                discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the terms.
              </Text>

              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalShow(false)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 12, color: COLORS.black }}>REGISTRATION</Text>
            <Text style={{ fontSize: 16, color: COLORS.black }}>Buy and sell an item right away!</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{ width: "100%" }}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Mobile Number</Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your mobile number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{ width: "100%" }}
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShown}
                style={{ width: "100%" }}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: "absolute", right: 12 }}>
                {isPasswordShown ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Confirm your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isConfirmPasswordShown}
                style={{ width: "100%" }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)} style={{ position: "absolute", right: 12 }}>
                {isConfirmPasswordShown ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <Checkbox style={{ marginRight: 8 }} value={isChecked} onValueChange={setIsChecked} color={isChecked ? COLORS.primary : undefined} />
            <Pressable onPress={() => setModalShow(true)}>
              <Text>
                I agree to the <Text style={{ color: "blue" }}>terms and conditions</Text>
              </Text>
            </Pressable>
          </View>

          <Button title="Sign Up" filled onPress={handleSignUp} style={{ marginTop: 18, marginBottom: 4 }} />

          <View style={{ display: "none", flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.grey, marginHorizontal: 10 }} />
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.grey, marginHorizontal: 10 }} />
          </View>

          <View style={{ display: "none", flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image source={require("../assets/facebook.png")} style={{ height: 36, width: 36, marginRight: 8 }} resizeMode="contain" />
              <Text>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image source={require("../assets/google.png")} style={{ height: 36, width: 36, marginRight: 8 }} resizeMode="contain" />
              <Text>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold", marginLeft: 6 }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Signup;
