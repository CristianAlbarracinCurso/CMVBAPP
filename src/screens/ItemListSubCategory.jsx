import React from "react";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem.jsx";
import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { colors } from "../global/colors";
import { useGetProductsBySubCategoryQuery } from "../services/shopServices.js";

const ItemSubListCategory = ({ navigation, route }) => {
  const [keyWord, setKeyword] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [error, setError] = useState("");

  const { category: categorySelected } = route.params;

  const {
    data: productsFetched,
    error: errorFetched,
    isLoading,
  } = useGetProductsBySubCategoryQuery(categorySelected);
  useEffect(() => {
    const regexDigits = /\d/;
    const hasDigits = regexDigits.test(keyWord);
    if (hasDigits) {
      setError("Don't use digits");
      return;
    }

    const regexThreeOrMoreCharacters = /[a-zA-Z]{3,}/;
    const hasThreeOrMoreChar = regexThreeOrMoreCharacters.test(keyWord);

    if (!hasThreeOrMoreChar && keyWord.length) {
      setError("Type 3 or more characters");
      return;
    }

    if (!isLoading) {
      const productsFiter = productsFetched.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      );

      setProductsFiltered(productsFiter);
      setError("");
    }
  }, [keyWord, categorySelected, productsFetched, isLoading]);

  return (
    <View style={styles.flatListContainer}>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation} />
        )}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  );
};

export default ItemSubListCategory;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.green300,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
