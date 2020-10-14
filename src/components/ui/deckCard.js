import React from "react";
import styled from "styled-components/native";

import { purple, white } from "../../utils/colors";

export default DeckCard = ({ deckTitle, numOfCards, height }) => {
  return (
    <Container height={height}>
      <DeckTitle>{deckTitle}</DeckTitle>
      <CardsNums>{numOfCards}</CardsNums>
    </Container>
  );
};

const Container = styled.View`
  height: ${(props) => props.height};
  width: 90%;
  margin-top: 5%;
  background-color: ${white};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075);
`;

const DeckTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${purple};
`;

const CardsNums = styled.Text`
  font-size: 12px;
  color: ${purple};
  margin-top: 5%;
`;
