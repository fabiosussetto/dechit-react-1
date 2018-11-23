import React, { Component } from 'react'

export default class TransactionCard extends Component {
  
  render() {
    const { transaction } = this.props

    return (
        <div className="card">
            <h5 className="card-title">{transaction.title}</h5>
            <p className="card-text">
                Amount: {transaction.amount}
            </p>
        </div>
    )
  }
}
