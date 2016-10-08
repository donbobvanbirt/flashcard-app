
import React, { Component } from 'react'

import { Link } from 'react-router'
import classNames from 'classnames'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div className='container'>
        <nav className="navbar navbar-default">

          <div className="navbar-header">
            {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>

              </button> */}
              <div className="navbar-brand"><Link to ='/'>Flashcards</Link></div>
              <div className="navbar-brand"><Link to ='/test'>Test Your Knowledge</Link></div>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                {/* <li role="presentation" className={classNames({active: path === '/favorites'})}><Link to ='/favorites'>Favorites</Link></li> */}
              </ul>
            </div>

          </nav>

          <div className='center'>
            {this.props.children}
          </div>
        </div>
      )
    }
  }
