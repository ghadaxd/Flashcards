import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

import { connect } from "react-redux";
import { addDeck } from "../../actions/decks";

import TextInput from "../ui/textInput";
import Button from "../ui/button";

class AddDeck extends Component {
  constructor() {
    super();
    this.state = {
      deckTitle: "",
    };
  }

  addDeck = () => {
    this.props.addDeck({
      id: Math.floor(Math.random() * 100) + 1,
      title: this.state.deckTitle,
      cards: [],
    });
    this.props.navigation.navigate("Decks");
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

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (deck) => dispatch(addDeck(deck)),
  };
};

export default connect(null, mapDispatchToProps)(AddDeck);

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  margin-top: 5%;
`;
