import { Color, PieceType } from '../constants';

export interface IPiece {
  color: Color;
  type: PieceType;
  row: number;
  col: number;
  isMoved?: boolean;
  isCaptured?: boolean;
}
