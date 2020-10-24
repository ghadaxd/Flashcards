import React from "react";
import styled from "styled-components/native";

import Button from "./button";
import { purple, white } from "../../utils/colors";

export default Card = ({ content, type, correctQuestion }) => {
  const btnStyle = {
    height: "100%",
    width: "50%",
    marginTop: "0%",
    marginBottom: "0%",
    borderRadius: "0%",
  };

  return (
    <Container disabled={true} type={type}>
      <Content>{content}</Content>
      {type === "answer" && (
        <Wrapper>
          <Button
            style={btnStyle}
            title="Correct"
            type="primary"
            onPress={() => correctQuestion(true)}
          />
          <Button
            style={btnStyle}
            title="Incorrect"
            type="secondary"
            onPress={() => correctQuestion(false)}
          />
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${white};
  margin-vertical: 8px;
  margin-horizontal: 16px;
  width: 90%;
  height: 40%;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075);
`;

const Content = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${purple};
  text-align: center;
  padding: 5%;
  margin-top: 30%;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 15%;
  flex-direction: row;
`;
