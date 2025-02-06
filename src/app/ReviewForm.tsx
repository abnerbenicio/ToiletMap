import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import API from "../api/toilet-api";

const ReviewForm = () => {
  const [nome, setNome] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [acessibilidadeCadeirantes, setAcessibilidadeCadeirantes] =
    useState(false);
  const [comentario, setComentario] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Erro", "Permissão para acessar localização foi negada.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    getLocation();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const toilet = {
      latitude: currentLocation?.latitude,
      longitude: currentLocation?.longitude,
      name: nome,
      rating: avaliacao,
      review: comentario,
      accessibility: acessibilidadeCadeirantes,
    };

    if (
      !nome ||
      avaliacao === 0 ||
      acessibilidadeCadeirantes === null ||
      !comentario
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    } else {
      try {
        await API.post("/post-banheiros", toilet);
      } catch (e) {
        alert(e);
      }
    }

    setNome("");
    setAvaliacao(0);
    setComentario("");
    setAcessibilidadeCadeirantes(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome do Estabelecimento:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do estabelecimento"
      />

      <Text>Avaliação:</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setAvaliacao(star)}>
            <FontAwesome
              name={star <= avaliacao ? "star" : "star-o"}
              size={30}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text>O banheiro possui acessibilidade para cadeirantes?</Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 20,
          paddingTop: 20,
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={() => setAcessibilidadeCadeirantes(true)}>
          <View
            style={{
              width: 100,
              height: 35,
              backgroundColor: acessibilidadeCadeirantes
                ? "#27f218"
                : "transparent",
              borderRadius: 25,
              borderWidth: 2,
              borderColor: "#27f218",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: acessibilidadeCadeirantes ? "#fff" : "#27f218" }}
            >
              Sim
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAcessibilidadeCadeirantes(false)}>
          <View
            style={{
              width: 100,
              height: 35,
              backgroundColor: !acessibilidadeCadeirantes
                ? "red"
                : "transparent",
              borderRadius: 25,
              borderWidth: 2,
              borderColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: !acessibilidadeCadeirantes ? "#fff" : "red" }}
            >
              Não
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text>Comentário:</Text>
      <TextInput
        style={{ height: 80, borderBottomWidth: 1, marginBottom: 20 }}
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Digite seu comentário"
      />

      <Button title="Enviar Avaliação" onPress={handleSubmit} />
    </View>
  );
};

export default ReviewForm;
