import API from '../API'

const CardActions = {
  getAll() {
    API.getAll();
  },

  addNew(newCard) {
    API.addNew(newCard);
  },

  removeCard(cardId) {
    API.removeCard(cardId);
  },

  editCard(card) {
    API.editCard(card);
  },

  getCard(id) {
    API.getCard(id);
  }
}

export default CardActions;
