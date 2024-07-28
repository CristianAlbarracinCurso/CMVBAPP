import React from "react";
import HomeShop from "../screens/HomeShop";
import ItemListCategory from "../screens/ItemListCategory";
import ItemSubListCategory from "../screens/ItemListSubCategory";
import ItemDetail from "../screens/itemDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeShop"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeShop" component={HomeShop} />
      <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
      <Stack.Screen
        name="ItemListSubCategory"
        component={ItemSubListCategory}
      />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>
  );
}
