import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AddButton from "../components/AddButton";
import { colors } from "../global/colors";

const OrderItemDetail = ({ route, navigation }) => {
  const { order } = route.params;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Detalle del pedido</Text>
        <FlatList
          data={order.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonCenter}>
        <AddButton onPress={() => navigation.goBack()} title="Volver" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonCenter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.white,
  },
});

export default OrderItemDetail;
