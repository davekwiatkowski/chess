import { FC } from 'react';

export const SpriteImage: FC<{
  spriteSheet: string;
  position: { x: number; y: number };
  size?: number;
}> = ({ spriteSheet, position, size = 45 }) => {
  return (
    <div
      className="w-12 h-12 bg-no-repeat"
      style={{
        backgroundPosition: `${-position.x * size}px ${-position.y * size}px`,
        backgroundImage: `url(${spriteSheet})`,
      }}
    />
  );
};
