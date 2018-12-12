import React, { Component } from 'react'
import { connect } from "react-redux";
import { setFilterAmount, setTransactions } from './state/actions'
import { getFilteredTransactions  } from './state/selectors'

const shortcuts = [
    { label: 'Cheap', maxAmount: 10 },
    { label: 'Average', maxAmount: 30 },
    { label: 'Expensive', maxAmount: 70 }
]

class TransactionFilter extends Component {

  state = {
    amount: 0
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(setFilterAmount(this.state.amount))
  }

  applyShortcut = (shortcut) => {
    this.setState({
         amount: shortcut.maxAmount
    }, () => {
      this.props.dispatch(setFilterAmount(this.state.amount))
     })
  }

  applySort = (order) => {
    const { transactions } = this.props
    let compareFunction
    // l'array temporaneo contiene oggetti con posizione e valore di ordinamento
    var mapped = transactions.map(function(el) {
      return { index: el.amount, value: el };
    })
    // sorting tramite le compareFunctions
    switch(order) {
      case 'DESC':
        compareFunction = function(a,b) {
          if (a.index > b.index) return -1;
          if (a.index < b.index) return 1;
          return 0;
        }
      break;
      default:
        compareFunction = function(a,b) {
          if (a.index > b.index) return 1;
          if (a.index < b.index) return -1;
          return 0;
        }
      break
    }
    // ordinamento dell'array mappato contenente i valori ridotti
    mapped.sort(compareFunction);
    // rimappatura dell'array nell'ordine sortato
    var result = mapped.map((el)=>el.value);
    // dispatch delle transazioni verso lo state globale
    this.props.dispatch(setTransactions(result))
  }

  onAmountChange = (event) => {
    this.setState({
        amount: event.target.value ? parseFloat(event.target.value) : 0
    })
  }

  resetAmount = () => {
    this.setState({
        amount: 0
   }, () => {
     this.props.dispatch(setFilterAmount(this.state.amount))
    })
  }

  render() {
    return (
      <div className="d-flex flex-column mb-4">
        <form onSubmit={this.onSubmit} className="form-inline">
          <input
              type="number"
              value={this.state.amount}
              onChange={this.onAmountChange}
              className="form-control mr-2 mb-2"
          />
          <div className="mb-2">
            <button type="submit" className="btn btn-primary mr-2">Filter</button>
            <button type="button" className="btn btn-secondary mr-2" onClick={this.resetAmount}>Reset</button>
          </div>
        </form>
        <div>
            {shortcuts.map(shortcut => (
                <span
                    key={shortcut.label}
                    className="badge badge-secondary mr-2"
                    onClick={() => this.applyShortcut(shortcut)}>
                    {shortcut.label}
                </span>
            ))}
            <span
              className="badge badge-warning mr-2"
              onClick={()=>this.applySort('ASC')}>
              Sort ASC
            </span>
            <span
              className="badge badge-warning mr-2"
              onClick={()=>this.applySort('DESC')}>
              Sort DESC
            </span>
        </div>
      </div>
    )
  }
}

//export default connect()(TransactionFilter)

const mapStateToProps = (state) => {
  return {
    transactions: getFilteredTransactions(state),
  }
}

export default connect(mapStateToProps)(TransactionFilter);
