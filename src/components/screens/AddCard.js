import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

import { connect } from "react-redux";
import { addCard } from "../../actions/decks";

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

  addCard = () => {
    const { question, answer } = this.state;
    if (question === "" || answer === "") {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });
      this.props.addCard(
        {
          id: Math.floor(Math.random() * 100) + 1,
          question,
          answer,
        },
        this.props.route.params.id
      );

      this.props.navigation.navigate("Deck", {
        id: this.props.route.params.id,
        title: this.props.route.params.title,
      });
    }
  };

  render() {
    return (
      <Container>
        <Wrapper behavior="height">
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
          {this.state.isEmpty && (
            <WarningMsg>
              ⚠️ You have to enter both question and answer to create a card.
            </WarningMsg>
          )}
          <Button
            title="Add Card"
            type="primary"
            onPress={() => this.addCard()}
          />
        </Wrapper>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card, deckId) => dispatch(addCard(card, deckId)),
  };
};

export default connect(null, mapDispatchToProps)(AddCard);

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  margin-top: 5%;
`;

const Separator = styled.View`
  margin-top: 5%;
`;

const WarningMsg = styled.Text`
  font-size: 12px;
  color: ${purple};
  margin-top: 3%;
`;
