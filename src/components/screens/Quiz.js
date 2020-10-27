import React, { Component } from "react";
import styled from "styled-components/native";
import { StatusBar, View, Animated, Easing, Platform } from "react-native";
import { connect } from "react-redux";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

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
      side: 0,
      progress: new Animated.Value(0),
      flipCard: new Animated.ValueXY({ x: 50, y: 50 }),
    };
  }

  flip = (type) => {
    const { flipCard, progress, side } = this.state;

    flipCard.setValue({
      x: 50,
      y: side === 0 ? 50 : 100,
    });

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
      });
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

    const { cards, type, cardNum, result, flipCard, progress } = this.state;

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

    return (
      <Container>
        <Wrapper style={{ justifyContent: "center" }}>
          <Content>{`${cardNum + 1}/${cards.length}`}</Content>
          <Animated.View
            style={[
              {
                width: "100%",
                transform: [{ rotateY: cardATransform }],
                opacity: sideAOpacity,
              },
            ]}
          >
            <Card content={cards[cardNum]["question"]} type={"question"} />
          </Animated.View>
          <Animated.View
            style={[
              {
                width: "100%",
                position: "absolute",
                height: "45%",
                transform: [{ rotateY: cardBTransform }],
                opacity: sideBOpacity,
              },
            ]}
          >
            <Card
              content={cards[cardNum]["answer"]}
              type={"answer"}
              correctQuestion={this.correctQuestion}
            />
          </Animated.View>
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
