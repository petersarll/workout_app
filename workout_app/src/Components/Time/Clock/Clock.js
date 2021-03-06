import React, { Component } from 'react'
import './clock.css'

export default class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hours: new Date().toLocaleString(),
      minutes: new Date().toLocaleString()
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  tick() {
    this.setState({
      hours: new Date().getHours().toLocaleString(),
      minutes: new Date().getMinutes().toLocaleString()
    })
  }
  clock() {
    const { hours, minutes } = this.state
    if (minutes < 10) {
      return (
        <div className="app__clock">
          {hours}:0{minutes}
        </div>
      )
    }
    return (
      <div className="app__clock">
        {hours}:{minutes}
      </div>
    )
  }

  render() {
    return <div>{this.clock()}</div>
  }
}
