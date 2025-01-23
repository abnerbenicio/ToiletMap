import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

type Bathroom = {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
};

const MapPage = () => {
  const [location, setLocation] = useState<Region | null>(null);
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const [loading, setLoading] = useState(true);

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

        fetchBathrooms(userLocation.coords.latitude, userLocation.coords.longitude);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível obter a localização.");
        setLoading(false);
      }
    };

    fetchLocationAndBathrooms();
  }, []);

  const fetchBathrooms = (latitude: number, longitude: number) => {
    // Simula dados de banheiros
    const data: Bathroom[] = [
      { latitude: latitude + 0.001, longitude: longitude + 0.001, name: "Banheiro 1", description: "Banheiro próximo ao ponto A" },
      { latitude: latitude + 0.003, longitude: longitude - 0.002, name: "Banheiro 2", description: "Banheiro próximo ao ponto B" },
      { latitude: latitude - 0.002, longitude: longitude + 0.002, name: "Banheiro 3", description: "Banheiro próximo ao ponto C" },
      { latitude: latitude - 0.004, longitude: longitude - 0.003, name: "Banheiro 4", description: "Banheiro próximo ao ponto D" },
      { latitude: latitude + 0.005, longitude: longitude + 0.004, name: "Banheiro 5", description: "Banheiro próximo ao ponto E" },
    ];
    setBathrooms(data);
    setLoading(false);
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
        >
          {bathrooms.map((bathroom, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: bathroom.latitude,
                longitude: bathroom.longitude,
              }}
              title={bathroom.name}
              description={bathroom.description}
            />
          ))}
        </MapView>
      ) : (
        <Text>Obtendo localização...</Text>
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
});
