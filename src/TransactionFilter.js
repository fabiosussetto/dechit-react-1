import React, { Component } from 'react'

const shortcuts = [
    { label: 'Cheap', maxAmount: 10 },
    { label: 'Average', maxAmount: 30 },
    { label: 'Expensive', maxAmount: 9999 }
]

export default class TransactionFilter extends Component {

  state = {
    amount: 0
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.amount)
  }

  applyShortcut = (shortcut) => {
      this.setState({
          amount: shortcut.maxAmount
      }, () => {
        this.props.onSubmit(this.state.amount) 
      })
  }

  onAmountChange = (event) => {
    this.setState({
        amount: parseFloat(event.target.value)
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
        

        <button type="button" onClick={this.resetAmount}>Reset</button>

        <button type="submit">Filter</button>
      </form>
    )
  }
}
