import React from "react";
import { FavoritesProvider } from "src/Context/FavoritesContext";
import AppNavigator from "src/Navigation/AppNavigator";

export default function App() {
   return (
    <FavoritesProvider> 
       <AppNavigator/>
    
    </FavoritesProvider> 
  );
}