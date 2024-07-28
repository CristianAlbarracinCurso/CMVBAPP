import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useGetLocationQuery } from "../services/shopServices";
import AddButton from "../components/AddButton";
import AddressItem from "../components/AddressItem";
import React from "react";

const ListAddress = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);
  const { data: location } = useGetLocationQuery(localId);
  return location ? (
    <AddressItem location={location} navigation={navigation} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Ubicacion no seleccionada</Text>
      <AddButton
        title="Set location"
        onPress={() => navigation.navigate("Location Selector")}
      />
    </View>
  );
};

export default ListAddress;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    paddingVertical: 20,
    fontFamily: "MavenPro",
    fontSize: 18,
  },
});
