import React from "react";
import AddButton from "../components/AddButton";
import MapPreview from "../components/MapPreview";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { colors } from "../global/colors";
import { StyleSheet, Text, View, Alert } from "react-native";
import { googleMapsApiKey } from "../databases/systemData";
import { usePostLocationMutation } from "../services/shopServices";
import { useSelector } from "react-redux";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [address, setAddres] = useState("");
  const [error, setError] = useState("");

  const [triggerPostUserLocation, result] = usePostLocationMutation();
  const { localId } = useSelector((state) => state.auth.value);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Se han denegado los perminsos para acceder a la ubicacion");
          return;
        }
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      } catch (error) {
        Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
          { text: "OK" },
        ]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          setAddres(data.results[0].formatted_address);
        }
      } catch (error) {
        Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
          { text: "OK" },
        ]);
      }
    })();
  }, [location]);

  const onConfirmAddress = () => {
    const date = new Date();

    triggerPostUserLocation({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: address,
        updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      },
      localId: localId,
    });
    Alert.alert("Direccion", "Se actualizo exitosamente su Ubicacion.");
    navigation.goBack();
  };

  const launchProfile = async () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Direccion de Perfil</Text>
      {location ? (
        <>
          <MapPreview location={location} />

          <Text style={styles.address}>Nueva direccion: {address}</Text>
          <Text style={styles.textCoord}>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>
          <AddButton onPress={onConfirmAddress} title="Confirmar Direccion" />
          <AddButton onPress={launchProfile} title="Volver" />
        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
            <Text>{error}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    paddingTop: 12,
    paddingBottom: 6,
    fontFamily: "MavenPro",
    fontSize: 24,
  },
  textCoord: {
    fontFamily: "MavenPro",
    fontSize: 12,
    paddingBottom: 15,
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.black,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    paddingtop: 10,
    fontSize: 16,
  },
});
