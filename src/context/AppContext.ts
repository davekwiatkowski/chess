import { createContext } from 'react';
import { IPiece } from '../types/IPiece';
import { setupPieces } from '../utils/piecesUtil';

export interface IAppContext {
  possibleMoves: { row: number; col: number }[];
  pieces: IPiece[];
  selectedPiece?: IPiece | null;
  setSelectedPiece: (piece: IPiece | null) => void;
  movePiece: (row: number, col: number) => void;
}

export const defaultAppContext = {
  possibleMoves: [],
  pieces: setupPieces(),
  setSelectedPiece: () => {},
  movePiece: () => {},
};

export const AppContext = createContext<IAppContext>(defaultAppContext);
