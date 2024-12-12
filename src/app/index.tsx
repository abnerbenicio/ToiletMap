import { Text, View, Image } from "react-native";

export default function Index() {
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
          height: 50
        }}
        source={require("../../assets/images/five-stars.png")}
      />
      <Image 
        style={{
          width: 300,
          height: 300
        }}
        source={require("../../assets/images/toilet.png")}
      />
      <Text
        style={{
          fontSize: 25
        }}
      >Bem vindo ao ToiletMap!</Text>
    </View>
  );
}
