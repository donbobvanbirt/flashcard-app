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
      selectedSubs: [],
      cardActive: false
    }
    this._onChange = this._onChange.bind(this);
    this._getCard = this._getCard.bind(this);
    this._boxChecked = this._boxChecked.bind(this);
    this._getRandomCard = this._getRandomCard.bind(this);
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
      cardActive: true
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

  render() {
    let { card, subjects, cardActive } = this.state;
    let cardQuestion, cardAnswer, cardId, checkboxes = '';

    if (card) {
      cardQuestion = card.question;
      cardAnswer = card.answer;
      // cardId = card.id

      // let checkboxes =
    }


    console.log('card.Answer', cardAnswer)

    return (
      <div>
        <h3>{cardQuestion}</h3>
        <h3>{cardAnswer}</h3>
        <button onClick={this._getCard} disabled={!cardActive} className="btn btn-success">Show Answer</button>
        <hr/>
        <form onSubmit={this._getRandomCard}>

          <button disabled={cardActive} className="btn btn-primary"><span className="glyphicon glyphicon-random"></span></button>
          <div>
            {subjects.map((sub, i) => {
              if(subjects[i-1] !== sub) {
                return (
                  <div className="checkbox">
                    <label key={i}><input type="checkbox" onChange={() => this._boxChecked(sub)} value={sub}/>{sub}</label>
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
