import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../global/colors";
import { useNavigation } from "@react-navigation/native";

const OrderItem = ({ order }) => {
  const navigation = useNavigation();
  const formattedDate = new Date(order.timeOrder).toLocaleString();
  const total = (order.items || []).reduce(
    (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{formattedDate}</Text>
        <Text style={styles.text2}>${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderItemDetail", { order })}
      >
        <Feather name="search" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default OrderItem;

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
    fontSize: 17,
    color: "black",
  },
  text2: {
    fontFamily: "MavenPro",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});
