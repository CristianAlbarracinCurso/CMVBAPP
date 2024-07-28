import React from "react";
import CategoryItem from "../components/CategoryItem";
import { StyleSheet, View, FlatList } from "react-native";
import { colors } from "../global/colors";
import { useGetCategoriesQuery } from "../services/shopServices";
import { Text } from "react-native";

const HomeShop = ({ navigation, route }) => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.itemTitle}>Seleccione una de las categorias</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(category) => category}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem category={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default HomeShop;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
