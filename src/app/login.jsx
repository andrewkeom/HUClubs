import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as z from "zod";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import { Colors, Spacing, Typography } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { users } from "../data/mockData";

export default function LoginScreen() {
  const { role } = useLocalSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const loginSchema = z.object({
    email: z.email("Enter a valid email address."),
    password: z.string().min(7, "Use at least 7 characters for the password."),
  });

  async function handleLogin() {
    setError("");
    const cleanEmail = email.trim().toLowerCase();

    const result = loginSchema.safeParse({
      email: cleanEmail,
      password: password,
    });

    if (result.success === false) {
      setError(result.error.issues[0].message);
      return;
    }

    const user = users.find((u) => {
      return u.email === cleanEmail;
    });

    if (!user || user.password !== password) {
      setError("Wrong email or password.");
      return;
    }

    const userRole = user.role === role;

    if (!userRole) {
      setError(
        "This is " +
          (user.role === "student" ? "a student" : "an officer") +
          " account. " +
          "Go back and choose " +
          (user.role === "student" ? "Student" : "Club Officer"),
      );
      return;
    }

    try {
      await login(user);
    } catch (e) {
      console.error(e);
      setError("Could not log in, please try again");
    }
  }

  return (
    <AppScreen>
      <View style={styles.headingView}>
        <Text style={styles.heading}>Welcome back!</Text>
      </View>
      <Text style={styles.subHeading}>
        {role === "student" ? "Student" : "Officer"} Login
      </Text>
      <Text style={styles.label}>Email</Text>

      <AppTextInput
        value={email}
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setEmail}
        placeholder="Please enter your email address"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <AppTextInput
        value={password}
        autoComplete="current-password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Please enter your password"
      />

      {/* Show form errors for all fields */}
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}

      <View style={styles.button}>
        <AppButton text="Submit" onPress={handleLogin} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Spacing.medium,
  },
  error: {
    color: Colors.danger,
  },
  heading: {
    fontSize: Typography.title,
    fontWeight: Typography.weightStrong,
    color: Colors.primary,
    marginBottom: Spacing.small,
  },
  headingView: {
    alignItems: "center",
  },
  label: {
    fontSize: Typography.body,
    color: Colors.mutedText,
    marginTop: Spacing.medium,
  },
  subHeading: {
    fontSize: Typography.heading2,
    fontWeight: Typography.weightMedium,
    color: Colors.accent,
  },
});
