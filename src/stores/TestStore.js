import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _card = null;
let _answerResults = '';

class TestStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_RAND_CARD':
          _card = action.payload.data;
          _answerResults = '';
          // console.log('_card', _card)
          this.emit('CHANGE');
          break;
        case 'CHECK_ANSWER':
          _answerResults = action.payload.data;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE',cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE',cb)
  }

  getCard() {
    return _card;
  }

  getResult() {
    return _answerResults;
  }
}

export default new TestStore;
