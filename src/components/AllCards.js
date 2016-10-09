import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import CardActions from '../actions/CardActions'
import FlashCardStore from '../stores/FlashCardStore'

export default class AllCards extends Component {
  constructor() {
    super();
    this.state = {
      cards: FlashCardStore.getAllCards(),
      editing: null
    }

    this._onChange = this._onChange.bind(this);
    this._addNew = this._addNew.bind(this);
    this._editCard = this._editCard.bind(this);

  }

  componentWillMount() {
    // let { id } = this.props.params;
    CardActions.getAll();
    FlashCardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    FlashCardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      cards: FlashCardStore.getAllCards()
    })
  }

  _addNew(e) {
    e.preventDefault();
    let { question, answer, subject } = this.refs;

    let newCard = {
      question: question.value,
      answer: answer.value,
      subject: subject.value
    }
    CardActions.addNew(newCard);

    question.value = "";
    answer.value = "";
    subject.value = "";
  }

  _removeCard(cardId) {
    console.log('cardId', cardId);
    CardActions.removeCard(cardId);
  }

  _editCard(cardId) {
    this.setState({
      editing: cardId
    })
    // console.log('this.state', this.state);
  }

  _saveEdit(cardId) {
    let { editQuestion, editAnswer, editSubject } = this.refs;

    let updatedCard = {
      question: editQuestion.value,
      answer: editAnswer.value,
      subject: editSubject.value,
      id: this.state.editing
    }
    CardActions.editCard(updatedCard);

    this.setState({
      editing: null
    })
  }

  render() {
    // console.log('this.state', this.state)
    let { cards, editing } = this.state;
    let allCards = '';
    if(cards) {
      allCards = cards.map(card => {
        // editing:
        if (card.id === editing) {

          return(
            <tr key={card.id}>


              <td><input ref="editQuestion" type="text" defaultValue={card.question}/></td>

              <td><input ref="editAnswer" type="text" defaultValue={card.answer}/></td>

              <td><input ref="editSubject" type="text" defaultValue={card.subject}/></td>

              <td><button onClick={() => this._saveEdit(card.id)} className="btn btn-success"><span className="glyphicon glyphicon-ok-circle"></span></button></td>
              <td><button onClick={() => this._removeCard(card.id)} className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span></button></td>
            </tr>
          )

          // not editing:
        } else {
          return(
            <tr key={card.id}>
              <td>{card.question}</td>
              <td>{card.answer}</td>
              <td>{card.subject}</td>
              <td><button onClick={() => this._editCard(card.id)} className="btn btn-success"><span className="glyphicon glyphicon-pencil"></span></button></td>
              <td><button onClick={() => this._removeCard(card.id)} className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span></button></td>
            </tr>
          )
        }

      })
    }

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Subject</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {allCards}

          </tbody>
        </table>

        <form onSubmit={this._addNew} className="form-inline">
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <input ref="question" className="form-control" type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <input ref="answer" className="form-control" type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input ref="subject" className="form-control" type="text"/>
          </div>
          <button className="btn btn-primary">Add Flashcard</button>
        </form>


      </div>
    )
  }
}
