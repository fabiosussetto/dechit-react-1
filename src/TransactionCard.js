import React from 'react'

// Es. di "functional component"

const TransactionCard = (props) => {
    const { transaction, onIncrementAmount, expanded, onToggleExpand } = props

    return (
        <div className="card p-2 mb-2">
            <div className="d-flex">
                <div>
                    <h5 className="card-title">{transaction.title}</h5>
                    <p className="card-text">
                        Amount: {transaction.amount}
                    </p>
                </div>
                {expanded && (
                  <p>
                    I'm expanded
                  </p>
                )}

                <div className="ml-auto">
                    <button className="btn btn-success" onClick={onIncrementAmount}>Add 10</button>
                    <button className="btn btn-secondary" onClick={onToggleExpand}>
                      {expanded ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard
