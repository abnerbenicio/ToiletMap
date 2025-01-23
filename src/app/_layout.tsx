import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 25,
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#E4544C",
          height: 100,
        },
        tabBarStyle: {
          backgroundColor: "#E4544C",
          height: 60,
        },
        tabBarLabelStyle: {
          color: "#fff",
          fontSize: 13,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "ToiletMap",
          tabBarIcon: ({}) => {
            return <FontAwesome name="home" size={30} color="#fff" />;
          },
        }}
      />
      <Tabs.Screen
        name="MapPage"
        options={{
          title: "Encontrar Banheiro",
          headerTitle: "ToiletMap",
          tabBarIcon: ({}) => {
            return <FontAwesome name="map" size={30} color="#fff" />;
          },
        }}
      />
      <Tabs.Screen
        name="ReviewForm"
        options={{
          title: "Avaliar",
          headerTitle: "ToiletMap",
          tabBarIcon: ({}) => {
            return <FontAwesome name="pencil" size={30} color="#fff" />;
          },
        }}
      />
    </Tabs>
  );
}
