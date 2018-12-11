import React, { Component } from 'react'
import { connect } from "react-redux";
import { addNewTransaction } from './state/actions'

const CategoriesList = (props) => {
  const { elem } = props
  return (
    <option value={elem.value}>{elem.name}</option>
  )
}

const initialState = {
  category: '',
  amount: '',
  description: '',
  validation: {
    msg: '',
    form: false,
    //* ??? è + corretto inizializzare ogni input o creare uno array vuoto
    // (es. inputs []) e inizializzare lì dentro i vari campi da validare?
    category: {
      changed : false,
      error: false
    },
    amount: {
      changed : false,
      error: false
    },
    description: {
      changed : false,
      error: false
    }
  }
};

class TransactionAddForm extends Component {

  state = initialState

  validateNewTransaction(fieldName, value){
    let error = false

    switch(fieldName) {
      case 'category':
        if( ! value || value === '' ) {
          error = 'is required'
        }
      break;
      case 'amount':
        if( value < 1 ) {
          error = 'is too small'
        } else if( value > 1000 ) {
          error = 'is too big (max 999)'
        }
      break;
      case 'description':
        if( value === '' ) {
          error = 'is empty'
        } else if( value.length < 3 ) {
          error = 'is too short (min 4 ch.)'
        } else if( value.length > 20 ) {
          error = 'is too big (max 20 ch.)'
        }
      break;
      default:
        error = false
      break;
    }

    return error ? [fieldName]+' '+error : false
  }

  //* ??? c'è un punto migliore dove mettere le validazioni perchè siano riutilizzabili?
  validateField(name, value, error) {

    this.setState({ validation: {
                    ...this.state.validation,
                    [name]: { // name -> primo parametro funzione
                      error: error,
                    }
                  }
                }, this.validateForm); // callback dopo setState
  }

  validateForm() {
    const valid = this.state.validation;
    const formValidation = ! valid.amount.error && ! valid.description.error
    this.setState({validation: { ...this.state.validation, form: formValidation } });
  }

  setValidationClass(name) {
    var result = name.error ? 'is-invalid' : ''
    return result
  }

  //* TODO fare componente???
  setValindationFeedback(name) {
    return(
      <div className="invalid-feedback">{name.error}</div>
    )
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value ? target.value : ''

    if( target.value && target.type === 'number' ) {
      value = parseFloat(target.value);
    }

    const result = this.validateNewTransaction(name, value);

    this.setState({
      [name]: value
    }, () => { this.validateField(name, value, result) }) // callback x validazione
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(addNewTransaction(this.state));
    console.log('this.state',this.state);
    const finalState = initialState
    finalState.validation.msg = 'Done! Check the List :)'
    console.log(finalState);
    this.setState(finalState)
  }

  render() {
    //const initialState = this.state;

    const { currency, categories } = this.props
    const { validation } = this.state;
    return (
      <div>
      {validation.msg && <div className="alert alert-success" role="alert">{validation.msg}</div>}
        <div className="row">
          <div className="col-md-12">
              <form onSubmit={this.onSubmit} className="needs-validation">
                <div className="form-row">
                  <div className="col-6 col-sm-3 col-md pr-sm-0 mb-2">
                    <select name="category"
                      value={this.state.category}
                      onChange={this.handleInputChange}
                      className={`form-control ${this.setValidationClass(validation.category)}`}
                    >
                      <option value='' defaultValue>Choose cat.</option>
                      {categories.list.map((cat) => (
                          <CategoriesList
                            elem={cat}
                            key={cat.value}
                          />
                        ))}
                    </select>
                  {this.setValindationFeedback(validation.category)}
                  </div>
                  <div className="col-6 col-sm-3 col-md pr-sm-0 mb-2">
                    <div className="input-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            {currency}
                          </div>
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
                      name="description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      className={`form-control ${this.setValidationClass(validation.description)}`}
                    />
                    {this.setValindationFeedback(validation.description)}
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
    currency: state.currency,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(TransactionAddForm);
