import React from "react";
import styled from "styled-components/native";

import { purple, white } from "../../utils/colors";

export default DeckCard = ({ deck, type, navigation }) => {
  const { title, cards } = deck;

  return (
    <Container
      onPress={() =>
        navigation.navigate("Deck", { id: deck.id, title: deck.title })
      }
      disabled={type !== "home"}
      type={type}
    >
      <DeckTitle>{title}</DeckTitle>
      <CardsNums>{cards.length} cards</CardsNums>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${white};
  margin-vertical: 8px;
  margin-horizontal: 16px;
  width: 90%;
  height: ${(props) => (props.type === "deck" ? "40%" : "null")};
  padding: 5%;
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
