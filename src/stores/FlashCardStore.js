import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _cards = null;

class FlashCardStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_ALL_CARDS':
        _cards = action.payload.data;
        console.log('_cards', _cards)
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
}

export default new FlashCardStore;
