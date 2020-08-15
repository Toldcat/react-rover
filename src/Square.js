import React from 'react'
import './Square.css'

const Square = ({ hasRover, direction }) => {
  let className = 'square'
  let background
  if (hasRover) {
    className = 'square-rover'
    background = `center / contain url('${process.env.PUBLIC_URL}/img/${direction}.png')`
  }

  return <td className={className} style={{ background: background }}></td>
}

export default Square
