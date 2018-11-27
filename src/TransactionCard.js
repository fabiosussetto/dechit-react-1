import React, { Component } from 'react';

// ho trasformato il "functional component" perchè ho bisogno di gestire lo stato dell'oggetto sigolo, indipendentemente dai dati transaction che gli arrivano

class TransactionCard extends Component {

  state = {
    visibility: false,
  }

  toggleCollapse = () => {
    const newVisibility = this.state.visibility ? false : true;
    this.setState({
      visibility: newVisibility
    })
  }

  // renderizzo il body della card del dettaglio solo se ho la condizione corretta
  detailsCard = (transaction,visibility) => {
    if( visibility ) {
      return (
        <div className="card-body">
          <p className="card-text">Descriptions: {transaction.descriptions}</p>
        </div>
      );
    }
  }

  render() {
    const { transaction, currency, onIncrementAmount } = this.props
    const { visibility } = this.state
    return (
      <div className="card p-2 mb-2">
        <div className="d-flex">
          <div>
              <h5 className="card-title">
                <span class="badge badge-pill badge-info mr-2">
                  {currency} {transaction.amount}
                </span>
                {transaction.title}
              </h5>
          </div>
          <div className="ml-auto">
            <button className="btn btn-success btn-sm" onClick={onIncrementAmount}>+ {currency} 10</button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-header c-pointer" onClick={this.toggleCollapse}> Details </div>
          {this.detailsCard(transaction,visibility)}
        </div>
      </div>
    )
  }

}

export default TransactionCard;
