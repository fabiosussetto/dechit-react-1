import React, { Component } from 'react'
import { connect } from "react-redux";
import { addNewTransaction, editTransaction } from './state/actions'

const CategoriesList = (props) => {
  const { elem } = props
  return (
    <option value={elem.value}>{elem.name}</option>
  )
}

class TransactionAddForm extends Component {

  state = {
    category: '',
    amount: '',
    description: '',
    validation: {
      msg: '',
      category: {
        status : false,
        error: false
      },
      amount: {
        status : false,
        error: false
      },
      description: {
        status : true,
        error: false
      }
    }
  }

  //* ??? TODO: se i dati che scendono da API non sono valide, andrebbe mostrato

  // !!! NOTE: vedere optimisticUpdate

  componentWillReceiveProps (props) {
    this.setInitialState(props);
  }
  //* TODO: se si vuole, provare a fare un if prendere valore nuovo e se è
  // diverso da quello dello stato mando un "alert"

  componentDidMount () {
    this.setInitialState(this.props);
  }

  setInitialState = (props) => {
    const { elemToEdit } = props
    if( elemToEdit !== undefined ) {
      this.setState({
        category: elemToEdit.category,
        amount: elemToEdit.amount,
        description: elemToEdit.description
      })
    }
    // NOTE: far partire anche la validazione qui!!!
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
        } else if( value > 500 ) {
          error = 'is too big (max 999)'
        } else {
          status = true
        }
      break;
      case 'description':
        if( value.length > 150 ) {
          error = 'is too big (max 150 ch.)'
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

  //* ??? QUESTION: c'è un punto migliore dove mettere le validazioni perchè siano riutilizzabili?
  // ANSWER : si, creare una cartellina (es chiamata helper) ed importare all'occorrenza le funzioni che mi servono
  validateField(name, value) {
    const result = this.validateNewTransaction(name, value);
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

  validateForm = ()=> {
    const { validation } = this.state;
    return ( validation.category.status && validation.amount.status && validation.description.status )
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let type = target.type
    //* registro il valore in una variabile e la trasformo in numerico se necessario
    let value = target.value ? ( type === 'number' ? parseFloat(target.value) : target.value ) : ''
    this.setState({
      [name]: value
    }, () => {
      // callback x validazione
      this.validateField(name, value)
    })
  }

  onSubmit = (event) => {
    const { elemToEdit } = this.props
    let msg
    let category = ''
    let amount = ''
    let description = ''

    event.preventDefault();
    //* in base alla presenza o no della prop "elemToEdit",
    // decide se editare quella esistente oppure
    // cambiare stato globale aggiungendo una transazione
    if( elemToEdit !== undefined ) {
      category = this.state.category
      amount = this.state.amount
      description = this.state.description
      this.props.dispatch(editTransaction(elemToEdit.id,this.state))
    } else {
      this.props.dispatch(addNewTransaction(this.state));
      msg = 'Transaction added! Check the List :)'
    }
    // resetta lo stato e cambia il messaggio
    this.setState({
          ...this.state,
            //* ??? QUESTION: devo resettare gli input uno ad uno o c'è un modo migliore?
            category: category,
            amount: amount,
            description: description,
            //* aggiungo messaggio di successo
            validation: {
              ...this.state.validation,
              msg: msg
        }
      });
  }

  render() {
    const { currency, categories } = this.props
    const { validation } = this.state;
    return (
      <React.Fragment>
      {validation.msg && <div className="alert alert-success" role="alert">{validation.msg}</div>}
        <div className="row">
          <div className="col-md-12">
              <form onSubmit={this.onSubmit} className="needs-validation">
                <div className="form-row">
                  <div className="col-6 col-sm-3 col-md pr-sm-0 mb-2">
                    <select name="category"
                      value={this.state.category}
                      onChange={this.handleInputChange}
                      className={`form-control ${validation.category.error ? 'is-invalid' : ''}`}
                    >
                      <option value='' defaultValue>Choose cat.</option>
                      {categories.list.map((cat) => (
                          <CategoriesList
                            elem={cat}
                            key={cat.value}
                          />
                        ))}
                    </select>
                  <div className="invalid-feedback">{validation.category.error}</div>
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
                          className={`form-control ${validation.amount.error ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{validation.amount.error}</div>
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
                      className={`form-control ${validation.description.error ? 'is-invalid' : ''}`}
                    />
                  <div className="invalid-feedback">{validation.description.error}</div>
                </div>
                  <div className="col-3 col-sm-auto pr-sm-0 mb-2">
                      <button type="submit"
                              className={`btn btn-block btn-${this.validateForm() ? 'success': 'secondary' }`}
                              disabled={!this.validateForm() && 'disabled'}>
                        Submit
                      </button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </React.Fragment>
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
