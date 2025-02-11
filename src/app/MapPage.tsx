import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Region,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import API from "../api/toilet-api";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";

type Bathroom = {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  review: string;
  rating: number;
};

const MapPage = () => {
  const [location, setLocation] = useState<Region | null>(null);
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom>();
  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  useEffect(() => {
    const fetchLocationAndBathrooms = async () => {
      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        fetchBathrooms(
          userLocation.coords.latitude,
          userLocation.coords.longitude
        );
      } catch (error) {
        Alert.alert("Erro", "Não foi possível obter a localização.");
        setLoading(false);
      }
    };

    fetchLocationAndBathrooms();
  }, []);

  const fetchBathrooms = async (latitude: number, longitude: number) => {
    try {
      const res = await API.get("/banheiros/perto", {
        params: { latitude, longitude },
      });
      setBathrooms(res.data);
    } catch (e) {
      Alert.alert("Erro", "Falha ao buscar banheiros.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = async (bathroom: Bathroom) => {
    if (!location) return;

    try {
      //Uso de OSRM para traçar caminho
      const url = `https://router.project-osrm.org/route/v1/driving/${location.longitude},${location.latitude};${bathroom.longitude},${bathroom.latitude}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Extrai as coordenadas do caminho
        const coordinates = data.routes[0].geometry.coordinates.map(
          (coord: [number, number]) => ({
            latitude: coord[1],
            longitude: coord[0],
          })
        );
        setRouteCoordinates(coordinates);
        setSelectedBathroom(bathroom);
      } else {
        Alert.alert("Erro", "Não foi possível calcular a rota.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar a rota.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
        >
          {bathrooms.map((bathroom) => (
            <Marker
              key={bathroom.id}
              coordinate={{
                latitude: bathroom.latitude,
                longitude: bathroom.longitude,
              }}
              onPress={() => handleMarkerPress(bathroom)}
            />
          ))}

          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#00f"
              strokeWidth={4}
            />
          )}
        </MapView>
      ) : (
        <Text>Obtendo localização...</Text>
      )}
      {selectedBathroom?.rating !== undefined && (
        <View style={styles.modal}>
          <Text style={styles.textModal}>Nome: {selectedBathroom.name}</Text>
          <Text style={styles.textModal}>
            Descrição: {selectedBathroom.review}
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={styles.textModal}>Nota:</Text>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome
                  key={star}
                  name={star <= selectedBathroom.rating ? "star" : "star-o"}
                  size={30}
                  color="#FFD700"
                />
              ))}
          </View>
        </View>
      )}
      {selectedBathroom?.rating !== undefined && (
        <View style={styles.modal}>
          <Text style={styles.textModal}>Nome: {selectedBathroom.name}</Text>
          <Text style={styles.textModal}>
            Descrição: {selectedBathroom.review}
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={styles.textModal}>Nota:</Text>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome
                  key={star}
                  name={star <= selectedBathroom.rating ? "star" : "star-o"}
                  size={30}
                  color="#FFD700"
                />
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "fixed",
    bottom: 0,
    flexDirection: "column",
    height: 150,
    gap: 10,
    padding: 20,
    backgroundColor: "white"
  },
  textModal: {
    fontSize: 20,
  },
});
