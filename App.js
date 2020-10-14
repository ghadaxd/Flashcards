import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";

import { purple } from "./src/utils/colors";

import Home from "./src/components/screens/Home";
import AddDeck from "./src/components/screens/AddDeck";

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
            },
          }}
        >
          <Stack.Screen
            name="Decks"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("Add Deck")}
                  title="Add Deck"
                  color="#fff"
                />
              ),
            })}
          />
          <Stack.Screen name="Add Deck" component={AddDeck} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
