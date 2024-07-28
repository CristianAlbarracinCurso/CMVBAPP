import React from "react";
import Card from "./Card";
import { colors } from "../global/colors";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/Shop/ShopSlice";
import { StyleSheet, Text, Pressable } from "react-native";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate("ItemListCategory", { category });
  };
  return (
    <Card style={styles.cardContainer}>
      <Pressable onPress={handleNavigate}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.indigo,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: colors.white,
  },
});
