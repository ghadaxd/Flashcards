import React, { Component } from "react";
import styled from "styled-components/native";
import { Animated, StyleSheet } from "react-native";

import Button from "./button";
import Card from "./card";
import { purple } from "../../utils/colors";

export default class FlashCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      type: "question",
      answer: "",
      cardNum: 0,
      side: 0,
      progress: new Animated.Value(0),
      flipCard: new Animated.ValueXY({ x: 50, y: 50 }),
    };
  }

  flip = (type) => {
    const { flipCard, progress, side, cards, cardNum } = this.state;

    flipCard.setValue({
      x: 50,
      y: side === 0 ? 50 : 100,
    });

    this.setState({ answer: "" });

    Animated.parallel([
      Animated.timing(progress, {
        toValue: side === 0 ? 100 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(flipCard, {
        toValue: {
          x: 50,
          y: side === 0 ? 100 : 50,
        },
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        type: type === "question" ? "answer" : "question",
        side: side === 0 ? 1 : 0,
        answer: cards[cardNum]["answer"],
      });
    });
  };

  getTransformation = (side) => {
    const { flipCard, progress } = this.state;
    // Handle cardA transformation
    const cardATransform = flipCard.y.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: ["-180deg", "0deg", "180deg", "0deg"],
      extrapolate: "clamp",
    });
    const sideAOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [100, 0],
      extrapolate: "clamp",
    });

    // Handle cardB transformation
    const cardBTransform = flipCard.y.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: ["0deg", "180deg", "0deg", "-180deg"],
      extrapolate: "clamp",
    });
    const sideBOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return {
      transform: [{ rotateY: side === "A" ? cardATransform : cardBTransform }],
      opacity: side === "A" ? sideAOpacity : sideBOpacity,
    };
  };

  correctQuestion = (isCorrect) => {
    const { cardNum, type } = this.state;
    this.setState({
      cardNum: cardNum + 1,
    });
    this.props.correctQuestion(isCorrect);
    this.flip(type);
  };

  render() {
    const { cards, cardNum, type, answer } = this.state;

    return (
      <>
        <Content>{`${cardNum + 1}/${cards.length}`}</Content>
        <Animated.View style={[{ width: "100%" }, this.getTransformation("A")]}>
          <Card
            content={cards[cardNum]["question"]}
            type={"question"}
            correctQuestion={this.correctQuestion}
            flip={this.flip}
            flipType={type}
          />
        </Animated.View>
        <Animated.View style={[styles.cardB, this.getTransformation("B")]}>
          <Card
            content={answer}
            type={"answer"}
            correctQuestion={this.correctQuestion}
            flip={this.flip}
            flipType={type}
          />
        </Animated.View>
        <Button
          title={`Show ${type === "question" ? "Answer" : "Question"}`}
          type="secondary"
          onPress={() => this.flip(type)}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardB: {
    width: "100%",
    position: "absolute",
    height: "42.5%",
    bottom: "32%",
  },
});

const Content = styled.Text`
  font-size: 12px;
  color: ${purple};
`;
