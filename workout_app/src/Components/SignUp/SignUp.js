import React, { Component } from 'react'
import { Element } from 'react-scroll'
import { Input } from 'reactstrap'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../../constants.js'
import './SignUp.css'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $age: String!
    $weight: String!
    $height: String!
    $sex: String!
    $goal: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      age: $age
      weight: $weight
      height: $height
      sex: $sex
      goal: $goal
    ) {
      token
    }
  }
`

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      age: '',
      weight: '',
      height: '',
      sex: '',
      goal: '',
      loggedInUser: {},
      message: null,
      errors: [],
      loggedIn: true
    }
    this.setPart3ToTrue = this.setPart3ToTrue.bind(this)
    //handle changes for sign up inputs
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    )
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleHeightChange = this.handleHeightChange.bind(this)
    this.handleSexChange = this.handleSexChange.bind(this)
    this.handleGoalChange = this.handleGoalChange.bind(this)
  }

  //changes states from 2nd part of sign up to 3rd
  setPart3ToTrue() {
    this.setState({ part3: true })
  }

  //password/email verification function
  handleSignUp = async data => {
    const { email, password, confirmPassword } = this.state
    const validationErrors = []

    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasChars = /\W/.test(password)

    //checks for valid email format
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      validationErrors.push('email')
      this.setState({ emailError: 'Email Address is Invalid or Missing. ' })
    } else {
      this.setState({ emailError: null })
    }
    //checks for safe password
    if (
      password.length < 8 ||
      hasUpper + hasLower + hasNumbers + hasChars < 3
    ) {
      validationErrors.push('password')
      this.setState({
        passwordError:
          'Password must be at least 8 characters and use at least 3 of the following character types: (a) uppercase letters, (b) lowercase letters, (c) numbers, and/or (d) special characters. '
      })
    } else {
      this.setState({ passwordError: null })
    }
    // checks that password and confirm password are the same
    if (password !== confirmPassword) {
      validationErrors.push('confirmPassword')
      this.setState({ confirmPasswordError: 'Password must match' })
    } else {
      this.setState({ confirmPasswordError: null })
    }
    if (!validationErrors.length) {
      const { token } = data.signup
      this._saveUserData(token)
      this.props.byPassLogin({ isLoggedIn: true })
    } else {
      return false
    }
  }

  //token for GraphQL mutation
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  //handleChanges for all events
  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value })
  }

  handleNameChange(event) {
    this.setState({ firstName: event.target.value })
  }

  handleAgeChange(event) {
    this.setState({ age: event.target.value })
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value })
  }
  handleHeightChange(event) {
    this.setState({ height: event.target.value })
  }

  handleSexChange(event) {
    this.setState({ sex: event.target.value })
  }

  handleGoalChange(event) {
    this.setState({ goal: event.target.value })
  }

  render() {
    const {
      email,
      password,
      firstName,
      age,
      weight,
      height,
      sex,
      goal
    } = this.state
    return (
      <div className="App">
        <div className="box">
          <div id="disappearing__act">
            <div className="sign__in" id="sign__in">
              <Element
                name="test7"
                className="element"
                id="containerElement"
                style={{
                  position: 'relative',
                  height: '590px',
                  overflow: 'scroll',
                  marginTop: '17px',
                  marginBottom: '17px'
                }}
              >
                <Element
                  name="firstInsideContainer"
                  style={{
                    marginBottom: '17px'
                  }}
                >
                  <br />
                  <br />
                  <span className="retrain__logo">Retrain</span>
                  <br />
                  <br />
                  <br />
                  <p className="create_profile"> Create your profile </p>
                  <p2 className="comment">
                    (scroll down and answer all questions!)
                  </p2>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    autoComplete="off"
                  />
                  <span className="error__span">{this.state.emailError}</span>
                  <hr className="sign__in__hr" />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    autoComplete="new-password"
                  />
                  <hr className="sign__in__hr" />
                  <input
                    type="password"
                    name="confirm password"
                    placeholder="retype password"
                    className="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                  />
                  <span className="error__span">
                    {this.state.passwordError}
                  </span>
                  <hr className="sign__in__hr" />

                  <input
                    type="text"
                    name="First Name"
                    placeholder="Name"
                    className="password"
                    value={firstName}
                    onChange={this.handleNameChange}
                  />
                  <hr className="sign__in__hr" />
                  <input
                    type="number"
                    name="Age"
                    placeholder="Age"
                    className="password"
                    value={age}
                    onChange={this.handleAgeChange}
                  />
                  <hr className="sign__in__hr" />
                  <input
                    type="number"
                    name="Weight"
                    placeholder="Weight"
                    className="password"
                    value={weight}
                    onChange={this.handleWeightChange}
                  />
                  <input
                    type="number"
                    name="Height"
                    placeholder="Height in Inches"
                    className="email"
                    onChange={this.handleHeightChange}
                  />
                  <hr className="sign__in__hr" />
                  <Input
                    type="select"
                    name="select"
                    id="selector"
                    onChange={this.handleSexChange}
                  >
                    <option disabled selected>
                      Sex
                    </option>
                    <option>Female</option>
                    <option>Male</option>
                  </Input>
                  <hr className="sign__in__hr" />
                  <Input
                    type="select"
                    name="select"
                    id="selector"
                    placeholder="Goal?"
                    onChange={this.handleGoalChange}
                  >
                    <option disabled selected>
                      Select your Goal
                    </option>
                    <option>Lose Fat</option>
                    <option>Gain Muscle</option>
                    <option>Maintain</option>
                  </Input>
                  <hr className="sign__in__hr" />

                  <Mutation
                    mutation={SIGNUP_MUTATION}
                    variables={{
                      email,
                      password,
                      firstName,
                      age,
                      weight,
                      height,
                      sex,
                      goal
                    }}
                    onCompleted={data => this.handleSignUp(data)}
                  >
                    {mutation => (
                      <input
                        type="Submit"
                        className="button"
                        onClick={mutation}
                      ></input>
                    )}
                  </Mutation>
                </Element>
              </Element>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
