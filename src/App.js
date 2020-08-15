import React, { useState } from 'react'
import Plateau from './Plateau'

const App = () => {
  const [size, setSize] = useState(null)
  const [positionX, setPositionX] = useState(null)
  const [positionY, setPositionY] = useState(null)
  const [direction, setDirection] = useState(null)
  const [instructions, setInstructions] = useState([])

  const compass = 'NESW'
  const moveRover = () => {
    //setting the limits of the plateau
    const upperLimit = size - 1
    const lowerLimit = 0

    //define compass so we can change a direction letter to a number
    //N - 0, E - 1, S - 2, W - 3

    // const rover1 = {
    //   xPos: Number(position[0]),
    //   yPos: Number(position[1]),
    //   //convert direction into a number based on compass defined above
    //   direction: compass.indexOf(position[2]),
    // }

    const move = () => {
      if (instructions.length === 0) {
        alert('No more moves left')
        return
      }

      if (instructions[0] === 'M') {
        //if facing north, move up
        if (direction === 0 && positionY !== upperLimit) {
          setPositionY(positionY + 1)
          let newInstructions = instructions.slice(1)
          setInstructions(newInstructions)
          //if facing east, move to the right
        } else if (direction === 1 && positionX !== upperLimit) {
          setPositionX(positionX + 1)
          let newInstructions = instructions.slice(1)
          setInstructions(newInstructions)
          //if facing south, move down
        } else if (direction === 2 && positionY !== lowerLimit) {
          setPositionY(positionY - 1)
          let newInstructions = instructions.slice(1)
          setInstructions(newInstructions)
          //if facing west, move left
        } else if (direction === 3 && positionX !== lowerLimit) {
          setPositionX(positionX - 1)
          let newInstructions = instructions.slice(1)
          setInstructions(newInstructions)
          //if the rover is at the boundary, ignore movement
        } else {
          let newInstructions = instructions.slice(1)
          setInstructions(newInstructions)
        }

        //roate left
      } else if (instructions[0] === 'L') {
        let newDirection = direction + 4 - 1
        setDirection(newDirection % 4)
        let newInstructions = instructions.slice(1)
        setInstructions(newInstructions)

        //rotate right
      } else {
        let newDirection = direction + 1
        setDirection(newDirection % 4)
        let newInstructions = instructions.slice(1)
        setInstructions(newInstructions)
      }
    }

    move()
  }

  return (
    <div className='App'>
      <div>
        <label htmlFor='grid'>Grid Size</label>
        <input
          name='grid'
          type='number'
          max='9'
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
          required
          onChange={(e) => {
            setPositionX(Number(e.target.value.split('')[0]))
            setPositionY(Number(e.target.value.split('')[1]))
            setDirection(compass.indexOf(e.target.value.split('')[2]))
          }}
        />
      </div>
      <div>
        <label htmlFor='instructions'>Instructions</label>
        <input
          name='instructions'
          pattern='[LRM]'
          type='text'
          required
          onChange={(e) => setInstructions(e.target.value.split(''))}
        />
      </div>
      <button onClick={moveRover}>GO!</button>
      <Plateau
        size={size}
        positionX={positionX}
        positionY={positionY}
        direction={direction}
      />
    </div>
  )
}

export default App
