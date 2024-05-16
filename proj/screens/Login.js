import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase"; // Assuming you only need the auth object from firebase config
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    try {
      if (!isValidEmail(email)) {
        alert("Invalid email address");
        return;
      }
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Reset email and password fields
      setEmail("");
      setPassword("");
      // Navigate to the Home screen after successful login
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Incorrect email or password");
    }
  };

  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      alert("Invalid email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send password reset email. Please try again.");
    }

    // Close the modal after handling password reset
    setShowForgotPasswordModal(false);
  };

  const isValidEmail = (email) => {
    // Basic email validation using regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogout = () => {
    // Sign out the user
    auth
      .signOut()
      .then(() => {
        // Reset email and password fields
        setEmail("");
        setPassword("");
        // Remove focus from input fields
        emailInputRef.current.blur();
        passwordInputRef.current.blur();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 12, color: COLORS.black }}>Welcome Thrifters!</Text>
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
              ref={emailInputRef}
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
              ref={passwordInputRef}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{ width: "100%" }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: "absolute", right: 12 }}>
              {isPasswordShown ? <Ionicons name="eye-off" size={24} color={COLORS.black} /> : <Ionicons name="eye" size={24} color={COLORS.black} />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox style={{ marginRight: 8 }} value={isChecked} onValueChange={setIsChecked} color={isChecked ? COLORS.primary : undefined} />
            <Text>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => setShowForgotPasswordModal(true)}>
            <Text style={{ color: COLORS.primary }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Login"
          filled
          onPress={handleLogin} // Call handleLogin when the button is pressed
          style={{ marginTop: 18, marginBottom: 4 }}
        />

        <View style={{ display: "none", flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
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
              marginLeft: 4,
              borderRadius: 10,
            }}
          >
            <Image source={require("../assets/google.png")} style={{ height: 36, width: 36, marginRight: 8 }} resizeMode="contain" />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold", marginLeft: 6 }}>Register</Text>
          </Pressable>
        </View>

        {/* Forgot Password Modal */}
        <Modal visible={showForgotPasswordModal} transparent animationType="slide" onRequestClose={() => setShowForgotPasswordModal(false)}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <View style={{ backgroundColor: COLORS.white, padding: 20, borderRadius: 10, width: "80%" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Forgot Password</Text>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{ borderWidth: 1, borderColor: COLORS.grey, borderRadius: 8, padding: 10, marginBottom: 10 }}
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={{ backgroundColor: COLORS.primary, borderRadius: 8, padding: 10, alignItems: "center" }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>Reset Password</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowForgotPasswordModal(false)} style={{ marginTop: 10 }}>
                <Text style={{ color: COLORS.grey }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Login;
