import React from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import { colors } from "../global/colors";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/UserSlice";
import {
  useGetProfileimageQuery,
  usePostProfileImageMutation,
} from "../services/shopServices";
import AddButton from "../components/AddButton";

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isImageFromCamera, setIsImageFromCamera] = useState(false);
  const dispatch = useDispatch();
  const [triggerPostImage, result] = usePostProfileImageMutation();
  
  const { localId } = useSelector((state) => state.auth.value);
  
  const { data: imageFromBase } = useGetProfileimageQuery(localId);
  const pickLibraryImage = async () => {
    try {
      setIsImageFromCamera(false);
      const permissionGallery = await verifyGalleryPermissions();
      if (permissionGallery) {
        const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2,
        });

        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
          setImage(image);
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
        { text: "OK" },
      ]);
    }
  };

  const verifyGalleryPermissions = async () => {
    try {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return granted;
  } catch (error) {
    Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
      { text: "OK" },
    ]);
  }
};
  const verifyCameraPermissions = async () => {
    try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (!status) {
      return false;
    }
    return true;
  } catch (error) {
    Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
      { text: "OK" },
    ]);
  }
};

  const pickImage = async () => {
    try {
    const isCameraOk = await verifyCameraPermissions();
    setIsImageFromCamera(true);
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.3,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
      { text: "OK" },
    ]);
  }
};

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      if (isImageFromCamera) {
        MediaLibrary.createAssetAsync(image);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {image || imageFromBase ? (
        <>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: image || imageFromBase?.image }}
          />
          <AddButton title="Tomar" onPress={pickImage} />

          <AddButton
            title="Seleccionar foto de la galeria"
            onPress={pickLibraryImage}
          />

          <AddButton title="Confirmar captura" onPress={confirmImage} />
        </>
      ) : (
        <>
          <View style={styles.containerPhoto}>
            <Text>No tenemos imagen para mostrar...</Text>
          </View>
          <AddButton title="Tomar foto" onPress={pickImage} />
          <AddButton
            title="Seleccionar foto de la galeria"
            onPress={pickLibraryImage}
          />
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.violeta,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 5,
  },
  img: {
    marginVertical: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  containerPhoto: {
    marginVertical: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
