import React, { Component } from 'react'
import { connect } from "react-redux";
import { setFilterAmount } from './state/actions'

const shortcuts = [
    { label: 'Cheap', maxAmount: 10 },
    { label: 'Average', maxAmount: 30 },
    { label: 'Expensive', maxAmount: 9999 }
]

class TransactionFilter extends Component {

  state = {
    amount: 0
  }

  onSubmit = (event) => {
    event.preventDefault();

    console.log('this.props',this.props);
    this.props.dispatch(setFilterAmount(this.state.amount))
  }

  applyShortcut = (shortcut) => {
    this.setState({
         amount: shortcut.maxAmount
    }, () => {
      this.props.dispatch(setFilterAmount(this.state.amount))
     })
  }

  onAmountChange = (event) => {
    this.setState({
        amount: event.target.value ? parseFloat(event.target.value) : 0
    })
  }

  resetAmount = () => {
    this.setState({
        amount: 0
   }, () => {
     this.props.dispatch(setFilterAmount(this.state.amount))
    })
  }

  render() {
    return (
      <div className="d-flex flex-column mb-4">
        <form onSubmit={this.onSubmit} className="form-inline">
          <input
              type="number"
              value={this.state.amount}
              onChange={this.onAmountChange}
              className="c-filter-input form-control mr-2 mb-2"
          />
          <div className="mb-2">
            <button type="submit" className="btn btn-primary mr-2">Filter</button>
            <button type="button" className="btn btn-secondary mr-2" onClick={this.resetAmount}>Reset</button>
          </div>
        </form>
        <div>
            {shortcuts.map(shortcut => (
                <span
                    key={shortcut.label}
                    className="badge badge-secondary mr-2"
                    onClick={() => this.applyShortcut(shortcut)}>
                    {shortcut.label}
                </span>
            ))}
        </div>
      </div>
    )
  }
}

export default connect()(TransactionFilter)
