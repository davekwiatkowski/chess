import {
  Color,
  PieceType,
  BISHOP_DIRS,
  KING_DIRS,
  KNIGHT_DIRS,
  QUEEN_DIRS,
  ROOK_DIRS,
} from '../constants';
import { IPiece } from '../types/IPiece';
import { checkAttack } from './checkAttack';
import { isPieceAtTile } from './isPieceAtTile';
import { isValidMove } from './isValidMove';

export function getPossibleMoves(
  pieces: IPiece[],
  selectedPiece: IPiece | null | undefined
): { row: number; col: number }[] {
  for (const p of pieces) {
    p.isUnderAttack = false; // reset attacks
  }

  const result: { row: number; col: number }[] = [];
  if (!selectedPiece) {
    return result;
  }
  if (selectedPiece.isCaptured) {
    return result;
  }

  const sign = selectedPiece.color === Color.Black ? 1 : -1;
  switch (selectedPiece.type) {
    case PieceType.Pawn:
      for (let r = 1; r <= 2; ++r) {
        if (selectedPiece.isMoved && r === 2) break;
        const row = selectedPiece.row + sign * r;
        const col = selectedPiece.col;
        if (
          isValidMove(pieces, selectedPiece, row, col) &&
          !isPieceAtTile(pieces, row, col) // cannot attack head on
        ) {
          result.push({
            row,
            col,
          });
        }
        // TODO: Add pawn en-passant
        if (r === 1) {
          if (checkAttack(pieces, selectedPiece, row, col - 1)) {
            result.push({
              row,
              col: col - 1,
            });
          }
          if (checkAttack(pieces, selectedPiece, row, col + 1)) {
            result.push({
              row,
              col: col + 1,
            });
          }
          // TODO: Add pawn gets to end of board
        }
      }
      break;
    case PieceType.Rook:
      for (const dir of ROOK_DIRS) {
        for (let i = 1; i < 8; ++i) {
          const row = selectedPiece.row + dir[0] * i;
          const col = selectedPiece.col + dir[1] * i;
          if (!isValidMove(pieces, selectedPiece, row, col)) break;
          result.push({
            row,
            col,
          });
          if (checkAttack(pieces, selectedPiece, row, col)) break;
        }
      }
      break;
    case PieceType.Bishop:
      for (const dir of BISHOP_DIRS) {
        for (let i = 1; i < 8; ++i) {
          const row = selectedPiece.row + dir[0] * i;
          const col = selectedPiece.col + dir[1] * i;
          if (!isValidMove(pieces, selectedPiece, row, col)) break;
          result.push({
            row,
            col,
          });
          if (checkAttack(pieces, selectedPiece, row, col)) break;
        }
      }
      break;
    case PieceType.King:
      for (const dir of KING_DIRS) {
        const row = selectedPiece.row + dir[0];
        const col = selectedPiece.col + dir[1];
        if (!isValidMove(pieces, selectedPiece, row, col)) continue;
        result.push({
          row,
          col,
        });
        checkAttack(pieces, selectedPiece, row, col);
        // TODO: Add castling
      }
      break;
    case PieceType.Queen:
      for (const dir of QUEEN_DIRS) {
        for (let i = 1; i < 8; ++i) {
          const row = selectedPiece.row + dir[0] * i;
          const col = selectedPiece.col + dir[1] * i;
          if (!isValidMove(pieces, selectedPiece, row, col)) break;
          result.push({
            row,
            col,
          });
          if (checkAttack(pieces, selectedPiece, row, col)) break;
        }
      }
      break;
    case PieceType.Knight:
      for (const dir of KNIGHT_DIRS) {
        const row = selectedPiece.row + dir[0];
        const col = selectedPiece.col + dir[1];
        if (!isValidMove(pieces, selectedPiece, row, col)) continue;
        result.push({
          row,
          col,
        });
        checkAttack(pieces, selectedPiece, row, col);
      }
      break;
    default:
      throw new Error(`Invalid piece type: ${selectedPiece.type}`);
  }
  return result;
}
