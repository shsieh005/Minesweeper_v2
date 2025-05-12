import { MouseEvent, useCallback, useEffect, useState } from "react";
import { initGame, revealEmptyCells, revealAllMines, checkGameWin, initBoard } from "../utils/index"
import type { TBoard } from "../types/index"
import { DEFAULT_GRID, GRIDS } from "../constants"
import {useTimer}  from "../hooks/useTimer"

const useMinesweeperGame = () => {
  const [firstClick, setFirstClick] = useState(true);

  const [gameBoard, setGameBoard] = useState(
    initBoard(
      GRIDS[DEFAULT_GRID].rows, 
      GRIDS[DEFAULT_GRID].cols, 
    )
  );

  const [isGameOver, setGameOver] = useState(false);
  const [isGameWin, setGameWin] = useState(false);
  const isGameEnded = isGameOver || isGameWin;

  const {
    timeDiff,
    isTimerRunning,
    startTimer, 
    stopTimer, 
    resetTimer,
  } = useTimer();

  useEffect(() => {
    if (isGameEnded) {
      stopTimer();
    }
  }, [isGameEnded, stopTimer]);



  const openCell = (board: TBoard, row: number, col: number) => {
    if (!isTimerRunning) startTimer();

    const newGameBoard: TBoard = JSON.parse(JSON.stringify(board));
    const cell = newGameBoard[row][col];
    const isMineCell = cell.value === 'mine';
    const isNumberCell = typeof cell.value === "number" && cell.value > 0;
    const isEmptyCell = typeof cell.value === "number" && cell.value === 0; 

    if (isMineCell) {
      setGameOver(true);
      cell.highlight = "red";
      revealAllMines(newGameBoard);
    }

    if (!isMineCell) {
      cell.isOpened = true;
      if (isNumberCell) {
        console.log('number cell');
      }
      if (isEmptyCell) {
        revealEmptyCells(newGameBoard, GRIDS[DEFAULT_GRID].rows, GRIDS[DEFAULT_GRID].cols, row, col);
        console.log('empty cell');
      }

      if (checkGameWin(newGameBoard,  GRIDS[DEFAULT_GRID].totalMines)) {
        setGameWin(true);
        revealAllMines(newGameBoard, true);
      }
    }
    return newGameBoard;
  }

  const handleCellLeftClick = (row: number, col:number) => {
    if (isGameEnded || gameBoard[row][col].isOpened || gameBoard[row][col].isFlagged) {
      return null;
    }

    if (firstClick) {
      const setBoard = initGame(gameBoard, GRIDS[DEFAULT_GRID].rows, GRIDS[DEFAULT_GRID].cols, GRIDS[DEFAULT_GRID].totalMines, row, col);
      setGameBoard(setBoard);
      setFirstClick(false);

      const boardAfterOpeningCell = openCell(setBoard, row, col);
      setGameBoard(boardAfterOpeningCell);
    }

    const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));

    const boardAfterOpeningCell = openCell(newGameBoard, row, col);

    if(boardAfterOpeningCell) {
      setGameBoard(boardAfterOpeningCell);
    }
  };

  const handleCellRightClick = (e: MouseEvent<HTMLDivElement>, row: number, col: number) => {
    e.preventDefault();

    if (isGameEnded || gameBoard[row][col].isOpened) return;

    if (!isTimerRunning) startTimer();

    let flagsDiff = 0;

    setGameBoard((prevGameBoard) => {
      const newGameBoard:TBoard = JSON.parse(JSON.stringify(gameBoard));
      const cell = prevGameBoard[row][col];

      if (cell.isFlagged) {
        newGameBoard[row][col].isFlagged = false;
      }

      if (!cell.isFlagged) {
        newGameBoard[row][col].isFlagged = true;
      }

      if (checkGameWin(newGameBoard, GRIDS[DEFAULT_GRID].totalMines)) {
        setGameWin(true);
        revealAllMines(newGameBoard, true);
      }

      return newGameBoard;

    });
  }



  return { gameBoard, handleCellLeftClick, handleCellRightClick, isGameWin, isGameOver, isGameEnded, timeDiff,};
}

export default useMinesweeperGame;