import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import CardActions from '../actions/CardActions'
import TestStore from '../stores/TestStore'

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      card: null
    }
    this._onChange = this._onChange.bind(this);
    this._getCard = this._getCard.bind(this);

  }

  componentWillMount() {
    TestStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TestStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      card: TestStore.getCard()
    })
    console.log('this.state', this.state)
  }

  _getCard() {
    // console.log('id in Test.js', id);
    let id = '';
    if(this.state.card) {
      id = this.state.card.id;
    }
    CardActions.getCard(id);
  }

  _getRandomCard() {
    CardActions.getCard('random');
  }

  render() {
    let { card } = this.state;
    let cardQuestion, cardAnswer, cardId = '';

    if (card) {
      cardQuestion = card.question;
      cardAnswer = card.answer;
      // cardId = card.id
    }

    // let testFunction = () =>  this._getCard(event, cardId);
    console.log('card', card);
    console.log('card.Answer', cardAnswer)

    return (
      <div>
        <h3>{cardQuestion}</h3>
        <h3>{cardAnswer}</h3>
        <button onClick={this._getRandomCard} className="btn btn-primary"><span className="glyphicon glyphicon-random"></span></button>
        <button onClick={this._getCard} className="btn btn-success">Show Answer</button>
      </div>
      )
    }
  }
