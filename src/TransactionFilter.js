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
    sortBy: 'id',
    sortDir: 'ASC'
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

  applySort = (sortBy,sortDir) => {
    this.setState({
        ...this.state,
        sortBy: sortBy,
        sortDir: sortDir
    }, () => {
      this.props.dispatch(setSortOrder(sortBy,sortDir))
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
    const { filters} = this.props
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
                    className="badge badge-primary mr-2"
                    onClick={() => this.applyShortcut(shortcut)}>
                    {shortcut.label}
                </span>
            ))}
              <span
                className={`mr-2 badge badge-${filters.sortBy==='id' ? 'success' : 'secondary'}`}
                onClick={()=>this.applySort('id',filters.sortDir)}>
                SortBy ID
              </span>
              <span
                className={`mr-2 badge badge-${filters.sortBy==='amount' ? 'success' : 'secondary'}`}
                onClick={()=>this.applySort('amount',filters.sortDir)}>
                SortBy Amount
              </span>
              <span
                className={`mr-2 badge badge-${filters.sortDir==='ASC' ? 'success' : 'secondary'}`}
                onClick={()=>this.applySort(filters.sortBy,'ASC')}>
                ASC
              </span>
              <span
                className={`mr-2 badge badge-${filters.sortDir==='DESC' ? 'success' : 'secondary'}`}
                onClick={()=>this.applySort(filters.sortBy,'DESC')}>
                DESC
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
