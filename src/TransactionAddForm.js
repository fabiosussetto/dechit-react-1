import React, { Component } from 'react'
import { connect } from "react-redux";
import { addNewTransaction } from './state/actions'

const CategoriesList = (props) => {
  const { elem } = props
  return (
    <option value={elem.value}>{elem.name}</option>
  )
}

//* ??? [Violation] Added non-passive event listener to a scroll-blocking <some>
// event. Consider marking event handler as 'passive' to make the page more responsive.
// See <URL>

class TransactionAddForm extends Component {

  state = {
    category: '',
    amount: '',
    description: '',
    validation: {
      msg: '',
      form: false,
      //* ??? è + corretto inizializzare ogni input o creare uno array vuoto
      // (es. inputs []) e inizializzare lì dentro i vari campi da validare?
      category: {
        status : false,
        error: false
      },
      amount: {
        status : false,
        error: false
      },
      description: {
        status : false,
        error: false
      }
    }
  }

  validateNewTransaction(fieldName, value){
    let status = false
    let error = false

    switch(fieldName) {
      case 'category':
        if( ! value || value === '' ) {
          error = 'is required'
        } else {
          status = true
        }
      break;
      case 'amount':
        if( value <= 0 ) {
          error = 'is required'
        } else if( value > 1000 ) {
          error = 'is too big (max 999)'
        } else {
          status = true
        }
      break;
      case 'description':
        if( value === '' ) {
          error = 'is empty'
        } else if( value.length < 3 ) {
          error = 'is too short (min 4 ch.)'
        } else if( value.length > 20 ) {
          error = 'is too big (max 20 ch.)'
        } else {
          status = true
        }
      break;
      default:
        error = false
        status = true
      break;
    }

    error = error ? [fieldName]+' '+error : false;
    return { error: error, status: status }
  }

  //* ??? c'è un punto migliore dove mettere le validazioni perchè siano riutilizzabili?
  validateField(name, value, result) {

    this.setState({ validation: {
                    ...this.state.validation,
                    [name]: { // name -> primo parametro funzione
                      ...[name],
                      status: result.status,
                      error: result.error,
                    }
                  }
                }, this.validateForm); // callback dopo setState
  }

  validateForm() {
    const v = this.state.validation;
    const formValidation = ( v.category.status && v.amount.status && v.description.status )
    this.setState({validation: { ...this.state.validation, form: formValidation } });
  }

  setValidationClass(name) {
    var result = name.error ? 'is-invalid' : ''
    return result
  }

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
    //* cambia stato globale aggiungendo una transazione
    this.props.dispatch(addNewTransaction(this.state));
    // resetta lo stato e cambia il messaggio
    this.setState({
          ...this.state,
            //* ??? devo resettare gli input uno ad uno o c'è unmodo migliore?
            category: '',
            amount: '',
            description: '',
            //* aggiungo messaggio di successo
            validation: {
              ...this.state.validation,
              msg: 'Done! Check the List :)'
        }
      });
  }

  render() {
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
