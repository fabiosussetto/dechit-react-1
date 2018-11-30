import React, { Component } from 'react'
import ExpandCollapse from './ExpandCollapse';

class TransactionCard extends Component {

    state = {
        isHidden: true
    }
    
    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    displayLabel () {
        return this.state.isHidden ? 'Expand' : 'Collapse'
    }

    render() {
        const { transaction, onIncrementAmount } = this.props
        return (
            <div className="card mt-3">
                <div className="row">
                    <div className="col-10">
                        <h5 className="card-title">{transaction.title}</h5>
                    </div>
                    <div className="col-2 text-right">
                        <button className="btn btn-info" onClick={this.toggleHidden.bind(this)}>
                            {this.displayLabel()}
                        </button>
                    </div>
                </div>
                {!this.state.isHidden && <ExpandCollapse transaction={transaction} onIncrementAmount={onIncrementAmount} />}
            </div>
        )
    }
}

export default TransactionCard