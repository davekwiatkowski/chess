import { IPiece } from '../types/IPiece';

export function isPieceAtTile(
  pieces: IPiece[],
  row: number,
  col: number
): boolean {
  return pieces.some((v) => v.row === row && v.col === col && !v.isCaptured);
}
