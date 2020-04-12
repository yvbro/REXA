import React from 'react'
import PropTypes from 'prop-types'

import {bindActionCreators, compose} from 'redux'
import { connect } from 'react-redux'

import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { performLogin } from './authDuck';
import {withRouter} from "react-router-dom";

class FormLogin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = values => {
    const { performLogin} = this.props;
    values.preventDefault();
    const account = {
      email: this.state.email,
      password: this.state.password
    };
    performLogin(account)
           .then( () => 
            this.props.history.push('/dashboard'));
  };

  render(){
    return(
          <form onSubmit={this.handleSubmit} className="container">
              <div class="header">
                <div><span1>Welcome</span1> <span2>to</span2> <span> Rexa</span></div>
              </div>
              <FormGroup controlId="email" className="email">
                <FormLabel>Email</FormLabel>
                <FormControl className="emailZone"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChange}
                  required="required"
                />
              </FormGroup>
              <FormGroup controlId="password" className="password">
                <FormLabel>Password</FormLabel>
                <FormControl className="passwordZone"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  required="required"
                />
              </FormGroup>
              <Button className="submit"
                block
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
          </form>
    )
  }

}

FormLogin.propTypes = {
  performLogin: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      performLogin,
    },
    dispatch
  )
}


export default compose(
    connect(
      null,
      mapDispatchToProps),
    withRouter,
)(FormLogin)