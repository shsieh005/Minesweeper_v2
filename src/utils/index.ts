import type { GameCell, TBoard } from '../types/index';

import { DIRECTIONS } from '../constants/index';

const createBoard = (rows: number, cols: number) => {
  const board: TBoard = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    board[rowIndex] = [];

    for (let colIndex = 0; colIndex < cols; colIndex++) {
      board[rowIndex][colIndex] = {
        value: null,
        isOpened: false,
        isFlagged: false,
      }
    }
  }
  return board;
}

const fillBoardWithMines = (emptyBoard: TBoard, rows: number, cols: number, totalMines: number, setRow: number, setCol: number) => {
  let mines = 0;

  while (mines < totalMines) {
    const row = Math.floor((Math.random() * rows));
    const col = Math.floor((Math.floor(Math.random() * cols)));

    // conditional checks between number | 'mine' | null 
    if (emptyBoard[row][col].value != 'mine' || (setRow == row && setCol == col)) {
      (emptyBoard[row][col] as GameCell).value = 'mine';
      mines++;
    }
  }
  return emptyBoard;
}

const fillBoardWithNumbers = (board: TBoard) => {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.value != 'mine') {
        let minesCount = 0;

        DIRECTIONS.forEach(([dRow, dCol]) => {
          const newRow = rowIndex + dRow;
          const newCol = colIndex + dCol;

          if (newRow in board && newCol in board) {
            if (board[newRow][newCol].value == "mine") {
              minesCount++;
            }
          }
        });
        cell.value = minesCount;
      }
    });
  });
  return board;
};

export const initBoard = (rows: number, cols: number) => {
  const emptyBoard = createBoard(rows, cols);
  return emptyBoard;
}
  
export const initGame = (emptyBoard: TBoard, rows: number, cols: number, totalMines: number, setRow: number, setCol: number) => {
  const boardWithMines = fillBoardWithMines(emptyBoard, rows, cols, totalMines, setRow, setCol);
  const gameBoard = fillBoardWithNumbers(boardWithMines);
  return gameBoard;
}

export const revealEmptyCells = (board: TBoard, rows: number, cols: number, row: number, col: number) => {
  const queue: [number, number][] = [[row, col]]

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();

    const cell = board[currentRow][currentCol];
    cell.isOpened = true;

    if (cell.value === 0) {
      for (const [dRow, dCol] of DIRECTIONS) {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !board[newRow][newCol].isOpened && !board[newRow][newCol].isFlagged) {
          queue.push([newRow, newCol]);
        }
        
      }
      
    }
  }
  return board;
}

export const revealAllMines = (board: TBoard, highlightWin?:boolean) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value === 'mine') {
        cell.isOpened = true;

        if (highlightWin) {
          cell.highlight = "green";
        }
      }
    })
  })
}

export const checkGameWin = (board: TBoard, totalMines: number) => {
  let unopenedCells = 0;
  let correctlyFlaggedMines = 0;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.isOpened) {
        unopenedCells++;
      }

      if (cell.isFlagged && cell.value === 'mine') {
        correctlyFlaggedMines++;
      }
    })
  })

  return unopenedCells === totalMines || correctlyFlaggedMines === totalMines;
}


export const getTimeDiff = (timeNow: Date | null, timeStarted: Date | null) => {
  if (timeNow ===null || timeStarted === null) return "00:00";

  return new Intl.DateTimeFormat('en-US', {
    minute: '2-digit',
    second: '2-digit',
  }).format(timeNow.getTime() - timeStarted.getTime())
};