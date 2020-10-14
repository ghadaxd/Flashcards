export const ADD_DECK = "ADD_DECK";

export const GET_DECKS = "GET_DECKS";

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
};

export const getDecks = () => {
  return {
    type: GET_DECKS,
  };
};
