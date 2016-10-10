import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _cards = null;
let _subjects = null;

class FlashCardStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_ALL_CARDS':
        _cards = action.payload.data;
        _subjects = _cards.map(card => { return card.subject }).sort();
        // console.log('_cards', _cards)
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

  getAllCards() {
    return _cards;
  }

  getSubjects() {
    return _subjects;
  }
}

export default new FlashCardStore;
