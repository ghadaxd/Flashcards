import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components/native";

import Button from "../ui/button";
import { purple } from "../../utils/colors";

export default NoCardsWarning = ({ goBack }) => {
  return (
    <>
      <AntDesign name="frowno" size={250} color={purple} />
      <View>
        <Title>Oops!</Title>
        <Content>There is no cards to start the quiz.</Content>
      </View>
      <Button title="Back to Deck" type="secondary" onPress={() => goBack()} />
    </>
  );
};

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${purple};
  text-align: center;
`;

const Content = styled.Text`
  font-size: 12px;
  color: ${purple};
`;
