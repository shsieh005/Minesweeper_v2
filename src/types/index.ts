type OpenedCell = {
  isOpened: true;
  isFlagged: false;
};
type ClosedCell = {
  isOpened: false;
  isFlagged: boolean;
};
type MineCell = {
  value: 'mine';
};
type NumberCell = {
  value: number;
};
type EmptyCell = {
  value: null;
  isOpened:false;
  isFlagged: false;
};

export type OpenedMineCell = OpenedCell & MineCell;
type ClosedMineCell = ClosedCell & MineCell;
export type OpenedNumberCell = OpenedCell & NumberCell;
type ClosedNumberCell = ClosedCell & NumberCell;

export type GameCell = 
  | OpenedMineCell 
  | ClosedMineCell
  | OpenedNumberCell 
  | ClosedNumberCell
  | EmptyCell;

export type TBoard = GameCell[][];
export type TGrid = keyof typeof GRIDS;