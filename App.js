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
          <Stack.Screen name="Deck" component={Deck} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
