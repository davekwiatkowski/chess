import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { SpriteImage } from './SpriteImage';
import { Color, PieceType } from '../constants';
import { AppContext } from '../context/AppContext';
import { IPiece } from '../types/IPiece';

export const Piece: FC<{ piece: IPiece }> = ({ piece }) => {
  const [isHovering, setIsHovering] = useState(false);

  const {
    setSelectedPiece,
    selectedPiece,
    movePiece,
    capturePiece,
    possibleMoves,
    turn,
  } = useContext(AppContext);

  const typeIndex = useMemo(() => {
    switch (piece.type) {
      case PieceType.Bishop:
        return 2;
      case PieceType.King:
        return 0;
      case PieceType.Knight:
        return 3;
      case PieceType.Pawn:
        return 5;
      case PieceType.Queen:
        return 1;
      case PieceType.Rook:
        return 4;
      default:
        throw new Error(
          `Invalid piece type for chess piece sprite: ${piece.type}`
        );
    }
  }, [piece.type]);

  const handleMouseEnter = useCallback(() => {
    if (
      piece.color !== turn &&
      !possibleMoves.some((v) => v.col === piece.col && v.row === piece.row)
    ) {
      return;
    }
    setIsHovering(true);
  }, [piece.col, piece.color, piece.row, possibleMoves, turn]);

  const handleMouseLeave = useCallback(() => {
    if (
      piece.color !== turn &&
      !possibleMoves.some((v) => v.col === piece.col && v.row === piece.row)
    ) {
      return;
    }
    setIsHovering(false);
  }, [piece.col, piece.color, piece.row, possibleMoves, turn]);

  const handleClick = useCallback(() => {
    if (piece.color !== turn) {
      if (
        possibleMoves.some((v) => v.col === piece.col && v.row === piece.row)
      ) {
        capturePiece(piece);
        movePiece(piece.row, piece.col, piece);
      }
      return;
    }
    if (selectedPiece === piece) {
      setSelectedPiece(null);
    } else {
      setSelectedPiece(piece);
    }
  }, [
    selectedPiece,
    piece,
    setSelectedPiece,
    capturePiece,
    movePiece,
    possibleMoves,
    turn,
  ]);

  const isSelectedPiece = useMemo(() => {
    return selectedPiece === piece;
  }, [piece, selectedPiece]);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-16 flex items-center justify-center h-16 
        ${isHovering ? 'border-4 border-sky-300' : ''} 
        ${isSelectedPiece ? 'bg-sky-300' : 'bg-none'} cursor-pointer`}
    >
      <SpriteImage
        spriteSheet="/chess-sprites.png"
        position={{ x: typeIndex, y: piece.color === Color.Black ? 1 : 0 }}
      />
    </div>
  );
};
