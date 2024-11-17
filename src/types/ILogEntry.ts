import { IPiece } from './IPiece';

export interface ILogEntry {
  piece: IPiece;
  row: number;
  col: number;
  captured?: IPiece;
}
