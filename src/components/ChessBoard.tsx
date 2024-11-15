import { FC, useContext, useMemo } from 'react';
import { Tile } from './Tile';
import { ColIndicators } from './ColIndicators';
import { RowIndicators } from './RowIndicators';
import { Piece } from './Piece';
import { AppContext } from '../context/AppContext';

export const ChessBoard: FC = () => {
  const tiles = useMemo(() => Array.from(Array(64).keys()), []);
  const { pieces, possibleMoves } = useContext(AppContext);

  return (
    <>
      <ColIndicators />
      <div className="flex">
        <RowIndicators />
        <div className="relative">
          <div className="grid grid-cols-8 grid-rows-8 border border-yellow-100">
            {tiles.map((index) => (
              <Tile
                key={index}
                index={index}
                isPossibleMove={possibleMoves.some(({ row, col }) => {
                  return Math.floor(index / 8) === row && index % 8 === col;
                })}
              ></Tile>
            ))}
          </div>
          <div className="grid grid-cols-8 m-[1px] grid-rows-8 absolute top-0 left-0">
            {pieces.map((piece, index) => {
              return (
                <div
                  key={index}
                  style={{
                    top: piece.position.row * 64 + 'px',
                    left: piece.position.col * 64 + 'px',
                  }}
                  className={`absolute w-16 h-16 flex justify-center items-center`}
                >
                  <Piece piece={piece} />
                </div>
              );
            })}
          </div>
        </div>
        <RowIndicators />
      </div>
      <ColIndicators />
    </>
  );
};
