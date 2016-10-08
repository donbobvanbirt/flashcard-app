import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _card = null;

class TestStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_RAND_CARD':
        _card = action.payload.data;
        console.log('_card', _card)
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
}

export default new TestStore;
