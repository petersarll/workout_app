import React, { Component } from 'react'
import './statisticsforcharts.css'
import { MousePointer } from 'react-feather'

class StatisticsForCharts extends Component {
  constructor() {
    super()
    this.state = {
      todaysExercise: [
        {
          exerciseName: 'cable judo flip, abdominals',
          workoutType: 'abs',
          sets: 5,
          reps: 7
        },
        {
          exerciseName: 'kettlebell pirate ships, shoulders',
          workoutType: 'shoulders',
          sets: 6,
          reps: 6
        },
        {
          exerciseName: 'band assisted pull-up, lats',
          workoutType: 'lats',
          sets: 5,
          reps: 9
        },
        {
          exerciseName: 'bear crawl sled drags, quadriceps',
          workoutType: 'quads',
          sets: 4,
          reps: 14
        },
        {
          exerciseName: 'incline push-up medium, chest',
          workoutType: 'chest',
          sets: 5,
          reps: 12
        },
        {
          exerciseName: 'cable shoulder press, shoulders',
          workoutType: 'shoulders',
          sets: 4,
          reps: 7
        }
      ]
    }
  }

  showResults = () => {
    const { todaysExercise } = this.state
    const totalNumber = 260
    const newData = Object.keys(todaysExercise).map(item => (
      <div className="individual__results__div">
        {todaysExercise[item].workoutType} -
        {Math.round(
          ((todaysExercise[item].reps * todaysExercise[item].sets) /
            totalNumber) *
            100
        )}
      </div>
    ))
    return newData
  }
  render() {
    return (
      <div className="todays__exercise__container">
        These are the parts of your body <br />
        that you'll be hitting today
        <div className="results__div">{this.showResults()}</div>
        <div className="footer__of__stats">
          <MousePointer />
          click on the chart to change charts!
        </div>
      </div>
    )
  }
}

export default StatisticsForCharts
