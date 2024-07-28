import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { instagKey } from "../databases/systemData";
import { colors } from "../global/colors";

const HomeNews = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        if (!instagKey) {
          throw new Error("Access token no disponible");
        }

        const mediaResponse = await axios.get(
          "https://graph.instagram.com/me/media",
          {
            params: {
              fields: "media_url,caption",
              access_token: instagKey,
            },
          }
        );
        setMedia(mediaResponse.data.data);
      } catch (error) {
        Alert.alert("Error", error.message || "Ocurrió un error desconocido", [
          { text: "OK" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramData();
  }, [instagKey]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.media_url }} style={styles.image} />
      {item.caption ? (
        <Text style={styles.caption}>{item.caption}</Text>
      ) : (
        <Text style={styles.noCaption}>CVB</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>Centro Veterinario Berazategui</Text>
      <Text style={styles.itemSubTitle}>Novedades</Text>
      <FlatList
        data={media}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.mediaList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  mediaList: {
    width: "90%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  caption: {
    marginTop: 10,
    fontSize: 15,
    color: "#333",
  },
  noCaption: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  itemSubTitle: {
    fontSize: 18,
  },
});

export default HomeNews;
