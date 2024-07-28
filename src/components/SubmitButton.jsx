import React from "react";
import { colors } from "../global/colors";
import { Pressable, StyleSheet, Text } from "react-native";

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.indigo,
    borderWidth: 2,
    borderColor: colors.indigo,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    margin: 4,
    width: "60%",
  },
  text: {
    color: colors.white,
    fontSize: 22,
  },
});
