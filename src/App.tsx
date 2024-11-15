import { useCallback, useMemo, useState } from 'react';
import { ChessBoard } from './components/ChessBoard';
import { AppContext, defaultAppContext } from './context/AppContext';
import { IPiece } from './types/IPiece';
import { getPossibleMoves } from './utils/getPossibleMoves';

function App() {
  const [selectedPiece, setSelectedPiece] = useState<IPiece | null>();

  const possibleMoves = useMemo(
    () => getPossibleMoves(selectedPiece),
    [selectedPiece]
  );

  const handleSelectedPieceChange = useCallback((piece: IPiece | null) => {
    setSelectedPiece(piece);
    console.log(piece);
  }, []);

  const movePiece = useCallback(
    (row: number, col: number) => {
      if (!selectedPiece) {
        return;
      }
      selectedPiece.position.row = row;
      selectedPiece.position.col = col;
      setSelectedPiece(null);
    },
    [selectedPiece]
  );

  return (
    <AppContext.Provider
      value={{
        ...defaultAppContext,
        selectedPiece,
        setSelectedPiece: handleSelectedPieceChange,
        possibleMoves,
        movePiece,
      }}
    >
      <div className="h-screen flex justify-center items-center flex-col bg-green-950 text-yellow-100">
        <ChessBoard></ChessBoard>
      </div>
    </AppContext.Provider>
  );
}

export default App;
