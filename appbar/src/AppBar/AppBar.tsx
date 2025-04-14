import { clsx } from 'clsx';

import { Logo } from 'uikit/components';
import type { StyleOverrides } from 'uikit/types';

import { Search } from './Search';
import { appbar, logo, search } from './styles.module.css';

export interface Props extends StyleOverrides {}
export const AppBar = ({ className }: Props) => (
  <header className={clsx(appbar, className)}>
    <Logo className={logo} />
    <Search className={search} />
  </header>
);
