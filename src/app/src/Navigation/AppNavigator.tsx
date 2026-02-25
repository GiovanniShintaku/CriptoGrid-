import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Coin_Screen from "../screens/Coin_Screen";
import Profile from "../screens/Profile";
import Login from "../screens/loginPage/Login";
import Register from "../screens/loginPage/Register";

export type RootStackParamList = {
  Home: undefined;
  Coin_Screen: { coinId: string };
  Profile: undefined;
  Login: undefined;
  Register: undefined;
    
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
        }}
       >
        <Stack.Screen
             name="Login"
             component={Login}
             options={{ headerShown: false }}
        />
       <Stack.Screen
             name="Register"
             component={Register}
             options={{ headerShown: false }}
        />
              <Stack.Screen
                  name="Home"
                  component={Home} />
              <Stack.Screen
                  name="Coin_Screen"
                  component={Coin_Screen} />
              <Stack.Screen
                  name="Profile"
                  component={Profile} 
                  options={{ headerShown: false }}
              />

      </Stack.Navigator>
    </NavigationContainer>
  );
}