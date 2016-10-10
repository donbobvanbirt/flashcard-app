
import React, { Component } from 'react'

import { Link } from 'react-router'
import classNames from 'classnames'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    let path = this.props.location.pathname;


    return (
      <div className='container'>

        <ul className="nav nav-tabs">
          <li role="presentation" className={classNames({active: path === '/'})}><Link to ='/'>Flashcards</Link></li>

          <li role="presentation" className={classNames({active: path === '/test'})}><Link to ='/test'>Test Your Knowledge</Link></li>
        </ul>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
          </ul>
        </div>

        <div className='center'>
          {this.props.children}
        </div>
        
      </div>
    )
  }
}
