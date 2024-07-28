import React from "react";
import ItemListCategory from "../screens/ItemListCategory";
import HomeNews from "../screens/HomeNews";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Novedades"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Novedades" component={HomeNews} />
      <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
    </Stack.Navigator>
  );
}
