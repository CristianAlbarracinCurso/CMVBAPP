import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Pressable, Alert,Platform } from "react-native";
import SubmitButton from "../components/SubmitButton";
import SubmitButtonWhite from "../components/SubmitButtonWhite";
import InputForm from "../components/InputForm";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { useDB } from "../persistence/useDB";
import { colors } from "../global/colors";



const Main = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const [triggerSignIn, result] = useSignInMutation();
  const logo = require("../../assets/logo.png");


 

  useEffect(()=>{
    try {
      const {initDB} = useDB()
      initDB() 
    } catch (error) {
      console.log(error);
    }

  },[])

 const { insertSession } = useDB();
  useEffect(() => {
    if (result?.data && result.isSuccess) {
      (async () => {
        try {
          if (Platform.OS !== "web") {
            const response = await insertSession({
              email: result.data.email,
              localId: result.data.localId,
              token: result.data.idToken,
            });
          }
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [result]);

  const onSubmit = () => {
    triggerSignIn({ email, password, returnSecureToken: true });
  };

  return (
    <View style={styles.main}>
      <Image fadeDuration={1000} source={logo} />
      <Text style={styles.title}>Ingrese sus datos para iniciar</Text>
      <InputForm label={"email"} onChange={setEmail} error={""} />
      <InputForm
        label={"password"}
        onChange={setPassword}
        error={""}
        isSecure={true}
      />
      <SubmitButton onPress={onSubmit} title="Ingresar" />
      <SubmitButtonWhite
        onPress={() => navigation.navigate("Signup")}
        title="Registrarse"
      />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Ubicacion")}
      >
        <Text>Ver Nuestra Ubicacion</Text>
      </Pressable>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: colors.lightGray,
    borderColor: colors.indigo,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    margin: 50,
    width: "40%",
  },
  title: {
    fontSize: 18,
    fontFamily: "MavenPro",
    marginBottom: 12,
  },
  imagen: {
    borderRadius: 50,
  },
});
