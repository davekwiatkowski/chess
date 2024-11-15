import { FC } from 'react';
import { ROW_LABELS } from '../constants';

export const RowIndicators: FC = () => {
  return (
    <div className="grid grid-rows-8 grid-cols-1">
      {ROW_LABELS.map((label) => {
        return (
          <div
            className="h-16 w-16 flex items-center justify-center text-xl"
            key={label}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
