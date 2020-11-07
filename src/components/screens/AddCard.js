import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar, Platform } from "react-native";

import { _addCard } from "../../utils/api";

import TextInput from "../ui/textInput";
import Button from "../ui/button";
import { purple } from "../../utils/colors";

class AddCard extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      answer: "",
      isEmpty: false,
    };
  }

  addCard = async () => {
    const { question, answer } = this.state;
    if (question === "" || answer === "") {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });

      const deck = await _addCard(this.props.route.params.id, {
        id: Math.floor(Math.random() * 100) + 1,
        question,
        answer,
      });

      this.props.navigation.navigate("Deck", { deck });
    }
  };

  render() {
    return (
      <Container
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
      >
        <TextInput
          placeholder="Enter question"
          height="6%"
          value={this.state.question}
          onChangeText={(text) => this.setState({ question: text })}
        />
        <Separator />
        <TextInput
          placeholder="Enter answer"
          height="6%"
          value={this.state.answer}
          onChangeText={(text) => this.setState({ answer: text })}
        />
        <WarningMsg>
          {this.state.isEmpty &&
            "⚠️ You have to enter both question and answer to create a card."}
        </WarningMsg>
        <Button
          title="Add Card"
          type="primary"
          onPress={() => this.addCard()}
        />
      </Container>
    );
  }
}

export default AddCard;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
  align-items: center;
`;

const Separator = styled.View`
  margin-top: 5%;
`;

const WarningMsg = styled.Text`
  font-size: 12px;
  color: ${purple};
  margin-top: 3%;
`;
