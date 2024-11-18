import { IPiece } from '../types/IPiece';

export function checkAttack(
  pieces: IPiece[],
  selectedPiece: IPiece,
  row: number,
  col: number
): boolean {
  const result = pieces.find(
    (v) =>
      v.row === row &&
      v.col === col &&
      v.color !== selectedPiece?.color &&
      !v.isCaptured
  );

  if (result) {
    result.isUnderAttack = true;
  }

  return !!result;
}
