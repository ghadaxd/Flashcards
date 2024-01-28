import React, { Component } from "react";
import { FlatList, StatusBar } from "react-native";

import styled from "styled-components/native";

import { _getDecks } from "../../utils/api";
import { setLocalNotification } from "../../utils/helpers";

import DeckCard from "../ui/deckCard";
import { gray } from "../../utils/colors";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      decks: [],
    };
  }

  async componentDidMount() {
    const decks = await _getDecks();
    if (decks.length !== 0) {
      setLocalNotification();
    }
    this.setState({
      decks,
    });
  }

  async componentDidUpdate() {
    const decks = await _getDecks();
    if (decks !== this.state.decks) {
      this.setState({
        decks,
      });
    }
  }

  render() {
    return (
      <Container>
        <FlatList
          data={this.state.decks}
          renderItem={({ item }) => (
            <DeckCard
              deck={item}
              navigation={this.props.navigation}
              type="home"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <NoDataText>You haven't created any decks yet! 😃</NoDataText>
          }
        />
      </Container>
    );
  }
}

export default Home;

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const NoDataText = styled.Text`
  font-size: 14px;
  color: ${gray};
  text-align: center;
  margin-top: 10%;
`;
