import { IPiece } from '../types/IPiece';

export function isAttack(
  pieces: IPiece[],
  selectedPiece: IPiece,
  row: number,
  col: number
) {
  return pieces.find(
    (v) =>
      v.row === row &&
      v.col === col &&
      v.color !== selectedPiece?.color &&
      !v.isCaptured
  );
}
