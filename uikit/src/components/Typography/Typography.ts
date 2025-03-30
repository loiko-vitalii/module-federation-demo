import { clsx } from 'clsx';
import { type PropsWithChildren, createElement } from 'react';

import { colorBlack, colorBlue, colorGrey, multilineTruncate, typography } from './styles.module.css';

type Color = 'black' | 'grey' | 'blue';

const COLOR_CLASS_MAP: Record<Color, string> = {
  black: colorBlack,
  grey: colorGrey,
  blue: colorBlue,
};

export interface Props extends PropsWithChildren {
  lines?: number;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  color?: Color;
  className?: string;
}

export const Typography = ({ variant = 'p', color = 'black', lines, className, children }: Props) =>
  createElement(
    variant,
    {
      className: clsx(typography, COLOR_CLASS_MAP[color], !!lines && multilineTruncate, className),
      style: { '--lines': lines },
    },
    children,
  );
