import { ADD_DECK, GET_DECKS } from "../actions/decks";

export default function decks(state = [], action) {
  switch (action.type) {
    case ADD_DECK:
      console.log(state);

      return [...state, action.deck];
    case GET_DECKS:
      return state;
    default:
      return state;
  }
}
