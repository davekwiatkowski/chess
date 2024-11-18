import { COL_LABELS, PieceType, ROW_LABELS } from '../constants';
import { ILogEntry } from '../types/ILogEntry';
import { IPiece } from '../types/IPiece';

export function getNotation(logEntry: ILogEntry): string {
  return `${getPieceName(logEntry.piece)}${logEntry.captured ? `x` : ''}${COL_LABELS[logEntry.col]}${ROW_LABELS[logEntry.row]}${logEntry.isCheck ? '+' : ''}`;
}

export function getPieceName(piece: IPiece) {
  switch (piece.type) {
    case PieceType.King:
      return 'K';
    case PieceType.Queen:
      return 'Q';
    case PieceType.Rook:
      return 'R';
    case PieceType.Knight:
      return 'N';
    case PieceType.Bishop:
      return 'B';
    case PieceType.Pawn:
      return '';
    default:
      throw Error('Invalid piece type: ' + piece.type);
  }
}
