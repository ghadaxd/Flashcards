import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import { purple } from "./utils/colors";

import Home from "./components/screens/Home";
import AddDeck from "./components/screens/AddDeck";
import Deck from "./components/screens/Deck";
import AddCard from "./components/screens/AddCard";
import Quiz from "./components/screens/Quiz";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: purple,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
      >
        <Stack.Screen
          name="Decks"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{ width: "120%", right: "50%" }}
                onPress={() => navigation.navigate("Add Deck")}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Add Deck" component={AddDeck} />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen name="Add Card" component={AddCard} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
