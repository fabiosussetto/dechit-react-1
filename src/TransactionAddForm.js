import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchTitlesList, addNewTransaction } from './state/actions'

const TransactionTitleList = (props) => {
  const { elem } = props
  return (
    <option value={elem.value}>{elem.title}</option>
  )
}

class TransactionAddForm extends Component {

  state = {
    title: 'coco',
    amount: '',
    descriptions: '',
    validation: {
      form: false,
      amount: {
        status: false,
        changed : false,
        error: false
      },
      descriptions: {
        status: false,
        changed : false,
        error: false
      }
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchTitlesList())
  }

  validateField(fieldName, value) {
    let validation = this.state.validation;
    let inputStatus = validation.amount.status;
    let inputError = validation.amount.error;

    switch(fieldName) {
      case 'amount':
        inputStatus = value > 0;
        inputError = inputStatus ? '' : [fieldName]+' is required';
      break;
      case 'descriptions':
        inputStatus = value !== '';
        inputError = inputStatus ? '' : [fieldName]+' is required';
      break;
      default:
        break;
    }

    this.setState({ validation: {
                      ...this.state.validation,
                      [fieldName]: { // fieldName -> primo parametro funzione
                        status: inputStatus,
                        error: inputError,
                      }
                    }
                  }, this.validateForm); // callback  dopo srtStatus
  }

  validateForm() {
    const valid = this.state.validation;
    const formValidation = valid.amount.status && valid.descriptions.status
    this.setState({validation: { ...this.state.validation, form: formValidation } });
  }

  setValidationClass(fieldName) {
    var result = fieldName.error ? 'is-invalid' : ''
    console.log(result);
    return result
  }


  //* TODO fare componente???
  setValindationFeedback(fieldName) {
    return(
      <div className="invalid-feedback">{fieldName.error}</div>
    )
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value ? target.value : ''

    if( target.value && target.type === 'number' ) {
      value = parseFloat(target.value);
    }

    this.setState({
      [name]: value
    }, () => { this.validateField(name, value) }) // callback x validazione
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(addNewTransaction(this.state));
  }

  render() {
    const elems = this.props.transaction_titles.list
    const validation = this.state.validation;

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
              <form onSubmit={this.onSubmit} className="needs-validation">
                <div className="form-row">
                  <div className="col-6 col-sm-3 col-md pr-sm-0 mb-2">
                    <select name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      className="form-control">
                      {elems.map((elem) => (
                          <TransactionTitleList
                            elem={elem}
                            key={elem.value}
                          />
                        ))}
                    </select>
                  </div>
                  <div className="col-6 col-sm-3 col-md pr-sm-0 mb-2">
                    <div className="input-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">€</div>
                        </div>
                        <input
                          placeholder="0"
                          name="amount"
                          type="number"
                          value={this.state.amount}
                          onChange={this.handleInputChange}
                          className={`form-control ${this.setValidationClass(validation.amount)}`}
                        />
                        {this.setValindationFeedback(validation.amount)}
                      </div>
                    </div>
                  </div>
                  <div className="col-9 col-sm col-md-6 pr-sm-0 mb-2">
                    <input
                      placeholder="Description"
                      name="descriptions"
                      type="text"
                      value={this.state.descriptions}
                      onChange={this.handleInputChange}
                      className={`form-control ${this.setValidationClass(validation.descriptions)}`}
                    />
                    {this.setValindationFeedback(validation.descriptions)}
                </div>
                  <div className="col-3 col-sm-auto pr-sm-0 mb-2">
                      <button type="submit"
                              className={`btn btn-block btn-${validation.form ? 'success': 'secondary' }`}
                              disabled={!validation.form && 'disabled'}>
                        Add
                      </button>
                  </div>
                </div>
              </form>
          </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction_titles: state.transaction_titles
  }
}

export default connect(mapStateToProps)(TransactionAddForm);
