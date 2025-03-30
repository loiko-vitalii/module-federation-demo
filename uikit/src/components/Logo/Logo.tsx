import type { StyleOverrides } from '../../types';
import { Link } from '../Link';

import { clsx } from 'clsx';
import { logo } from './styles.module.css';

export interface Props extends StyleOverrides {}

export const Logo = ({ className }: Props) => (
  <Link href="/" className={clsx(logo, className)}>
    LightTube
  </Link>
);
