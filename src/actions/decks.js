export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
};

export const addCard = (card, deckId) => {
  return {
    type: ADD_CARD,
    card,
    deckId,
  };
};
