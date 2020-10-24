import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";

import { purple, white } from "./src/utils/colors";

import Home from "./src/components/screens/Home";
import AddDeck from "./src/components/screens/AddDeck";
import Deck from "./src/components/screens/Deck";
import AddCard from "./src/components/screens/AddCard";
import Quiz from "./src/components/screens/Quiz";

const Stack = createStackNavigator();

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
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
                  style={{ width: "120%", right: "15%" }}
                  onPress={() => navigation.navigate("Add Deck")}
                >
                  <Text style={{ color: white }}>Add Deck</Text>
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
    </Provider>
  );
}
