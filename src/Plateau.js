import React, { useEffect, useState } from 'react'
import Square from './Square'

const Plateau = ({ size, positionX, positionY, direction }) => {
  const [table, setTable] = useState(null)

  useEffect(() => {
    setTable(generateTable())
  }, [size, positionX, positionY])

  const renderRow = (y) => {
    let tiles = []
    for (let x = 0; x < size; x++) {
      let hasRover = x == positionX && y == positionY
      tiles.push(
        <Square key={[x, y]} direction={direction} hasRover={hasRover} />
      )
    }
    return <tr key={y}>{tiles}</tr>
  }

  const generateTable = () => {
    let rows = []
    for (let y = size - 1; y >= 0; y--) {
      rows.push(renderRow(y))
    }
    return rows
  }

  return (
    <div>
      <table>
        <tbody>{table}</tbody>
      </table>
    </div>
  )
}

export default Plateau
