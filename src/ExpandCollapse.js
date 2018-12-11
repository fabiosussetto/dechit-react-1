import React from 'react'

const ExpandCollapse = (props) => {
    const { transaction } = props
    return(
        <div className="row mt-3">
            <div className="col-12">
                <p className="card-text">
                    {transaction.description}
                </p>
            </div>
        </div>
    )
}

export default ExpandCollapse