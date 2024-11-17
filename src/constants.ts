export enum Color {
  Black = 'BLACK',
  White = 'WHITE',
}

export enum PieceType {
  King = 'KING',
  Queen = 'QUEEN',
  Knight = 'KNIGHT',
  Pawn = 'PAWN',
  Bishop = 'BISHOP',
  Rook = 'ROOK',
}

export const COL_LABELS = Array.from(Array(8).keys()).map((v) =>
  String.fromCharCode('a'.charCodeAt(0) + v)
);
export const ROW_LABELS = [8, 7, 6, 5, 4, 3, 2, 1];

export const BISHOP_DIRS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export const KING_DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const QUEEN_DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const KNIGHT_DIRS = [
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
];

export const ROOK_DIRS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
