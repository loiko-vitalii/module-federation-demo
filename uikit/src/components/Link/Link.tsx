import { clsx } from 'clsx';
import type { AnchorHTMLAttributes } from 'react';

import { link } from './styles.module.css';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = ({ className, ...rest }: Props) => <a {...rest} className={clsx(link, className)} />;
