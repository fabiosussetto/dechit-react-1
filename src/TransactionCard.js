import React from 'react'
import ExpandCollapse from './ExpandCollapse';

const TransactionCard = (props) => {
    const { transaction, onRemoveTransaction, onIncrementAmount, expanded, onToggleExpand } = props

    return (
        <div className="card p-2 mb-2">
            <div className="d-flex">
                <div>
                    
                    <p className="card-text">
                        Amount: {transaction.amount}
                    </p>
                </div>
                <div className="ml-auto">
                    <button className="btn btn-success" onClick={onIncrementAmount}>Add 10</button>
                    <button className="btn btn-secondary" onClick={onToggleExpand}>
                      {expanded ? 'Collapse' : 'Expand'}
                    </button>
                    <button className="btn btn-danger" onClick={onRemoveTransaction}>Remove</button>
                </div>
            </div>
            {expanded && <ExpandCollapse transaction={transaction} />}
        </div>
    )
}

export default TransactionCard