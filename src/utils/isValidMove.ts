import { IPiece } from '../types/IPiece';

export function isValidMove(
  pieces: IPiece[],
  selectedPiece: IPiece | null | undefined,
  row: number,
  col: number
) {
  if (!selectedPiece) {
    return false;
  }
  if (!(row >= 0 && row < 8 && col >= 0 && col < 8)) {
    return false;
  }
  if (selectedPiece?.row === row && selectedPiece.col === col) {
    return false;
  }
  if (
    pieces.some(
      (v) =>
        v.row === row &&
        v.col === col &&
        v.color === selectedPiece?.color &&
        !v.isCaptured
    )
  ) {
    return false;
  }
  return true;
}
