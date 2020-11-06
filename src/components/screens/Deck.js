import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

import Button from "../ui/button";
import DeckCard from "../ui/deckCard";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: this.props.route.params.deck,
    };
  }

  componentDidUpdate() {
    const deck = this.props.route.params.deck;
    if (deck !== this.state.deck) {
      this.setState({
        deck,
      });
    }
  }

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
