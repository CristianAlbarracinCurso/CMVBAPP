import React from "react";
import BottomTapNavigator from "./BottomTapNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useDB } from "../persistence/useDB";
import { setUser } from "../features/User/UserSlice";
import { NavigationContainer } from "@react-navigation/native";
import { Alert } from "react-native";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  const { getSession } = useDB();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();

        if (response) {
          const user = response;

          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token,
            })
          );
        }
      } catch (error) {
        Alert.alert("Error1", error.message || "Ocurrió un error desconocido", [
          { text: "OK" },
        ]);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {user ? <BottomTapNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
