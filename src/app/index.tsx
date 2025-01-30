import { Text, View, Image, Alert, BackHandler } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location"; // Importação direta do módulo de localização

export default function Index() {

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync(); // Solicitação de permissão

      if (status !== "granted") {
        // Se a permissão for negada
        Alert.alert(
          "Permissão Negada",
          "É necessário permitir a localização para acessar essa funcionalidade.",
          [
            {
              text: "OK",
              onPress: () => BackHandler.exitApp(), // Sai do app se a permissão for negada
            },
          ]
        );
      }
    };

    requestLocationPermission(); // Chama a função ao carregar a tela
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 210,
          height: 50,
        }}
        source={require("../../assets/images/five-stars.png")}
      />
      <Image
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/images/toilet.png")}
      />
      <Text
        style={{
          fontSize: 25,
        }}
      >
        Bem vindo ao ToiletMap!
      </Text>
    </View>
  );
}
