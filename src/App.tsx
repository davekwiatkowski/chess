import { useCallback, useMemo, useState } from 'react';
import { ChessBoard } from './components/ChessBoard';
import { AppContext } from './context/AppContext';
import { IPiece } from './types/IPiece';
import { getPossibleMoves } from './utils/getPossibleMoves';
import { setupPieces } from './utils/setupPIeces';
import { Color } from './constants';
import { ILogEntry } from './types/ILogEntry';
import { getNotation } from './utils/notation';

function App() {
  const [selectedPiece, setSelectedPiece] = useState<IPiece | null>(null);
  const [pieces, setPieces] = useState<IPiece[]>(setupPieces());
  const [turn, setTurn] = useState<Color>(Color.White);
  const [logs, setLogs] = useState<ILogEntry[]>([]);

  const possibleMoves = useMemo(
    () => getPossibleMoves(pieces, selectedPiece),
    [selectedPiece, pieces]
  );

  const movePiece = useCallback(
    (row: number, col: number, capturedPiece?: IPiece) => {
      if (!selectedPiece) {
        return;
      }
      setLogs([
        ...logs,
        { piece: selectedPiece, row, col, captured: capturedPiece },
      ]);
      selectedPiece.row = row;
      selectedPiece.col = col;
      selectedPiece.isMoved = true;
      setSelectedPiece(null);
      setTurn(turn === Color.White ? Color.Black : Color.White);
    },
    [selectedPiece, turn, logs]
  );

  const capturePiece = useCallback((piece: IPiece) => {
    piece.isCaptured = true;
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedPiece,
        setSelectedPiece,
        possibleMoves,
        movePiece,
        setPieces,
        pieces,
        capturePiece,
        turn,
        setTurn,
        logs,
        setLogs,
      }}
    >
      <div className="flex justify-center items-center text-yellow-100 bg-green-950 border-yellow-100">
        <h1 className="text-right py-8 px-4">{turn}&apos;s turn to play</h1>
        <div className="h-screen flex justify-center items-center flex-col flex-auto">
          <ChessBoard></ChessBoard>
        </div>
        <div className="h-screen overflow-y-scroll py-8 px-4 border flex gap-8">
          <div>
            <h1>Game log:</h1>
            <hr></hr>
            <ol className="list-decimal list-inside">
              {logs.map((logEntry, index) => (
                <li key={index}>{getNotation(logEntry)}</li>
              ))}
            </ol>
          </div>
          {[Color.Black, Color.White].map((color, index) => {
            return (
              <div key={index}>
                <h1>Captured pieces ({color}):</h1>
                <hr></hr>
                <ul className="list-disc list-inside">
                  {Array.from(
                    pieces
                      .filter((v) => v.color === color && v.isCaptured)
                      .reduce((map, element) => {
                        map.set(element.type, (map.get(element.type) || 0) + 1);
                        return map;
                      }, new Map())
                      .entries()
                  )
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((v, index) => {
                      return (
                        <li key={index}>
                          {v[0]} {v[1] > 1 && <span>{'(' + v[1] + ')'}</span>}
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
