import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { connect } from "react-redux";

import NoCardsWarning from "../ui/noCardsWarning";
import QuizResult from "../ui/quizResult";
import FlashCards from "../ui/flashCards";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      cardNum: 0,
      result: 0,
    };
  }

  correctQuestion = (isCorrect) => {
    const { result, cardNum } = this.state;
    this.setState({
      result: isCorrect ? result + 1 : result,
      cardNum: cardNum + 1,
    });
  };

  restartQuiz = () => {
    this.setState({
      cardNum: 0,
      result: 0,
    });
  };

  render() {
    const { cards, cardNum, result } = this.state;

    return (
      <Container>
        <Wrapper
          style={{
            justifyContent:
              cards.length !== 0 && cardNum < cards.length
                ? "center"
                : "space-around",
          }}
        >
          {cards.length === 0 && (
            <NoCardsWarning goBack={this.props.navigation.goBack} />
          )}
          {cards.length !== 0 && cardNum === cards.length && (
            <QuizResult
              goBack={this.props.navigation.goBack}
              result={result}
              cardsLength={cards.length}
              restartQuiz={this.restartQuiz}
            />
          )}

          {cards.length !== 0 && cardNum < cards.length && (
            <FlashCards cards={cards} correctQuestion={this.correctQuestion} />
          )}
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
