import React, { Component } from "react";

import styled from "styled-components/native";

import { lightGray, gray } from "../../utils/colors";
import CustomStatusBar from "../ui/customStatusBar";
import DeckCard from "../ui/deckCard";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      decks: [
        { id: 0, deckTitle: "Deck1", numOfCards: 3 },
        { id: 1, deckTitle: "Deck2", numOfCards: 4 },
      ],
    };
  }

  render() {
    if (this.state.decks.length === 0) {
      return (
        <Container>
          <CustomStatusBar />
          <Wrapper>
            <NoDataText>You haven't created any decks yet! 😃</NoDataText>
          </Wrapper>
        </Container>
      );
    }
    return (
      <Container>
        <CustomStatusBar />
        <Wrapper>
          {this.state.decks.map(({ id, deckTitle, numOfCards }) => (
            <DeckCard
              deckTitle={deckTitle}
              numOfCards={numOfCards}
              height="20%"
              key={id}
            />
          ))}
        </Wrapper>
      </Container>
    );
  }
}

const Container = styled.View`
  background-color: ${lightGray};
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 5%;
`;

const NoDataText = styled.Text`
  font-size: 14px;
  color: ${gray};
`;
