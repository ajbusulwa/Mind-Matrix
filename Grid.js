import React, { useState, useEffect } from 'react';
import './Grid.css';

const Grid = () => {
  const numRows = 9;
  const numCols = 9;
  const initialDifficulty = 0.5;

  const [grid, setGrid] = useState([]);
  const [memory, setMemory] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    generateRandomPattern(initialDifficulty);
  }, []);

  const generateRandomPattern = (difficulty) => {
    const newGrid = [];

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push({ value: '', editable: true });
      }
      newGrid.push(row);
    }

    const numCellsToFill = Math.floor((numRows * numCols) * difficulty);
    let cellsFilled = 0;

    while (cellsFilled < numCellsToFill) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numCols);

      if (newGrid[randomRow][randomCol].value === '') {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        if (isValidPlacement(newGrid, randomRow, randomCol, randomNum.toString())) {
          newGrid[randomRow][randomCol].value = randomNum.toString();
          newGrid[randomRow][randomCol].editable = false;
          cellsFilled++;
        }
      }
    }

    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid([]);
    generateRandomPattern(initialDifficulty);
  };

  const saveMemory = () => {
    setMemory(grid);
  };

  const loadMemory = () => {
    if (memory.length === numRows && memory[0].length === numCols) {
      const newGrid = memory.map((row) => row.map((cell) => ({ ...cell })));
      setGrid(newGrid);
    }
  };

  const handleNumberPlacement = (rowIndex, colIndex, number) => {
    if (grid[rowIndex][colIndex].editable && isValidPlacement(grid, rowIndex, colIndex, number)) {
      const newGrid = grid.map((row) => [...row]);
      newGrid[rowIndex][colIndex].value = number;
      setGrid(newGrid);
    } else {
      setSelectedNumber(number);
      setSelectedCell({ rowIndex, colIndex });
    }
  };

  const isValidPlacement = (grid, rowIndex, colIndex, number) => {
    // Check row constraint
    for (let col = 0; col < numCols; col++) {
      if (grid[rowIndex][col].value === number) {
        return false;
      }
    }

    // Check column constraint
    for (let row = 0; row < numRows; row++) {
      if (grid[row][colIndex].value === number) {
        return false;
      }
    }

    // Check subgrid constraint
    const subgridStartRow = Math.floor(rowIndex / 3) * 3;
    const subgridStartCol = Math.floor(colIndex / 3) * 3;
    for (let row = subgridStartRow; row < subgridStartRow + 3; row++) {
      for (let col = subgridStartCol; col < subgridStartCol + 3; col++) {
        if (grid[row][col].value === number) {
          return false;
        }
      }
    }

    return true;
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${!cell.editable ? 'number-placed' : ''} ${
                selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? 'highlight' : ''
              }`}
              onClick={() => handleNumberPlacement(rowIndex, colIndex, selectedNumber)}
            >
              {cell.value}
            </div>
          ))}
        </div>
      ))}
      <div className="button-container">
        <button className="clear-button" onClick={clearGrid}>
          Clear Grid
        </button>
        <button className="save-button" onClick={saveMemory}>
          Save Memory
        </button>
        <button className="load-button" onClick={loadMemory}>
          Load Memory
        </button>
      </div>
    </div>
  );
};

export default Grid;
