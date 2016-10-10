import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import CardActions from '../actions/CardActions'
import TestStore from '../stores/TestStore'
import FlashCardStore from '../stores/FlashCardStore'

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      card: TestStore.getCard(),
      subjects: FlashCardStore.getSubjects() || [],
      answerResult: TestStore.getResult(),
      selectedSubs: [],
      cardActive: false
    }
    this._onChange = this._onChange.bind(this);
    this._getCard = this._getCard.bind(this);
    this._boxChecked = this._boxChecked.bind(this);
    this._getRandomCard = this._getRandomCard.bind(this);
    this._checkAnswer = this._checkAnswer.bind(this);
  }

  componentWillMount() {
    CardActions.getAll();
    TestStore.startListening(this._onChange);
    FlashCardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TestStore.stopListening(this._onChange);
    FlashCardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      card: TestStore.getCard(),
      answerResult: TestStore.getResult(),
      subjects: FlashCardStore.getSubjects()
    })
    console.log('this.state', this.state)
  }

  _getCard() {
    this.setState({
      cardActive: false
    })
    let id = '';
    if(this.state.card) {
      id = this.state.card.id;
    }
    CardActions.getCard(id);
  }

  _getRandomCard(e) {
    e.preventDefault();

    this.setState({
      cardActive: true,
      answerResult: ''
    })

    let { selectedSubs } = this.state;
    let path = "random";
    if(selectedSubs !== []) {
      path += '?';
      selectedSubs.forEach((sub, i) => {
        if(i > 1) {path += '&'};
        path += `subject=${sub}`;
      })
    }
    console.log('path', path);
    CardActions.getCard(path);
  }

  _boxChecked(sub) {
    let { selectedSubs } = this.state;

    if(selectedSubs.indexOf(sub) > -1) {
      selectedSubs = selectedSubs.filter((item) => {return item !== sub})
    } else {
      selectedSubs.push(sub)
    }
    this.setState({
      selectedSubs
    })
    console.log('this.state', this.state)
  }

  _checkAnswer() {
    let id = '';
    let { answer } = this.refs;
    if(this.state.card) {
      id = this.state.card.id;
    }
    // console.log('checkAnswer, id:', answer.value, id);
    if(answer.value) {
      CardActions.checkAnswer(answer.value, id);
    }
  }

  render() {
    let { card, subjects, cardActive, answerResult } = this.state;
    let cardQuestion, cardAnswer, cardId, checkboxes = '';

    if (card) {
      cardQuestion = card.question;
      cardAnswer = card.answer;
      // cardId = card.id

      // let checkboxes =
    }


    console.log('card.Answer', cardAnswer)

    return (
      <div className="text-center">
        <h3>{cardQuestion}</h3>
        <h3>{cardAnswer}</h3>
        <button onClick={this._getCard} disabled={!cardActive} className="btn btn-success">Show Answer</button>
        <br/>
        <input ref="answer" type="text"/>
        <button onClick={this._checkAnswer} disabled={!cardActive} className="btn btn-default">Check</button>
        <h3>{answerResult}</h3>
        <hr/>
        <form onSubmit={this._getRandomCard}>

          <button disabled={cardActive} className="btn btn-primary"><span className="glyphicon glyphicon-random"></span></button>
          <div>
            {subjects.map((sub, i) => {
              if(subjects[i-1] !== sub) {
                return (
                  <div key={i} className="checkbox">
                    <label><input type="checkbox" onChange={() => this._boxChecked(sub)} value={sub}/>{sub}</label>
                  </div>
                )
              }
            })}
          </div>

        </form>
      </div>
    )
  }
}
