import { Color, PieceType } from '../constants';
import { IPiece } from '../types/IPiece';

export function getPossibleMoves(selectedPiece: IPiece | null | undefined) {
  const result: { row: number; col: number }[] = [];
  if (!selectedPiece) {
    return result;
  }

  const sign = selectedPiece.color === Color.Black ? 1 : -1;
  switch (selectedPiece.type) {
    case PieceType.Pawn:
      for (let r = 1; r <= 2; ++r) {
        const row = selectedPiece.position.row + sign * r;
        const col = selectedPiece.position.col;
        if (checkPosition(row, col))
          result.push({
            row,
            col,
          });
      }
      break;
    case PieceType.Rook:
      for (let row = 0; row < 8; ++row) {
        if (row !== selectedPiece.position.row) {
          result.push({
            row,
            col: selectedPiece.position.col,
          });
        }
      }
      for (let col = 0; col < 8; ++col) {
        if (col !== selectedPiece.position.col) {
          result.push({
            col,
            row: selectedPiece.position.row,
          });
        }
      }
      break;
    case PieceType.Bishop:
      const bishopDirs = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
      for (let dir of bishopDirs) {
        for (let i = 0; i < 8; ++i) {
          const row = selectedPiece.position.row + dir[0] * i;
          const col = selectedPiece.position.col + dir[1] * i;
          if (
            checkPosition(row, col) &&
            row !== selectedPiece.position.row &&
            col !== selectedPiece.position.col
          ) {
            result.push({
              row,
              col,
            });
          }
        }
      }
      break;
    case PieceType.King:
      const kingDirs = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      for (let dir of kingDirs) {
        const row = selectedPiece.position.row + dir[0];
        const col = selectedPiece.position.col + dir[1];
        if (checkPosition(row, col))
          result.push({
            row,
            col,
          });
      }
      break;
    case PieceType.Queen:
      const queenDirs = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      for (let dir of queenDirs) {
        for (let i = 1; i < 8; ++i) {
          const row = selectedPiece.position.row + dir[0] * i;
          const col = selectedPiece.position.col + dir[1] * i;
          if (checkPosition(row, col))
            result.push({
              row,
              col,
            });
        }
      }
      break;
    case PieceType.Knight:
      const knightDirs = [
        [-2, -1],
        [-2, 1],
        [2, -1],
        [2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
      ];
      for (let dir of knightDirs) {
        const row = selectedPiece.position.row + dir[0];
        const col = selectedPiece.position.col + dir[1];
        if (checkPosition(row, col))
          result.push({
            row,
            col,
          });
      }
      break;
    default:
      throw new Error(`Invalid piece type: ${selectedPiece.type}`);
  }
  return result;
}

function checkPosition(row: number, col: number) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}
