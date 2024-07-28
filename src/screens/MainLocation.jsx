import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { colors } from "../global/colors";

export default function MainLocation() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.778699,
          longitude: -58.241632,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        <Marker
          key="0001"
          coordinate={{
            latitude: -34.778909,
            longitude: -58.241452,
          }}
          title="Centro Veterinario Berazategui"
          descripcion="Av. 14 y Calle 116 Berazategui"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  txt: {
    fontStyle: "italic",
    color: colors.white,
    fontWeight: "bold",
  },
});
