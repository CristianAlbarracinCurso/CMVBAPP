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
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.indigo,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    margin: 4,
    width: "60%",
  },
  text: {
    color: colors.black,
    fontSize: 22,
  },
});
