import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchTitles } from './state/actions'

const TransactionTitleList = (props) => {
  const { elem } = props
  return (
    <option value={elem.value}>{elem.title}</option>
  )
}

class TransactionAddForm extends Component {

  state = {
      title: 'coco',
      amount: 60,
      descriptions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

  componentDidMount () {
    this.props.dispatch(fetchTitles())
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value ? target.value : 0

    if( target.value && target.type === 'number' ) {
      value = parseFloat(target.value);
    }

    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        amount: this.state.amount,
        title: this.state.title,
        descriptions: this.state.descriptions,
      }
    })
  }

  render() {

    const elems = this.props.transaction_titles.list

    return (
      <form onSubmit={this.onSubmit} className="form-inline">
        <input
            name="amount"
            type="number"
            value={this.state.amount}
            onChange={this.handleInputChange}
        />

        <select name="title" value={this.state.title} onChange={this.handleInputChange}>
          {elems.map((elem) => (
              <TransactionTitleList
                elem={elem}
                key={elem.value}
              />
            ))}
        </select>
        <input
            name="descriptions"
            type="text"
            value={this.state.descriptions}
            onChange={this.handleInputChange}
        />
        <div className="ml-2">
          <button type="submit" className="btn btn-sm btn-success mr-2">Add</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction_titles: state.transaction_titles
  }
}

export default connect(mapStateToProps)(TransactionAddForm);
