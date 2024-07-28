import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../screens/Main";
import Signup from "../screens/Signup";
import React from "react";
import MainLocation from "../screens/MainLocation";

const Stack = createNativeStackNavigator();
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ubicacion" component={MainLocation} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
