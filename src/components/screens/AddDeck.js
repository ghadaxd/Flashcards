import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar, Platform } from "react-native";

import { _addDeck } from "../../utils/api";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../../utils/helpers";

import TextInput from "../ui/textInput";
import Button from "../ui/button";
import { purple } from "../../utils/colors";

class AddDeck extends Component {
  constructor() {
    super();
    this.state = {
      deckTitle: "",
      isEmpty: false,
    };
  }

  addDeck = () => {
    if (this.state.deckTitle === "") {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });

      const id = Math.floor(Math.random() * 100) + 1;

      const deck = {
        id,
        title: this.state.deckTitle,
        cards: [],
      };

      _addDeck(id, deck);
      clearLocalNotification().then(setLocalNotification);
      this.props.navigation.navigate("Decks");
    }
  };

  render() {
    return (
      <Container
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
      >
        <TextInput
          placeholder="Enter title"
          height="6%"
          value={this.state.deckTitle}
          onChangeText={(text) => this.setState({ deckTitle: text })}
        />
        <WarningMsg>
          {this.state.isEmpty &&
            "⚠️ You have to enter a title to create a deck."}
        </WarningMsg>
        <Button
          title="Add Deck"
          type="primary"
          onPress={() => this.addDeck()}
        />
      </Container>
    );
  }
}

export default AddDeck;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
  align-items: center;
`;

const WarningMsg = styled.Text`
  font-size: 12px;
  color: ${purple};
  margin-top: 3%;
`;
