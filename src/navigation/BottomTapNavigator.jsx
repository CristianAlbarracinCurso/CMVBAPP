import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../global/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import ItemStackNavigator from "./ItemStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import CartStackNavigator from "./CartStackNavigator";
import OrderStackNavigator from "./OrderStackNavigator";
import MyProfileStackNavigator from "./MyProfileStackNavigator";
import Header from "../components/Header";

const Tab = createBottomTabNavigator();

const BottomTapNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="CVB"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="home"
                  size={28}
                  color={focused ? "dodgerblue" : colors.indigo}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Productos"
        component={ItemStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? "dodgerblue" : colors.violeta}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mi Carrito"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="shopping-cart"
                  size={24}
                  color={focused ? "dodgerblue" : colors.violeta}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="receipt"
                  size={24}
                  color={focused ? "dodgerblue" : colors.violeta}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Datos de Perfil"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="user-alt"
                  size={24}
                  color={focused ? "dodgerblue" : colors.violeta}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTapNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    height: 60,
  },
});
