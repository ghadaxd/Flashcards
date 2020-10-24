import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { connect } from "react-redux";

import Button from "../ui/button";
import DeckCard from "../ui/deckCard";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: props.deck,
    };
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <DeckCard
            deck={this.state.deck}
            navigation={this.props.navigation}
            type="deck"
          />
          <Button
            title="Add Card"
            type="secondary"
            onPress={() =>
              this.props.navigation.navigate("Add Card", {
                id: this.props.route.params.id,
                title: this.props.route.params.title,
              })
            }
          />
          <Button
            title="Start Quiz"
            type="primary"
            onPress={() =>
              this.props.navigation.navigate("Quiz", {
                id: this.props.route.params.id,
              })
            }
          />
        </Wrapper>
      </Container>
    );
  }
}

function mapStateToProps(decks, props) {
  return {
    deck: decks.find((deck) => deck.id === props.route.params.id),
  };
}

export default connect(mapStateToProps)(Deck);

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
