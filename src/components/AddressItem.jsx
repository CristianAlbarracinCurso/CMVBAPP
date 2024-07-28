import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { colors } from "../global/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AddressItem = ({ location, navigation }) => {
  const onChangeLocation = () => {
    navigation.navigate("Location Selector");
  };

  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{location.address}</Text>
      </View>
      <Pressable onPress={onChangeLocation}>
        <EvilIcons name="location" size={30} color="white">
          <Text style={styles.text2}>Cambiar</Text>
        </EvilIcons>
      </Pressable>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 120,
    backgroundColor: colors.indigo,
    padding: 20,
    margin: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "MavenPro",
    fontSize: 12,
    color: colors.white,
  },
  text2: {
    fontFamily: "MavenPro",
    fontSize: 20,
    color: colors.white,
  },
});
