import { clsx } from 'clsx';

import type { PropsWithChildren } from 'react';
import type { StyleOverrides } from '../../types';
import { skeleton } from './styles.module.css';

export interface Props extends PropsWithChildren, StyleOverrides {}

export const Skeleton = ({ className, children }: Props) => <div className={clsx(skeleton, className)}>{children}</div>;
