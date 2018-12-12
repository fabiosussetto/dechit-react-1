import React from 'react'
import TransactionAddForm from './TransactionAddForm'

// Es. di "functional component"

const TransactionCard = (props) => {
    const { transaction, onIncrementAmount, expanded, onToggleExpand, onRemoveTransacion, currency } = props
    return (
        <div className="card p-2 mb-2">
            <div className="row">
                <div className="col">
                    <h5 className="card-title">
                      {transaction.label}
                      <small className="ml-2">
                        [{transaction.category}]
                      </small>
                    </h5>
                </div>

                <div className="col text-right">
                  {currency+' '+transaction.amount}
                  <button className="btn btn-sm btn-success ml-2"
                          onClick={onIncrementAmount}>
                    + {currency} 10
                  </button>
                  <button className="btn btn-sm btn-danger ml-2"
                          onClick={onRemoveTransacion}>
                    Delete
                  </button>
                </div>
            </div>

            <div className="card-text">
              <TransactionAddForm
                elemToEdit={transaction}
              />
              {transaction.description &&
                <button className="btn btn-sm btn-link pl-0 mr-2"
                        onClick={onToggleExpand}>
                  {expanded ? 'Hide' : 'Show'} details
                </button>
              }
              {expanded && (
                <div>
                  <p>
                    <small>
                     {transaction.description}
                    </small>
                  </p>
                </div>
              )}


            </div>
        </div>
    )
}

export default TransactionCard
