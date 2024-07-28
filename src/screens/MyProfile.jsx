import React from "react";
import AddButton from "../components/AddButton";
import { StyleSheet, View, Image } from "react-native";
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileimageQuery } from "../services/shopServices";
import { clearUser } from "../features/User/UserSlice";
import { useDB } from "../persistence/useDB";

const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { truncateSessionTable } = useDB();
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileimageQuery(localId);
  const launchCamera = async () => {
    navigation.navigate("Image Selector");
  };

  const launchLocation = async () => {
    navigation.navigate("List Address");
  };

  const defaultImageRoute = "../../assets/user.png";

  const signOut = async () => {
    try {
      const response = await truncateSessionTable();
      dispatch(clearUser());
    } catch (error) {
      Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.img}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={require(defaultImageRoute)}
        />
      )}
      <AddButton
        onPress={launchCamera}
        title={
          imageFromBase || imageCamera
            ? "Modificar foto de perfil"
            : "Agregar foto de perfil"
        }
      />
      <AddButton title="Direccion" onPress={launchLocation} />
      <AddButton onPress={signOut} title="Cerrar sesion" />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.black,
    margin: 20,
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.white,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 5,
  },
});
