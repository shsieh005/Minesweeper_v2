import type { TGrid } from "../types";

// assuming current grid is at position (1, 1)
export const DIRECTIONS = [
  [-1, -1], 
  [-1, 0],
  [-1, 1],
  [0, -1], 
  [0, 1], 
  [1, -1],
  [1, 0],
  [1, 1],
];

export const GRIDS = {
  size: {
    rows: 9,
    cols: 9,
    totalMines: 10,
  },
};

export const DEFAULT_GRID: TGrid = 'size';
