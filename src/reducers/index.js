import { ADD_DECK, ADD_CARD } from "../actions/decks";

export default function decks(state = [], action) {
  switch (action.type) {
    case ADD_DECK:
      return [...state, action.deck];
    case ADD_CARD:
      return state.map((deck) => {
        if (deck.id === action.deckId) {
          deck.cards = [...deck.cards, action.card];
        }
        return deck;
      });
    default:
      return state;
  }
}
