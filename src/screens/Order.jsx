import React, { useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import OrderItem from "../components/OrderItem";
import { colors } from "../global/colors";
import { useFocusEffect } from "@react-navigation/native";

const Order = (order) => {
  const { localId } = useSelector((state) => state.auth.value);

  const {
    data: orders,
    error,
    isLoading,
    refetch,
  } = useGetOrdersByUserQuery(localId);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
        { text: "OK" },
      ]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
      { text: "OK" },
    ]);
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No tenemos pedidos realizados con su usuario</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>Resumen de sus pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(orderItem) => orderItem.id.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonCenter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
