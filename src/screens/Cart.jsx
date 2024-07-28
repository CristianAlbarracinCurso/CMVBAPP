import React from "react";
import CartItem from "../components/CartItem";
import SubmitButton from "../components/SubmitButton";
import { usePostOrderMutation } from "../services/shopServices";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeCartItem } from "../features/Cart/CartSlice";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Alert } from "react-native";
import { colors } from "../global/colors";

const Cart = ({ navigation }) => {
  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const { localId } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [triggerPostOrder] = usePostOrderMutation();

  const onConfirmOrder = async () => {
    try {
      const timeOrder = new Date().getTime();
      await triggerPostOrder({
        items: CartData,
        user: localId,
        total,
        timeOrder,
      }).unwrap();
      dispatch(emptyCart());
      navigation.navigate("OrderScreen");
    } catch (error) {
      Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
        { text: "OK" },
      ]);
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem({ id }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        renderItem={({ item }) => (
          <CartItem cartItem={item} onRemove={handleRemoveItem} />
        )}
        keyExtractor={(producto) => producto.id.toString()}
      />
      <View style={styles.main}>
        <Text style={styles.title}>Valor total de la Compra $ {total}</Text>
      </View>
      <View style={styles.buttonCenter}>
        <SubmitButton title="Comprar" onPress={onConfirmOrder}>
          <Text>Comprar</Text>
        </SubmitButton>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: colors.white,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCenter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: "MavenPro",
  },
});
