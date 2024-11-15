import { Color, PieceType } from '../constants';

export interface IPiece {
  color: Color;
  type: PieceType;
  position: {
    row: number;
    col: number;
  };
}
