import React from "react";
import { colors } from "../global/colors";
import { Pressable, StyleSheet, Text } from "react-native";

const AddButton = ({ title = "", onPress = () => {} }) => {
  return (
    <Pressable style={{ ...styles.button }} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    width: "70%",
    borderWidth: 1,
    backgroundColor: colors.indigo,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    margin: 4,
  },
  text: {
    fontFamily: "MavenPro",
    fontSize: 18,
    color: colors.white,
  },
});
