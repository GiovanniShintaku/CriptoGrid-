import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { User } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.side} />

        <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
        <View style={styles.center}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>CriptoGrid</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.side}
          onPress={() => navigation.navigate("Profile")}
        >
          <User color="#fff" size={26} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 24 : 24;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#000",
  },
  header: {
    width: "100%",
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
  },
  side: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 42,
    height: 42,
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});