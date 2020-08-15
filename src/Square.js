import React from 'react'
import './Square.css'

const Square = ({ hasRover }) => {
  let className = 'square'
  if (hasRover) {
    className = 'square-rover'
  }
  return <td className={className}></td>
}

export default Square
