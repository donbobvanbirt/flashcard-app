
import axios, { get, post, delete } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getAll() {
    get('/flashcards')
    .then(res => {
      let data = res.data;
      // console.log('data', data);
      ServerActions.receiveAllCards(data);
    })
    .catch(console.error)
  },

  addNew(newCard) {
    let { question, answer, subject } = newCard;
    post('/flashcard', {
      question,
      answer,
      subject
    })
    .then(res => {
      // console.log('res', res);
      this.getAll();
    })
    .catch(console.error);
  },

  removeCard(cardId) {
    // console.log('cardId in api:', cardId);
    axios.delete(`/flashcard/${cardId}`)
    .then(res => {
      // console.log('res', res);
      this.getAll();
    })
    .catch(console.error);
  },

  editCard(card) {
    let { question, answer, subject } = card;
    axios.put(`/flashcard/${card.id}`, {
      question,
      answer,
      subject
    })
    .then(res => {
      this.getAll();
    })
    .catch(console.error);
  },

  getCard(id) {
    // console.log('id', id);
    get(`/flashcard/${id}`)
    .then(res => {
      let data = res.data;
      // console.log('data in API:', data);
      ServerActions.receiveRandCard(data);
      // console.log(data);

    })
    .catch(console.error);
  },

  checkAnswer(answer, id) {
    get(`/answer/${id}/${answer}`)
    .then(res => {
      let data = res.data;
      // console.log('data in API:', data);
      ServerActions.checkAnswer(data);
    })
    .catch(console.error);
  }

}

export default API;
