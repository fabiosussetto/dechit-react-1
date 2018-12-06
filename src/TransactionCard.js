import React from 'react'

// Es. di "functional component"

const TransactionCard = (props) => {
    const { transaction, onIncrementAmount, expanded, onToggleExpand, currency } = props
    return (
        <div className="card p-2 mb-2">
            <div className="d-flex">
                <div>
                    <h5 className="card-title">{transaction.title}</h5>
                    <div className="card-text">
                        {currency+' '+transaction.amount}
                        <button className="btn btn-sm btn-success ml-2" onClick={onIncrementAmount}>
                          + {currency} 10
                        </button>
                    </div>
                </div>

                <div className="ml-auto">

                    <button className="btn btn-sm btn-secondary" onClick={onToggleExpand}>
                      {expanded ? '-' : '+'}
                    </button>
                </div>
            </div>

            {expanded && (
              <p>
                <small>
                 {transaction.descriptions}
                </small>
              </p>
            )}

        </div>
    )
}

export default TransactionCard
