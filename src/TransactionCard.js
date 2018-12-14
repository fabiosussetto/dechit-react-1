import React from 'react'
import TransactionAddForm from './TransactionAddForm'

// Es. di "functional component"

const TransactionCard = (props) => {
    const { transaction, onIncrementAmount, onDecrementAmount, expanded, onToggleExpand, onRemoveTransacion, currency } = props
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
                  <button className="btn btn-sm btn-info mr-2" onClick={onDecrementAmount}> - </button>
                  {currency+' '+transaction.amount}
                  <button className="btn btn-sm btn-info ml-2" onClick={onIncrementAmount}> + </button>
                  <button className="btn btn-sm btn-danger ml-2"
                          onClick={onRemoveTransacion}>
                    Delete
                  </button>
                </div>
            </div>

            <div className="card-text">

              <p><small> {transaction.description} </small></p>

            {/* //* ??? QUESTION: se volessi sovrascrivere/usare/modificare qualcosa che mi viene passato
                dai vendro (es: scss boostrap), qual è l'approcio migliore? */}
              <button className="btn btn-primary btn-sm mb-2"
                      onClick={onToggleExpand}>
                {expanded ? 'Hide' : 'Show'} edit form
              </button>
              {expanded && (
                <div>
                  {/* //* ??? QUESTION: "transaction" nella form non viene settato correttamente:
                    cliccando su incrementAmount non viene agigornato lo stato nella form. */}
                  <TransactionAddForm
                    elemToEdit={transaction}
                  />
                </div>
              )}


            </div>
        </div>
    )
}

export default TransactionCard
