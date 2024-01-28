import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import { _removeDeck } from "../../utils/api";

import Button from "../ui/button";
import DeckCard from "../ui/deckCard";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: this.props.route.params.deck,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ width: "120%", right: "50%" }}
          onPress={() => this.createAlert()}
        >
          <MaterialIcons name="delete-forever" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }

  componentDidUpdate() {
    const deck = this.props.route.params.deck;
    if (deck !== this.state.deck) {
      this.setState({
        deck,
      });
    }
  }

  createAlert = () => {
    Alert.alert(
      "Deleting Deck",
      "Are you sure you want to delete this deck?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.deleteDeck() },
      ],
      { cancelable: false }
    );
  };

  deleteDeck = async () => {
    const removed = await _removeDeck(this.state.deck.id);
    if (removed === "200") {
      this.props.navigation.navigate("Decks");
    }
  };

  render() {
    const { deck } = this.state;

    return (
      <Container>
        <Wrapper>
          <DeckCard
            deck={deck}
            navigation={this.props.navigation}
            type="deck"
          />
          <Button
            title="Add Card"
            type="secondary"
            onPress={() =>
              this.props.navigation.navigate("Add Card", {
                id: deck.id,
              })
            }
          />
          <Button
            title="Start Quiz"
            type="primary"
            onPress={() =>
              this.props.navigation.navigate("Quiz", {
                cards: deck.cards,
              })
            }
          />
        </Wrapper>
      </Container>
    );
  }
}

export default Deck;

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
