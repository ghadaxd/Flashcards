import React, { Component } from "react";
import styled from "styled-components/native";

import { connect } from "react-redux";
import { addDeck } from "../../actions/decks";

import CustomStatusBar from "../ui/customStatusBar";
import TextInput from "../ui/textInput";
import Button from "../ui/button";
import { lightGray } from "../../utils/colors";

class AddDeck extends Component {
  constructor() {
    super();
    this.state = {
      deckTitle: "",
    };
  }

  addDeck = () => {
    this.props.addDeck({ title: this.state.deckTitle, cards: [] });
    this.props.navigation.navigate("Decks");
  };

  render() {
    return (
      <Container>
        <CustomStatusBar />
        <Wrapper>
          <TextInput
            placeholder="Enter title"
            height="5%"
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

const Container = styled.View`
  background-color: ${lightGray};
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 5%;
`;
