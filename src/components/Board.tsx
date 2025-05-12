import type { MouseEvent } from "react";
import type { TBoard } from "../types/index";
import Cell from "./Cell";

type Props = {
  gameBoard: TBoard;
  handleCellLeftClick: (row: number, col: number) => void;
  handleCellRightClick: (e: MouseEvent<HTMLDivElement>, row: number, col: number) => void;
}


const Board = (props: Props) => {
  const {gameBoard, handleCellLeftClick, handleCellRightClick} = props;

  return (
    <div className="board">
      {gameBoard.map((row, rowIndex) => (
        <div className="row">
          {row.map((cell, colIndex) => (
            <Cell cell={cell} rowIndex={rowIndex} colIndex={colIndex} handleCellLeftClick={handleCellLeftClick} handleCellRightClick={handleCellRightClick}/>
          ))} </div>
      ))}
    </div>
  );
}

export default Board;