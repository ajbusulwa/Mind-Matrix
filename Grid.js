import React, { useState, useEffect } from 'react';
import './Grid.css';

const Grid = () => {
  const numRows = 9;
  const numCols = 9;
  const initialDifficulty = 0.5;

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    generateRandomPattern(initialDifficulty);
  }, []);

  const generateRandomPattern = (difficulty) => {
    const newGrid = [];

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push('');
      }
      newGrid.push(row);
    }

    const numCellsToFill = Math.floor((numRows * numCols) * difficulty);
    let cellsFilled = 0;

    while (cellsFilled < numCellsToFill) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numCols);

      if (newGrid[randomRow][randomCol] === '') {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        newGrid[randomRow][randomCol] = randomNum.toString();
        cellsFilled++;
      }
    }

    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid([]);
    generateRandomPattern(initialDifficulty);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell">
              {cell}
            </div>
          ))}
        </div>
      ))}
      <button className="clear-button" onClick={clearGrid}>
        Clear Grid
      </button>
    </div>
  );
  
};

export default Grid;
