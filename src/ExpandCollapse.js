import React from 'react'

const ExpandCollapse = (props) => {
    const { transaction, onIncrementAmount } = props
    return(
        <div className="row mt-3">
            <div className="col-10">
                <p className="card-text">
                    Amount: {transaction.amount}
                </p>
            </div>
            <div className="col-2 text-right">
                <button className="btn btn-success" onClick={onIncrementAmount}>
                    Add 10
                </button>
            </div>
        </div>
    )
}

export default ExpandCollapse