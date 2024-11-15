import { FC } from 'react';
import { COL_LABELS } from '../constants';

export const ColIndicators: FC = () => {
  return (
    <div className="grid grid-cols-8 grid-rows-1">
      {COL_LABELS.map((label) => {
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
