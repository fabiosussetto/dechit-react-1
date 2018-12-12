import React from 'react'

// Es. di "functional component"


//* ??? qual è il modo migliore di gestire queste situazioni?
// va bene usare una funzione in un componente funzionale?
function descriptionButton(transaction, expanded, onToggleExpand) {
  if(transaction.description) {
    return (
      <button className="btn btn-sm btn-link pl-0 mr-2"
              onClick={onToggleExpand}>
        {expanded ? 'Hide' : 'Show'} description
      </button>
    )
  } else {
    return (
      <small>(Nothing to show here)</small>
    )
  }
}

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
              {descriptionButton(transaction, expanded, onToggleExpand)}
              {expanded && (
                <p>
                  <small>
                   {transaction.description}
                  </small>
                </p>
              )}
            </div>
        </div>
    )
}

export default TransactionCard
