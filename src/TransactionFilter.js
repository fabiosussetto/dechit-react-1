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
    this.props.dispatch(setFilterAmount(this.state.amount))
  }

  applyShortcut = (shortcut) => {
      // this.setState({
      //     amount: shortcut.maxAmount
      // }, () => {
      //   this.props.onSubmit(this.state.amount) 
      // })
  }

  onAmountChange = (event) => {
    this.setState({
        amount: event.target.value ? parseFloat(event.target.value) : 0
    })
  }

  resetAmount = () => {
    this.setState({
        amount: 0
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        Amount: 
        <input 
            type="number" 
            value={this.state.amount} 
            onChange={this.onAmountChange}  
        />

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
        
        <div className="mt-2">
          <button type="submit" className="btn btn-sm btn-primary mr-2">Filter</button>
          <button type="button" className="btn btn-sm btn-secondary" onClick={this.resetAmount}>Reset</button>
        </div>
      </form>
    )
  }
}

export default connect()(TransactionFilter)
