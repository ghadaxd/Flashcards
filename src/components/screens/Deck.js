import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

import Button from "../ui/button";
import DeckCard from "../ui/deckCard";

class Deck extends Component {
  render() {
    return (
      <Container>
        <Wrapper>
          <DeckCard
            deck={this.props.route.params.deck}
            navigation={this.props.navigation}
            type="deck"
          />
          <Button
            title="Add Card"
            type="secondary"
            onPress={() => alert("ADD")}
          />
          <Button
            title="Start Quiz"
            type="primary"
            onPress={() => alert("START")}
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
