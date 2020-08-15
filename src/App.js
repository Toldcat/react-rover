import React, { useState } from 'react'
import Plateau from './Plateau'
import './App.css'

const App = () => {
  const [size, setSize] = useState(null)
  const [positionX, setPositionX] = useState(null)
  const [positionY, setPositionY] = useState(null)
  const [direction, setDirection] = useState(null)
  const [instructions, setInstructions] = useState([])

  //define compass so we can change a direction letter to a number
  //N - 0, E - 1, S - 2, W - 3
  const compass = 'NESW'

  const moveRover = () => {
    //setting the limits of the plateau
    const upperLimit = size - 1
    const lowerLimit = 0

    //if no instructions are provided - send an alert
    if (instructions.length === 0) {
      alert('No more moves left')
      return
    }

    //what to do if M instruction is passed
    if (instructions[0] === 'M') {
      //if facing north, move up
      if (direction === 0 && positionY !== upperLimit) {
        setPositionY(positionY + 1)
        setInstructions(instructions.slice(1))
        //if facing east, move to the right
      } else if (direction === 1 && positionX !== upperLimit) {
        setPositionX(positionX + 1)
        setInstructions(instructions.slice(1))
        //if facing south, move down
      } else if (direction === 2 && positionY !== lowerLimit) {
        setPositionY(positionY - 1)
        setInstructions(instructions.slice(1))
        //if facing west, move left
      } else if (direction === 3 && positionX !== lowerLimit) {
        setPositionX(positionX - 1)
        setInstructions(instructions.slice(1))
        //if the rover is at the boundary, ignore movement
      } else {
        setInstructions(instructions.slice(1))
      }

      //rotate left
    } else if (instructions[0] === 'L') {
      let newDirection = direction + 4 - 1
      setDirection(newDirection % 4)
      setInstructions(instructions.slice(1))

      //rotate right
    } else {
      let newDirection = direction + 1
      setDirection(newDirection % 4)
      setInstructions(instructions.slice(1))
    }
  }

  return (
    <div className='app'>
      <h1 className='heading'>Mars Rover Challenge</h1>
      <div className='inputs'>
        <label htmlFor='grid'>Grid Size</label>
        <input
          name='grid'
          type='number'
          max='9'
          placeholder='Provide a number (maximum of 9)'
          required
          onChange={(e) => {
            if (e.target.value <= 9) {
              setSize(Number(e.target.value))
            } else {
              setSize('9')
              e.target.value = Number(9)
            }
          }}
        />

        <label htmlFor='position'>Starting Position</label>
        <input
          name='position'
          type='text'
          maxLength='3'
          placeholder='Starting position and heading (e.g. 22N)'
          required
          onChange={(e) => {
            setPositionX(Number(e.target.value.split('')[0]))
            setPositionY(Number(e.target.value.split('')[1]))
            setDirection(compass.indexOf(e.target.value.split('')[2]))
          }}
        />
        <label htmlFor='instructions'>Instructions</label>
        <input
          name='instructions'
          placeholder='Instructions - a combination of L - left, R - right and M - move'
          type='text'
          required
          onChange={(e) => setInstructions(e.target.value.split(''))}
        />

        <button onClick={moveRover}>GO!</button>
      </div>

      <Plateau
        size={size}
        positionX={positionX}
        positionY={positionY}
        direction={direction}
        instructions={instructions}
      />
    </div>
  )
}

export default App
