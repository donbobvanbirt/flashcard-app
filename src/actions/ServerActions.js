import AppDispatcher from '../AppDispatcher'


const ServerActions ={
  receiveAllCards(data) {
    AppDispatcher.dispatch({
      type:'RECEIVE_ALL_CARDS',
      payload: { data }
    })
  },

  receiveRandCard(data) {
    console.log('data in ServerActions:', data);
    AppDispatcher.dispatch({
      type:'RECEIVE_RAND_CARD',
      payload: { data }
    })
  }

}

export default ServerActions;
