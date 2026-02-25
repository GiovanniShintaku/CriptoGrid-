import "../styles/Footer.css";
import { View, Button, TouchableOpacity, Text, Linking } from "react-native";

export default function Footer() {
    return (
        <View >
            <Text>
                Dados fornecidos por{" "}
                <Text
                    
                    onPress={() => Linking.openURL("https://www.coingecko.com/")}
                >
                    CoinGecko
                </Text>
            </Text>
        </View>
    );
}