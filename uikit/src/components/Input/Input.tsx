import { clsx } from 'clsx';
import type { InputHTMLAttributes } from 'react';

import { input } from './styles.module.css';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...rest }: Props) => <input {...rest} className={clsx(input, className)} />;
