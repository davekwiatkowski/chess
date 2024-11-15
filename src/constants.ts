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
  String.fromCharCode('A'.charCodeAt(0) + v)
);
export const ROW_LABELS = [8, 7, 6, 5, 4, 3, 2, 1];
