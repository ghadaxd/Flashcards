import React, { Component } from "react";
import { FlatList, StatusBar } from "react-native";
import { connect } from "react-redux";

import styled from "styled-components/native";

import DeckCard from "../ui/deckCard";
import { gray } from "../../utils/colors";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      decks: [],
    };
  }

  componentDidMount() {
    this.setState({
      decks: this.props.decks,
    });
  }

  componentDidUpdate() {
    if (this.props.decks !== this.state.decks) {
      this.setState({
        decks: this.props.decks,
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
              key={item.key}
              deck={item}
              navigation={this.props.navigation}
              type="home"
            />
          )}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={
            <NoDataText>You haven't created any decks yet! 😃</NoDataText>
          }
        />
      </Container>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Home);

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
