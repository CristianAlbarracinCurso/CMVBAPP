import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../global/colors";

const CartItem = ({ cartItem, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {cartItem.title} ({cartItem.quantity})
        </Text>
        <Text>{cartItem.brand}</Text>
        <Text>${cartItem.price}</Text>
      </View>
      <Pressable onPress={() => onRemove(cartItem.id)}>
        <Entypo name="trash" size={30} color="black" />
      </Pressable>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
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
    fontSize: 19,
    color: colors.violeta,
  },
});
