import clsx from "clsx";
import mineIcon from "/icons/bomb.svg";
import flagIcon from "/icons/red-flag.png";
import type { GameCell } from "../types";
import type  { MouseEvent } from "react";

type CellProps = {
  cell: GameCell;
  rowIndex: number;
  colIndex: number;
  handleCellLeftClick: (row: number, col: number) => void;
  handleCellRightClick: (e: MouseEvent<HTMLDivElement>, row: number, col: number) => void;
};

const Cell = ({ cell, rowIndex, colIndex, handleCellLeftClick, handleCellRightClick } : CellProps) => {
  return (
    <div className={clsx("cell", cell.value === 'mine' && cell.highlight )} 
    onClick={() => handleCellLeftClick(rowIndex, colIndex)}
    onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
    >
      {typeof cell.value === "number" && <>{cell.value || ""}</>}
      {cell.value === "mine" && <img src={mineIcon}></img>}
      {!cell.isOpened && (
        <div className="overlay">
          <img
            src={flagIcon}
            className={clsx("flag", cell.isFlagged && "visible")}
          />
        </div>
      )}
    </div>
  );
};

export default Cell;
