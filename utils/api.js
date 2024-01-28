import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "FlashCards:decks";

// Error code: 111
export const _addDeck = (id, deck) => {
  try {
    return AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [id]: deck,
      })
    );
  } catch (error) {
    return "ERROR: 111";
  }
};

// Error code: 222
export const _getDecks = () => {
  try {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((results) => {
      return Object.values(JSON.parse(results));
    });
  } catch (error) {
    return "ERROR: 222";
  }
};

// Error code: 333
export const _addCard = async (deckId, card) => {
  try {
    return await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(
      (results) => {
        const data = JSON.parse(results);
        data[deckId]["cards"] = [...data[deckId]["cards"], card];
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
        return data[deckId];
      }
    );
  } catch (error) {
    return "ERROR: 333";
  }
};

// Error code: 444
export const _removeDeck = (key) => {
  try {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((results) => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
      return "200";
    });
  } catch (error) {
    return "ERROR: 444";
  }
};
