import React, { Component } from 'react';
import { connect } from "react-redux";
import {addTransactionFromForm} from './state/actions';
import { getFilteredTransactions } from './state/selectors';
import Modal from './Modal'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'

class AddTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            category: '',
            amount: 0,
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        $('#myModal').modal('show');
        this.resetForm();
        event.preventDefault();
        const newTransaction = this.state;
        const {transactions} = this.props;
        newTransaction.id = transactions.length+1;
        this.props.dispatch(addTransactionFromForm(newTransaction));
    }

    resetForm = () => {
        this.setState({
            id: 0,
            category: '',
            amount: 0,
            description: ''
        })
    }

    render() {
        return(
            <div className="container">
                <h2>Add new transaction</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input type="text" className="form-control" id="category" placeholder="Enter category" name="category" value={this.state.category} onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input type="number" className="form-control" id="amount" placeholder="Enter amount" name="amount" value={this.state.amount} onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea rows="5" className="form-control" id="description" placeholder="Enter description" name="description" value={this.state.description} onChange={this.handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" data-target="#myModal">Send</button>
                </form>
                <Modal />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      transactions: getFilteredTransactions(state)
    }
}

export default connect(mapStateToProps)(AddTransaction);