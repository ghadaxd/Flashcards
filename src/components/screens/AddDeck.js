import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

import { _addDeck } from "../../utils/api";

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
      this.props.navigation.navigate("Decks");
    }
  };

  render() {
    return (
      <Container>
        <Wrapper behavior="height">
          <TextInput
            placeholder="Enter title"
            height="6%"
            value={this.state.deckTitle}
            onChangeText={(text) => this.setState({ deckTitle: text })}
          />
          {this.state.isEmpty && (
            <WarningMsg>
              ⚠️ You have to enter a title to create a deck.
            </WarningMsg>
          )}
          <Button
            title="Add Deck"
            type="primary"
            onPress={() => this.addDeck()}
          />
        </Wrapper>
      </Container>
    );
  }
}

export default AddDeck;

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  margin-top: 5%;
`;

const WarningMsg = styled.Text`
  font-size: 12px;
  color: ${purple};
  margin-top: 3%;
`;
