import React, { Component } from 'react'
import { connect } from "react-redux";
import { setFilterAmount, setSortOrder } from './state/actions'
import { getVisibleTransactions  } from './state/selectors'

const shortcuts = [
    { label: 'Cheap', maxAmount: 10 },
    { label: 'Average', maxAmount: 50 },
    { label: 'Expensive', maxAmount: 80 }
]

class TransactionFilter extends Component {

  state = {
    amount: 0,
    sortBy: 'ASC'
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(setFilterAmount(this.state.amount))
  }

  applyShortcut = (shortcut) => {
    this.setState({
        ...this.state,
        amount: shortcut.maxAmount
    }, () => {
      this.props.dispatch(setFilterAmount(this.state.amount))
     })
  }

  applySort = (sorter) => {

    this.setState({
        ...this.state,
        sortBy: sorter
    }, () => {
      this.props.dispatch(setSortOrder(this.state.sortBy))
     })
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
            {/* //* ??? QUESTION: se uso i filtri shortcut e gli ordinamenti
              in maniera combinata, non riesco a tornare più alla situazione iniziale.
              è possibiole che io cambi lo stato scorretto quando faccio il SORT? */}
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
    transactions: getVisibleTransactions(state),
    filters: state.filters,
  }
}

export default connect(mapStateToProps)(TransactionFilter);
