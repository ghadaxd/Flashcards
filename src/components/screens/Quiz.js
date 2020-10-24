import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar, View } from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import Button from "../ui/button";
import Card from "../ui/card";
import { purple } from "../../utils/colors";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      type: "question",
      cardNum: 0,
      result: 0,
    };
  }

  flip = (type) => {
    //will do the flip animation.
    this.setState({
      type: type === "question" ? "answer" : "question",
    });
  };

  correctQuestion = (isCorrect) => {
    const { result, cardNum } = this.state;
    this.setState({
      result: isCorrect ? result + 1 : result,
      cardNum: cardNum + 1,
      type: "question",
    });
  };

  restartQuiz = () => {
    this.setState({
      type: "question",
      cardNum: 0,
      result: 0,
    });
  };

  render() {
    if (this.state.cards.length === 0) {
      return (
        <Container>
          <Wrapper>
            <AntDesign name="frowno" size={250} color={purple} />
            <View>
              <Title>Oops!</Title>
              <Content>There is no cards to start the quiz.</Content>
            </View>
            <Button
              title="Back to Deck"
              type="secondary"
              onPress={() => this.props.navigation.goBack()}
            />
          </Wrapper>
        </Container>
      );
    }

    const { cards, type, cardNum, result } = this.state;

    if (cardNum === cards.length) {
      return (
        <Container>
          <Wrapper style={{ justifyContent: "space-around" }}>
            <FontAwesome5 name="grin-hearts" size={200} color={purple} />
            <View>
              <Title style={{ fontSize: "40px" }}>Finished!</Title>
              <Content style={{ fontSize: "20px" }}>
                Awesome, Your result is:
              </Content>
              <Title
                style={{
                  fontSize: "40px",
                  borderColor: purple,
                  borderWidth: 3,
                  marginTop: "5%",
                }}
              >{`${result} out of ${cards.length}`}</Title>
            </View>
            <View
              style={{
                width: "90%",
                height: "30%",
                alignItems: "center",
              }}
            >
              <Button
                title="Back to Deck"
                type="secondary"
                onPress={() => this.props.navigation.goBack()}
                style={{ height: "20%" }}
              />
              <Button
                title="Restart Quiz"
                type="primary"
                onPress={() => this.restartQuiz()}
                style={{ height: "20%" }}
              />
            </View>
          </Wrapper>
        </Container>
      );
    }

    return (
      <Container>
        <Wrapper style={{ justifyContent: "center" }}>
          <Content>{`${cardNum + 1}/${cards.length}`}</Content>
          <Card
            content={cards[cardNum][type]}
            type={type}
            correctQuestion={this.correctQuestion}
          />
          <Button
            title={`Show ${type === "question" ? "Answer" : "Question"}`}
            type="secondary"
            onPress={() => this.flip(type)}
          />
        </Wrapper>
      </Container>
    );
  }
}

function mapStateToProps(decks, props) {
  return {
    cards: decks.find((deck) => deck.id === props.route.params.id).cards,
  };
}

export default connect(mapStateToProps)(Quiz);

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

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
