import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import logo from "../../"; // ajuste o caminho

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem("email");
    const storedPassword = await AsyncStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.navigate("Profile"); // nome da sua tela Home no navigator
    } else {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
    }
  };

  return (
     <View style={styles.root}>
      <View style={styles.card}>
        {/* <View style={styles.avatar}> 
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View> */}
        

        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Endereço de e-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>
                Novo por aqui? Cadastre-se! 
            </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0F1326",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#0B0E1A",
    padding: 24,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#000",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#D6D6D6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    color: "#000",
  },
  button: {
    width: "100%",
    backgroundColor: "#FF00B8",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  
  linkText: {
  color: "#62F7FF",
  marginTop: 16,
  textDecorationLine: "underline",
  fontSize: 14,
},
});
