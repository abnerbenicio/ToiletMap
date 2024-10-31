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
          fontSize: 15,
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
    </Tabs>
  );
}
