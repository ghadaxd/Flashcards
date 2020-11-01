import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components/native";

import Button from "../ui/button";
import { purple } from "../../utils/colors";

export default QuizResult = ({ goBack, result, cardsLength, restartQuiz }) => {
  return (
    <>
      <FontAwesome5 name="grin-hearts" size={200} color={purple} />
      <View>
        <Title>Finished!</Title>
        <Content>Awesome, Your result is:</Content>
        <ResultBox>{`${result} out of ${cardsLength}`}</ResultBox>
      </View>
      <BtnWrapper>
        <Button
          title="Back to Deck"
          type="secondary"
          onPress={() => goBack()}
          style={{ height: "20%" }}
        />
        <Button
          title="Restart Quiz"
          type="primary"
          onPress={() => restartQuiz()}
          style={{ height: "20%" }}
        />
      </BtnWrapper>
    </>
  );
};

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${purple};
  text-align: center;
`;

const Content = styled.Text`
  font-size: 20px;
  color: ${purple};
`;

const BtnWrapper = styled.View`
  width: 90%;
  height: 30%;
  align-items: center;
`;

const ResultBox = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${purple};
  text-align: center;
  border-color: ${purple};
  border-width: 3px;
  margin-top: ${"5%"};
`;
