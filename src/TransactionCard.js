import React, { Component } from 'react'

export default class TransactionCard extends Component {

  render() {
    const { transaction, onIncrementAmount } = this.props

    return (
        <div className="card p-2 mb-2">
            <div className="d-flex">
                <div>
                    <h5 className="card-title">{transaction.title}</h5>
                    <p className="card-text">
                        Amount: {transaction.amount}
                    </p>
                </div>
                <div className="ml-auto">
                    <button className="btn btn-success" onClick={onIncrementAmount}>Add 10</button>
                </div>
            </div>
        </div>
    )
  }
}
