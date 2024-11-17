import { FC, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

export const Tile: FC<{
  index: number;
  isPossibleMove: boolean;
}> = ({ index, isPossibleMove }) => {
  const { movePiece } = useContext(AppContext);

  const row = useMemo(() => Math.floor(index / 8), [index]);
  const col = useMemo(() => index % 8, [index]);

  const isBlack = useMemo(
    () => (row % 2 === 1 ? index % 2 === 0 : index % 2 === 1),
    [index, row]
  );

  return (
    <div
      className="flex justify-center items-center relative"
      onClick={() => {
        if (isPossibleMove) {
          movePiece(row, col);
        }
      }}
    >
      <div
        className={`${isBlack ? 'bg-green-800' : 'bg-yellow-100'} h-16 w-16 flex items-center justify-center`}
      ></div>
      {isPossibleMove && <div className="absolute bg-pink-400 h-8 w-8"></div>}
    </div>
  );
};
