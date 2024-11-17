import { createContext } from 'react';
import { IPiece } from '../types/IPiece';
import { Color } from '../constants';
import { ILogEntry } from '../types/ILogEntry';

export interface IAppContext {
  possibleMoves: { row: number; col: number }[];
  pieces: IPiece[];
  selectedPiece?: IPiece | null;
  turn: Color;
  logs: ILogEntry[];
  setSelectedPiece: (piece: IPiece | null) => void;
  movePiece: (row: number, col: number, capturePiece?: IPiece) => void;
  setPieces: (pieces: IPiece[]) => void;
  capturePiece: (piece: IPiece) => void;
  setTurn: (player: Color) => void;
  setLogs: (logs: ILogEntry[]) => void;
}

export const defaultAppContext = {
  possibleMoves: [],
  pieces: [],
  turn: Color.White,
  logs: [],
  setSelectedPiece: () => {},
  movePiece: () => {},
  setPieces: () => {},
  capturePiece: () => {},
  setTurn: () => {},
  setLogs: () => {},
};

export const AppContext = createContext<IAppContext>(defaultAppContext);
