import React, { Component } from 'react'
import { Progress, FormGroup, Input } from 'reactstrap'
import './SignUp.css'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      loggedInUser: {},
      message: null,
      errors: [],
      part1: true,
      part2: false,
      part3: false,
      loggedIn: true
    }
    this.setPart2ToTrue = this.setPart2ToTrue.bind(this)
    this.setPart3ToTrue = this.setPart3ToTrue.bind(this)
  }
  //changes states from first part of sign up to 2nd
  setPart2ToTrue() {
    this.setState({ part2: true })
  }
  //changes states from 2nd part of sign up to 3rd
  setPart3ToTrue() {
    this.setState({ part3: true })
  }

  handleSignUp = () => {
    const { email, password, confirmPassword } = this.state
    const validationErrors = []

    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasChars = /\W/.test(password)

    if (
      password.length < 8 ||
      hasUpper + hasLower + hasNumbers + hasChars < 3
    ) {
      validationErrors.Errors.push('password')
      this.setState({
        passwordError:
          'Password must be at least 8 characters and use at least one of the following characters: Upper case, lower case, number and special character'
      })
    } else {
      this.setState({ passwordError: null })
    }

    if (password !== confirmPassword) {
      validationErrors.Errors.push('confirmPassword')
      this.setState({ confirmPasswordError: 'Password must match' })
    } else {
      this.setState({ confirmPasswordError: null })
    }
    if (!validationErrors.length) {
      return true
    } else {
      return false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { part1, part2, part3 } = this.state
    if (part1 && !part2 && !part3) {
      return (
        <div className="App">
          <div className="box">
            <div id="disappearing__act">
              <div className="sign__in" id="sign__in">
                <br />
                Welcome to Retrain
                <br />
                <br />
                <p> create your profile </p>
                <br />
              </div>
              <Progress animated value="33">
                Part 1 of 3
              </Progress>
              <br />
              <br />
              <br />
              <form>
                <label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
              </form>
              <hr className="sign__in__hr" />
              <form>
                <label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </label>
              </form>
              <hr className="sign__in__hr" />
              <form>
                <label>
                  <input
                    type="password"
                    name="password"
                    placeholder="retype password"
                    className="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </label>
              </form>
              <hr className="sign__in__hr" />
              <br />
              <br />
              <input
                type="Submit"
                className="button"
                onClick={this.setPart2ToTrue}
              />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      )
    } else if (part1 && part2 && !part3) {
      return (
        <div className="App">
          <div className="box">
            <div id="disappearing__act">
              <div className="sign__in" id="sign__in">
                <br />
                Welcome to Retrain
                <br />
                <br />
                <p> create your profile </p>
                <br />
              </div>
              <Progress animated value="66">
                Part 2 of 3
              </Progress>
              <br />
              <br />
              <br />
              <form>
                <label>
                  <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    className="email"
                  />
                </label>
              </form>
              <hr className="sign__in__hr" />
              <form>
                <label>
                  <input
                    type="number"
                    name="password"
                    placeholder="Age"
                    className="password"
                  />
                </label>
              </form>
              <hr className="sign__in__hr" />
              <form>
                <label>
                  <input
                    type="number"
                    name="password"
                    placeholder="Weight"
                    className="password"
                  />
                </label>
              </form>
              <hr className="sign__in__hr" />
              <br />
              <br />
              <input
                type="Submit"
                className="button"
                onClick={this.setPart3ToTrue}
              />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      )
    } else if (part1 && part2 && part3) {
      return (
        <div className="App">
          <div className="box">
            <div id="disappearing__act">
              <div className="sign__in" id="sign__in">
                <br />
                Welcome to Retrain
                <br />
                <br />
                <p> create your profile </p>
                <br />
              </div>
              <Progress animated value="99">
                Almost Done!
              </Progress>
              <br />
              <br />
              <br />
              <form>
                <label>
                  <input
                    type="number"
                    name="Name"
                    placeholder="Height in Inches"
                    className="email"
                  />
                </label>
                <hr className="sign__in__hr" />
              </form>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Female</option>
                  <option>Male</option>
                </Input>
              </FormGroup>
              <hr className="sign__in__hr" />
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  placeholder="Goal?"
                >
                  <option disabled selected>
                    Select your Goal
                  </option>
                  <option>Lose Fat</option>
                  <option>Gain Muscle</option>
                  <option>Maintain</option>
                </Input>
              </FormGroup>
              <hr className="sign__in__hr" />
              <input
                type="Submit"
                className="button"
                onClick={this.props.byPassLogin}
              />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SignUp
