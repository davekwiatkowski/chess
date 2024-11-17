import { Color, PieceType } from '../constants';
import { IPiece } from '../types/IPiece';

export function setupPieces(): IPiece[] {
  const pieces: IPiece[] = [];
  for (let j = 0; j < 2; ++j) {
    const color = j % 2 === 0 ? Color.Black : Color.White;
    for (let i = 0; i < 2; ++i) {
      pieces.push({
        color,
        type: PieceType.Rook,
        row: j % 2 === 1 ? 7 : 0,
        col: i * 7 + getSign(i) * 0,
      });
    }
    for (let i = 0; i < 2; ++i) {
      pieces.push({
        color,
        type: PieceType.Knight,
        row: j % 2 === 1 ? 7 : 0,
        col: i * 7 + getSign(i) * 1,
      });
    }
    for (let i = 0; i < 2; ++i) {
      pieces.push({
        color,
        type: PieceType.Bishop,
        row: j % 2 === 1 ? 7 : 0,
        col: i * 7 + getSign(i) * 2,
      });
    }
    for (let i = 0; i < 8; ++i) {
      pieces.push({
        color,
        type: PieceType.Pawn,
        row: j % 2 === 1 ? 6 : 1,
        col: i,
      });
    }
    pieces.push({
      color,
      type: PieceType.Queen,
      row: j % 2 === 1 ? 7 : 0,
      col: 3,
    });
    pieces.push({
      color,
      type: PieceType.King,
      row: j % 2 === 1 ? 7 : 0,
      col: 4,
    });
  }
  return pieces;
}

function getSign(i: number) {
  return i % 2 === 0 ? 1 : -1;
}
